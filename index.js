const express = require("express");
const mongoose = require("mongoose");
const productRoutes = require("./routes/product.routes");

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// routes handlers
app.use('/api/products', productRoutes);

app.get("/", (req, res) => {
  res.send("Hello from the product CRUD app!");
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
