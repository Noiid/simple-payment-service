const express = require("express");
const lastDayTransaction = require("../controllers/transaction/getLastDayTransaction");
const postTransaction = require("../controllers/transaction/postTransaction");

const router = express.Router();
router.get("/lastday", lastDayTransaction);
router.post("/buy", postTransaction);
module.exports = router;
