require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/Product");

const sampleProducts = [
  { id: "prod-1", name: "Fresh Royal Gala Apples", category: "fruits-veg", categoryName: "Fruits & Vegetables", price: 3.49, oldPrice: 4.29, unit: "1 kg (approx. 5-6 pcs)", rating: 4.8, reviews: 142, badge: "Organic", image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=600&q=80", description: "Crisp, sweet, and hand-picked orchard fresh apples. Grown sustainably without artificial waxes or harmful pesticides." },
  { id: "prod-2", name: "Organic Cavendish Bananas", category: "fruits-veg", categoryName: "Fruits & Vegetables", price: 1.99, oldPrice: 2.49, unit: "1 bunch (approx. 6-7 pcs)", rating: 4.7, reviews: 98, badge: "Fresh", image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=600&q=80", description: "Naturally ripened golden bananas loaded with potassium and dietary fiber. Ideal for breakfast smoothies and snacks." },
  { id: "prod-3", name: "Farm Fresh Vine Tomatoes", category: "fruits-veg", categoryName: "Fruits & Vegetables", price: 2.49, oldPrice: 3.19, unit: "1 kg", rating: 4.6, reviews: 87, badge: "Fresh", image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80", description: "Plump, juicy, and sun-ripened red vine tomatoes. Perfect for hearty pastas, crisp salads, and homemade soups." },
  { id: "prod-4", name: "Crisp Organic Broccoli Crowns", category: "fruits-veg", categoryName: "Fruits & Vegetables", price: 2.29, oldPrice: 2.99, unit: "500g", rating: 4.5, reviews: 54, badge: "Organic", image: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&w=600&q=80", description: "Freshly harvested green broccoli crowns rich in Vitamin C, K, and antioxidants. Steams quickly and tastes delicious." },
  { id: "prod-5", name: "Pure Farm Fresh Whole Milk", category: "dairy", categoryName: "Dairy", price: 3.89, oldPrice: 4.49, unit: "1 Gallon (3.78 L)", rating: 4.9, reviews: 210, badge: "Best Seller", image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80", description: "Pasteurized, homogenized whole cow's milk from pasture-raised cows. Rich, creamy, and fortified with Vitamin D." },
  { id: "prod-6", name: "Golden Churned Butter Block", category: "dairy", categoryName: "Dairy", price: 4.29, oldPrice: 4.99, unit: "500g", rating: 4.8, reviews: 115, badge: "Fresh", image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=600&q=80", description: "Traditional slow-churned pure unsalted butter. Enhances baking recipes and spreads smoothly on toast." },
  { id: "prod-7", name: "Aged Farmhouse Cheddar Cheese", category: "dairy", categoryName: "Dairy", price: 4.99, oldPrice: 5.89, unit: "400g block", rating: 4.8, reviews: 76, badge: "Sale", image: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=600&q=80", description: "Sharp, flavorful aged cheddar crafted by artisan cheesemakers. Melts evenly in sandwiches and burgers." },
  { id: "prod-8", name: "Artisan Sourdough Country Loaf", category: "bakery", categoryName: "Bakery", price: 3.99, oldPrice: 4.79, unit: "1 Loaf (600g)", rating: 4.9, reviews: 168, badge: "Best Seller", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80", description: "Naturally fermented sourdough with a blistered crust and soft, airy crumb. Baked fresh every morning." },
  { id: "prod-9", name: "French Golden Butter Croissants", category: "bakery", categoryName: "Bakery", price: 4.49, oldPrice: 5.29, unit: "Box of 4 pcs", rating: 4.7, reviews: 84, badge: "Fresh", image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80", description: "Flaky, buttery Viennoiserie pastry layered to perfection. Warm in the oven for 2 minutes for bakery freshness." },
  { id: "prod-10", name: "100% Pure Squeezed Orange Juice", category: "beverages", categoryName: "Beverages", price: 3.99, oldPrice: 4.59, unit: "1 Liter bottle", rating: 4.8, reviews: 190, badge: "Organic", image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?auto=format&fit=crop&w=600&q=80", description: "Freshly squeezed Valencia oranges with juicy pulp. Never from concentrate, with no added sugars or preservatives." },
  { id: "prod-11", name: "Organic Japanese Green Tea", category: "beverages", categoryName: "Beverages", price: 4.49, oldPrice: 5.20, unit: "25 tea bags (50g)", rating: 4.7, reviews: 62, badge: "Organic", image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80", description: "Calming, antioxidant-rich green tea leaves harvested from shade-grown tea gardens. Delicately grassy and invigorating." },
  { id: "prod-12", name: "Artisan Cold Brew Iced Coffee", category: "beverages", categoryName: "Beverages", price: 3.79, oldPrice: 4.29, unit: "500 ml bottle", rating: 4.6, reviews: 73, badge: "Sale", image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80", description: "Steeped slowly for 18 hours using 100% Arabica beans. Ultra-smooth flavor with low acidity and notes of dark chocolate." },
  { id: "prod-13", name: "Crunchy Danish Butter Biscuits", category: "snacks", categoryName: "Snacks", price: 2.49, oldPrice: 2.99, unit: "300g Tin", rating: 4.8, reviews: 130, badge: "Best Seller", image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=600&q=80", description: "Classic golden butter cookies baked with cane sugar and pure churned butter. A delightful companion for your afternoon tea." },
  { id: "prod-14", name: "Roasted & Salted California Almonds", category: "snacks", categoryName: "Snacks", price: 5.99, oldPrice: 7.20, unit: "250g Pouch", rating: 4.9, reviews: 110, badge: "Organic", image: "https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&w=600&q=80", description: "Crunchy, dry-roasted supreme almonds dusted with Himalayan pink salt. Packed with plant protein and healthy fats." },
  { id: "prod-15", name: "Sea Salt Kettle Cooked Potato Chips", category: "snacks", categoryName: "Snacks", price: 2.99, oldPrice: 3.49, unit: "180g Bag", rating: 4.6, reviews: 89, badge: "Popular", image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=600&q=80", description: "Thick-cut golden farm potatoes kettle-cooked in small batches for the ultimate satisfying crunch." },
  { id: "prod-16", name: "Royal Long Grain Basmati Rice", category: "grains", categoryName: "Rice & Grains", price: 7.99, oldPrice: 9.49, unit: "2 kg Bag", rating: 4.9, reviews: 245, badge: "Best Seller", image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80", description: "Aged Himalayan fragrant basmati rice grains that cook up fluffy, slender, and non-sticky. Perfect for biryani and pilaf." },
  { id: "prod-17", name: "Whole Grain Old Fashioned Rolled Oats", category: "grains", categoryName: "Rice & Grains", price: 3.49, oldPrice: 4.19, unit: "1 kg Tub", rating: 4.7, reviews: 118, badge: "Organic", image: "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&w=600&q=80", description: "100% whole grain rolled oats rich in beta-glucan fiber to support heart health and long-lasting morning energy." },
  { id: "prod-18", name: "Herbal Nourishing Botanical Shampoo", category: "personal-care", categoryName: "Personal Care", price: 6.49, oldPrice: 7.99, unit: "400 ml bottle", rating: 4.7, reviews: 64, badge: "Organic", image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=600&q=80", description: "Sulfate-free botanical shampoo enriched with rosemary, peppermint, and argan oil for shiny, healthy hair." },
  { id: "prod-19", name: "Organic Aloe Vera & Olive Soap Bars", category: "personal-care", categoryName: "Personal Care", price: 2.99, oldPrice: 3.79, unit: "Pack of 2 bars (250g)", rating: 4.8, reviews: 95, badge: "Fresh", image: "https://images.unsplash.com/photo-1607006314605-728637772c67?auto=format&fit=crop&w=600&q=80", description: "Cold-processed handmade soap bars infused with soothing fresh aloe vera gel and nourishing virgin olive oil." },
  { id: "prod-20", name: "Deep Hydration Body Wash", category: "personal-care", categoryName: "Personal Care", price: 5.99, oldPrice: 6.89, unit: "500 ml pump bottle", rating: 4.6, reviews: 58, badge: "Popular", image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80", description: "Dermatologically tested gentle body wash with shea butter and coconut extracts for smooth, moisturized skin all day." }
];

async function seedDatabase() {
  try {
    const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/grocery_shopping_db";
    console.log(`Connecting to MongoDB at: ${mongoUri}...`);
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB!");

    // Clear existing products
    await Product.deleteMany();
    console.log("Cleared existing products from database.");

    // Insert sample products
    const inserted = await Product.insertMany(sampleProducts);
    console.log(`Successfully seeded ${inserted.length} grocery products!`);

    await mongoose.disconnect();
    console.log("Database disconnected. Seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error.message);
    process.exit(1);
  }
}

seedDatabase();
