const mongoose = require("mongoose");

/**
 * Connect to MongoDB using Mongoose
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/grocery_shopping_db");
    console.log(`🍃 MongoDB Connected: ${conn.connection.host}/${conn.connection.name}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.log("ℹ️  Note: If MongoDB is not running locally, the server will continue and provide static/fallback data.");
  }
};

module.exports = connectDB;
