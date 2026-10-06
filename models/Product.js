const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true
    },
    category: {
      type: String,
      required: [true, "Category slug is required"],
      enum: ["fruits-veg", "dairy", "bakery", "beverages", "snacks", "grains", "personal-care"]
    },
    categoryName: {
      type: String,
      required: [true, "Category display name is required"]
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: 0
    },
    oldPrice: {
      type: Number,
      default: 0
    },
    unit: {
      type: String,
      required: [true, "Product unit/quantity is required"]
    },
    rating: {
      type: Number,
      default: 4.5,
      min: 0,
      max: 5
    },
    reviews: {
      type: Number,
      default: 20
    },
    badge: {
      type: String,
      default: "Fresh"
    },
    image: {
      type: String,
      required: [true, "Product image URL is required"]
    },
    description: {
      type: String,
      default: ""
    },
    inStock: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

// Search text index on name, categoryName, description
ProductSchema.index({ name: "text", categoryName: "text", description: "text" });

module.exports = mongoose.model("Product", ProductSchema);
