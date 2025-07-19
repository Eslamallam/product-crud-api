const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const productRoutes = require("./routes/product.routes");

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// routes handlers
app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.send("Hello from the product CRUD app!");
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});

// Connect to MongoDB
mongoose
  .connect(`${process.env.DATABASE_URL}`)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
