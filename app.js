const express = require("express");
const applyMiddleware = require("./middleware");
const trxRoutes = require("./routes/transaction");
const cron = require("node-cron");
const checkTransactionRoutine = require("./controllers/transaction/getTransactionRoutine");
const { ENABLE_CRON } = require("./config/config");

const app = express();

applyMiddleware(app);

app.use("/transaction", trxRoutes);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

if (ENABLE_CRON == "true") {
  cron.schedule("* * * * *", checkTransactionRoutine);
}

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
