const Transaction = require("../../models/Transaction");
const Product = require("../../models/Product");
const prisma = require("../../prisma/prismaClient");
const getStatusSnap = require("../transaction/snap/getStatus");

const checkStatusByOrderID = async (order_id) => {
  try {
    const response = await getStatusSnap(order_id);

    const statusCode = parseInt(response.status_code, 10);

    if (statusCode == 404) {
      return [false, "Payment channel belum dipilih"];
    }

    //if success
    return [true, response.transaction_status];
  } catch (error) {
    return [false, error.message];
  }
};

const checkTransactionRoutine = async () => {
  const newTransaction = new Transaction(prisma);
  const newProduct = new Product(prisma);
  try {
    const listTransaction = await newTransaction.checkTransactionPerDay();
    for (const element of listTransaction) {
      const [isProcess, status] = await checkStatusByOrderID(element.billCode);
      if (isProcess) {
        if (status === "settlement") {
          await newProduct.updateStockDecre(element.productId);
        }
        await newTransaction.updateStatusTransaction(element.id, status);
      }
    }
  } catch (error) {
    console.log("error: ", error);
  }
};

module.exports = checkTransactionRoutine;
