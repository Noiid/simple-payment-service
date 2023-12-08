const Transaction = require("../../models/Transaction");
const Product = require("../../models/Product");
const prisma = require("../../prisma/prismaClient");
const buySnap = require("../transaction/snap/create");

const postTransaction = async (req, res) => {
  const productId = req.body.product_id;
  const userId = req.body.user_id;

  try {
    const newProduct = new Product(prisma);
    const product = await newProduct.findByID(productId);
    if (!product) {
      res.status(404).send({
        error: "Product not found",
      });
      return;
    }

    const total = product.price;
    const randomCode = Math.floor(new Date().getTime() / 1000);
    const billCode = `ORDER-ID-${randomCode}`;

    const response = await buySnap({
      transaction_details: {
        order_id: billCode,
        gross_amount: total,
      },
      credit_card: { secure: true },
    });

    const snapUrl = response.redirect_url;
    const token = response.token;

    const newTransaction = new Transaction(prisma);
    const createTrx = await newTransaction.create({
      billCode,
      userId,
      productId,
      total,
      snapUrl,
      token,
    });

    res.json(createTrx);
    return;
  } catch (error) {
    console.log("error when post transaction: ", error);
    res.status(500).send({ error: error });
    return;
  }
};

module.exports = postTransaction;
