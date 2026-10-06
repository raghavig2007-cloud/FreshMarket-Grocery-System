const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// Seed fallback data if DB empty
const initialProducts = [
  { id: "prod-1", name: "Fresh Royal Gala Apples", category: "fruits-veg", categoryName: "Fruits & Vegetables", price: 3.49, oldPrice: 4.29, unit: "1 kg (approx. 5-6 pcs)", rating: 4.8, reviews: 142, badge: "Organic", image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=600&q=80", description: "Crisp, sweet, and hand-picked orchard fresh apples." },
  { id: "prod-2", name: "Organic Cavendish Bananas", category: "fruits-veg", categoryName: "Fruits & Vegetables", price: 1.99, oldPrice: 2.49, unit: "1 bunch (approx. 6-7 pcs)", rating: 4.7, reviews: 98, badge: "Fresh", image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=600&q=80", description: "Naturally ripened golden bananas loaded with potassium and fiber." },
  { id: "prod-3", name: "Farm Fresh Vine Tomatoes", category: "fruits-veg", categoryName: "Fruits & Vegetables", price: 2.49, oldPrice: 3.19, unit: "1 kg", rating: 4.6, reviews: 87, badge: "Fresh", image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80", description: "Plump, juicy, and sun-ripened red vine tomatoes." },
  { id: "prod-4", name: "Crisp Organic Broccoli Crowns", category: "fruits-veg", categoryName: "Fruits & Vegetables", price: 2.29, oldPrice: 2.99, unit: "500g", rating: 4.5, reviews: 54, badge: "Organic", image: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&w=600&q=80", description: "Freshly harvested green broccoli crowns rich in Vitamin C and antioxidants." },
  { id: "prod-5", name: "Pure Farm Fresh Whole Milk", category: "dairy", categoryName: "Dairy", price: 3.89, oldPrice: 4.49, unit: "1 Gallon (3.78 L)", rating: 4.9, reviews: 210, badge: "Best Seller", image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80", description: "Creamy whole cow milk from pasture-raised farms." },
  { id: "prod-6", name: "Golden Churned Butter Block", category: "dairy", categoryName: "Dairy", price: 4.29, oldPrice: 4.99, unit: "500g", rating: 4.8, reviews: 115, badge: "Fresh", image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=600&q=80", description: "Traditional slow-churned pure unsalted butter." },
  { id: "prod-7", name: "Aged Farmhouse Cheddar Cheese", category: "dairy", categoryName: "Dairy", price: 4.99, oldPrice: 5.89, unit: "400g block", rating: 4.8, reviews: 76, badge: "Sale", image: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=600&q=80", description: "Sharp, flavorful aged cheddar crafted by artisan cheesemakers." },
  { id: "prod-8", name: "Artisan Sourdough Country Loaf", category: "bakery", categoryName: "Bakery", price: 3.99, oldPrice: 4.79, unit: "1 Loaf (600g)", rating: 4.9, reviews: 168, badge: "Best Seller", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80", description: "Naturally fermented sourdough with a blistered crust and soft crumb." },
  { id: "prod-9", name: "French Golden Butter Croissants", category: "bakery", categoryName: "Bakery", price: 4.49, oldPrice: 5.29, unit: "Box of 4 pcs", rating: 4.7, reviews: 84, badge: "Fresh", image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80", description: "Flaky, buttery Viennoiserie pastry layered to perfection." },
  { id: "prod-10", name: "100% Pure Squeezed Orange Juice", category: "beverages", categoryName: "Beverages", price: 3.99, oldPrice: 4.59, unit: "1 Liter bottle", rating: 4.8, reviews: 190, badge: "Organic", image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?auto=format&fit=crop&w=600&q=80", description: "Freshly squeezed Valencia oranges with juicy pulp." },
  { id: "prod-11", name: "Organic Japanese Green Tea", category: "beverages", categoryName: "Beverages", price: 4.49, oldPrice: 5.20, unit: "25 tea bags (50g)", rating: 4.7, reviews: 62, badge: "Organic", image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80", description: "Antioxidant-rich green tea leaves from shade-grown gardens." },
  { id: "prod-12", name: "Artisan Cold Brew Iced Coffee", category: "beverages", categoryName: "Beverages", price: 3.79, oldPrice: 4.29, unit: "500 ml bottle", rating: 4.6, reviews: 73, badge: "Sale", image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80", description: "Steeped slowly for 18 hours using 100% Arabica beans." },
  { id: "prod-13", name: "Crunchy Danish Butter Biscuits", category: "snacks", categoryName: "Snacks", price: 2.49, oldPrice: 2.99, unit: "300g Tin", rating: 4.8, reviews: 130, badge: "Best Seller", image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=600&q=80", description: "Classic golden butter cookies baked with cane sugar and churned butter." },
  { id: "prod-14", name: "Roasted & Salted California Almonds", category: "snacks", categoryName: "Snacks", price: 5.99, oldPrice: 7.20, unit: "250g Pouch", rating: 4.9, reviews: 110, badge: "Organic", image: "https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&w=600&q=80", description: "Crunchy roasted almonds with Himalayan pink salt." },
  { id: "prod-15", name: "Sea Salt Kettle Cooked Potato Chips", category: "snacks", categoryName: "Snacks", price: 2.99, oldPrice: 3.49, unit: "180g Bag", rating: 4.6, reviews: 89, badge: "Popular", image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=600&q=80", description: "Thick-cut golden farm potatoes kettle-cooked in small batches." },
  { id: "prod-16", name: "Royal Long Grain Basmati Rice", category: "grains", categoryName: "Rice & Grains", price: 7.99, oldPrice: 9.49, unit: "2 kg Bag", rating: 4.9, reviews: 245, badge: "Best Seller", image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80", description: "Aged Himalayan fragrant basmati rice grains." },
  { id: "prod-17", name: "Whole Grain Old Fashioned Rolled Oats", category: "grains", categoryName: "Rice & Grains", price: 3.49, oldPrice: 4.19, unit: "1 kg Tub", rating: 4.7, reviews: 118, badge: "Organic", image: "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&w=600&q=80", description: "100% whole grain rolled oats packed with dietary fiber." },
  { id: "prod-18", name: "Herbal Nourishing Botanical Shampoo", category: "personal-care", categoryName: "Personal Care", price: 6.49, oldPrice: 7.99, unit: "400 ml bottle", rating: 4.7, reviews: 64, badge: "Organic", image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=600&q=80", description: "Sulfate-free botanical shampoo with rosemary and argan oil." },
  { id: "prod-19", name: "Organic Aloe Vera & Olive Soap Bars", category: "personal-care", categoryName: "Personal Care", price: 2.99, oldPrice: 3.79, unit: "Pack of 2 bars (250g)", rating: 4.8, reviews: 95, badge: "Fresh", image: "https://images.unsplash.com/photo-1607006314605-728637772c67?auto=format&fit=crop&w=600&q=80", description: "Handmade soap bars infused with soothing aloe vera gel and olive oil." },
  { id: "prod-20", name: "Deep Hydration Body Wash", category: "personal-care", categoryName: "Personal Care", price: 5.99, oldPrice: 6.89, unit: "500 ml pump bottle", rating: 4.6, reviews: 58, badge: "Popular", image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80", description: "Dermatologically tested gentle body wash with shea butter." }
];

/**
 * @route   GET /api/products
 * @desc    Fetch all products with optional category, search, and sort query parameters
 */
router.get("/", async (req, res) => {
  try {
    const { category, search, sort } = req.query;
    let query = {};

    if (category && category !== "all") {
      query.category = category;
    }

    if (search && search.trim() !== "") {
      query.$or = [
        { name: { $regex: search.trim(), $options: "i" } },
        { categoryName: { $regex: search.trim(), $options: "i" } },
        { description: { $regex: search.trim(), $options: "i" } }
      ];
    }

    let sortOptions = {};
    if (sort === "price-low") sortOptions = { price: 1 };
    else if (sort === "price-high") sortOptions = { price: -1 };
    else if (sort === "name-asc") sortOptions = { name: 1 };
    else if (sort === "rating") sortOptions = { rating: -1 };

    let products = await Product.find(query).sort(sortOptions);

    // If MongoDB is connected but collection is empty, automatically seed initial products!
    if (products.length === 0 && (!category || category === "all") && (!search || search.trim() === "")) {
      const count = await Product.countDocuments();
      if (count === 0) {
        await Product.insertMany(initialProducts);
        products = await Product.find().sort(sortOptions);
      }
    }

    res.json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    // If DB is offline, return fallback initial products
    let list = [...initialProducts];
    const { category, search } = req.query;
    if (category && category !== "all") {
      list = list.filter(p => p.category === category);
    }
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }
    res.json({
      success: true,
      count: list.length,
      data: list,
      source: "fallback"
    });
  }
});

/**
 * @route   GET /api/products/:id
 * @desc    Get single product by custom id (e.g. prod-1) or mongo _id
 */
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findOne({ id: req.params.id }) || await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.json({ success: true, data: product });
  } catch (error) {
    const fallback = initialProducts.find(p => p.id === req.params.id);
    if (fallback) {
      return res.json({ success: true, data: fallback });
    }
    res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * @route   POST /api/products
 * @desc    Create a new product (Admin feature)
 */
router.post("/", async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

/**
 * @route   PUT /api/products/:id
 * @desc    Update an existing product
 */
router.put("/:id", async (req, res) => {
  try {
    const updated = await Product.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

/**
 * @route   DELETE /api/products/:id
 * @desc    Delete a product
 */
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Product.findOneAndDelete({ id: req.params.id });
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.json({ success: true, message: "Product removed" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
