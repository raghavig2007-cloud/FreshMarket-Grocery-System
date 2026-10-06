const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

/**
 * @route   GET /api/orders
 * @desc    Get all orders (sorted newest first)
 */
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * @route   GET /api/orders/:orderId
 * @desc    Get order by orderId
 */
router.get("/:orderId", async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.params.orderId });
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }
    res.json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * @route   POST /api/orders
 * @desc    Create a new grocery order
 */
router.post("/", async (req, res) => {
  try {
    const {
      customerName,
      phoneNumber,
      email,
      deliveryAddress,
      deliveryNotes,
      paymentMethod,
      items,
      subtotal,
      deliveryFee,
      discount,
      tax,
      total
    } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: "Cannot place an empty order" });
    }

    // Generate unique order ID
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderId = `ORD-2026-${randomSuffix}`;

    const newOrder = await Order.create({
      orderId,
      customerName,
      phoneNumber,
      email,
      deliveryAddress,
      deliveryNotes: deliveryNotes || "",
      paymentMethod: paymentMethod || "Cash on Delivery",
      status: "Order Placed",
      items,
      subtotal: Number(subtotal),
      deliveryFee: Number(deliveryFee || 0),
      discount: Number(discount || 0),
      tax: Number(tax || 0),
      total: Number(total)
    });

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      data: newOrder
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

/**
 * @route   PUT /api/orders/:orderId/status
 * @desc    Update order delivery status
 */
router.put("/:orderId/status", async (req, res) => {
  try {
    const { status } = req.body;
    const allowed = ["Order Placed", "Preparing", "Out for Delivery", "Delivered", "Cancelled"];
    if (!allowed.includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status value" });
    }

    const updated = await Order.findOneAndUpdate(
      { orderId: req.params.orderId },
      { status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
