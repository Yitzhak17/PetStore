require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");
const subcategoryRoutes = require("./routes/subcategories"); // Include if you want the subcategories functionality
const cartRoutes = require('./routes/cart');
//const authRouters = require('./routes/auth.js'); // Import auth routes
const cookieParser = require('cookie-parser');

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:3000'], // Allow requests from this origin
  credentials: true // Allow credentials to be sent with requests
}));
app.use(bodyParser.json());
app.use(cookieParser()); // Middleware to parse cookies

// Database Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected...");
  })
  .catch((err) => console.log(err));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/subcategories", subcategoryRoutes); // Include if you want the subcategories functionality
app.use("/api/cart", cartRoutes);

app.get('/', (req, res) => {
  res.send('Hello !!World!'); // Basic route for the root URL
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
