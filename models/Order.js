const mongoose = require("mongoose");

const OrderItemSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    unit: { type: String, default: "1 unit" },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, min: 1 },
    image: { type: String, default: "" }
  },
  { _id: false }
);

const OrderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true
    },
    customerName: {
      type: String,
      required: [true, "Customer name is required"],
      trim: true
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true
    },
    deliveryAddress: {
      type: String,
      required: [true, "Delivery address is required"]
    },
    deliveryNotes: {
      type: String,
      default: ""
    },
    paymentMethod: {
      type: String,
      enum: ["Cash on Delivery", "Credit/Debit Card", "UPI / Digital Wallet"],
      default: "Cash on Delivery"
    },
    status: {
      type: String,
      enum: ["Order Placed", "Preparing", "Out for Delivery", "Delivered", "Cancelled"],
      default: "Order Placed"
    },
    items: {
      type: [OrderItemSchema],
      required: [true, "Order must contain at least one item"],
      validate: [val => val.length > 0, "Cart cannot be empty"]
    },
    subtotal: {
      type: Number,
      required: true
    },
    deliveryFee: {
      type: Number,
      default: 0
    },
    discount: {
      type: Number,
      default: 0
    },
    tax: {
      type: Number,
      default: 0
    },
    total: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Order", OrderSchema);
