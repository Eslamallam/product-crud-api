const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/product.model");

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from the product CRUD app!");
});

app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

app.get("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ error: `Failed to fetch product with ID ${id}` });
  }
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

app.put("/api/products/:id", async (req, res) => {
  const { id } = req.params; 
  try {
    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json({ product, message: "Product updated successfully" });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: `Failed to update product with ID ${id}` });
  }
});

app.delete("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: `Failed to delete product with ID ${id}` });
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
