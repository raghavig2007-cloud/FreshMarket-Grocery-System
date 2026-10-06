require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

// Initialize Express Application
const app = express();

// Connect to MongoDB
connectDB();

// Global Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve Static Frontend Assets (HTML, CSS, JS, Images)
app.use(express.static(path.join(__dirname, ".")));

// API Routes
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/contact", require("./routes/contactRoutes"));

// Health Check Route
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "FreshMarket Grocery Shopping System API",
    timestamp: new Date().toISOString()
  });
});

// Fallback to index.html for Single Page Experience
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Centralized Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("Server Error:", err.stack);
  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🚀 FreshMarket Grocery Backend Server running on:`);
  console.log(`   http://localhost:${PORT}`);
  console.log(`   Frontend served directly from root`);
  console.log(`   API endpoints available at /api/*`);
  console.log(`====================================================`);
});
