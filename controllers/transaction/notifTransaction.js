const checkTransactionRoutine = require("./getTransactionRoutine");

const notifTransaction = async (req, res) => {
  try {
    const order_id = req.body.order_id || undefined;

    await checkTransactionRoutine(order_id);
    res.json({ message: "success" });
    return;
  } catch (error) {
    res.status(500).send({ error: error });
  }
};

module.exports = notifTransaction;
