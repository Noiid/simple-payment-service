const Transaction = require("../../models/Transaction");
const prisma = require("../../prisma/prismaClient");

const lastDayTransaction = async (req, res) => {
  const trx = new Transaction(prisma);
  const listTransaction = await trx.checkTransactionPerDay();
  res.json(listTransaction);
};

module.exports = lastDayTransaction;
