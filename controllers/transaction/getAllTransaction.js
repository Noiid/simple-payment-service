const Transaction = require("../../models/Transaction");
const prisma = require("../../prisma/prismaClient");

const allTransaction = async (req, res) => {
  let { page = 1, limit = 10 } = req.query;

  const trx = new Transaction(prisma);
  const listTransaction = await trx.allTransaction(limit, page);
  res.json(listTransaction);
};

module.exports = allTransaction;
