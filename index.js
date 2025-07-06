const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/product.model");

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from the product CRUD app!");
});

app.post("/api/products", async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: `Failed to create product ${error}` });
  }
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://essallam:Ess1092@product-crud.fnj75dc.mongodb.net/?retryWrites=true&w=majority&appName=product-crud"
  )
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
