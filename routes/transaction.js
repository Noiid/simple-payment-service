const express = require("express");
const lastDayTransaction = require("../controllers/transaction/getLastDayTransaction");
const postTransaction = require("../controllers/transaction/postTransaction");
const notifTransaction = require("../controllers/transaction/notifTransaction");
const getAllTransaction = require("../controllers/transaction/getAllTransaction");

const router = express.Router();
router.get("", getAllTransaction);
router.get("/lastday", lastDayTransaction);
router.post("/buy", postTransaction);
router.post("/notifications", notifTransaction); //no auth khusus untuk menerima notification payment dr midtrans
module.exports = router;
