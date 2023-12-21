const express = require("express");
const applyMiddleware = require("./middleware");
const trxRoutes = require("./routes/transaction");
const cron = require("node-cron");
const checkTransactionRoutine = require("./controllers/transaction/getTransactionRoutine");
const { ENABLE_CRON, INTERVAL_INQUIRY } = require("./config/config");

const path = require("path");
const multer = require("multer");

// Set up storage for Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "/uploads/")); // Set the destination folder for uploaded files
  },
  filename: (req, file, cb) => {
    // Customize the filename (you can use any logic here)
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + extension);
  },
});

// Create Multer instance with the configured storage
const upload = multer({ storage: storage });

const app = express();

applyMiddleware(app);

app.use("/transaction", trxRoutes);
app.use("/media", express.static("uploads"));

// src=`${BASE_URL}/media/${product.gallery.img}`
// 1. FE upload ke endpoint /upload ==> response: namefile.jpg
// 2. FE POST data gallery dg payload {product_id, img_url} ==> {product_id=1 img_url=namefile.jpg}

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Set up a route to handle file uploads
app.post("/upload", upload.single("file"), (req, res) => {
  // Access the uploaded file information via req.file
  res.json({
    message: "File uploaded successfully!",
    filename: req.file.filename,
  });
});

if (ENABLE_CRON == "true") {
  cron.schedule(INTERVAL_INQUIRY, () => {
    checkTransactionRoutine();
  });
}

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
