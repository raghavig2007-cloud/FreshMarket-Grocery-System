# 🛒 FreshMarket - Full-Stack Grocery Shopping System

A modern, responsive, full-stack **Grocery Shopping System** designed for a college semester project. Built with clean **HTML5, Vanilla CSS3, JavaScript (ES6+)**, powered by a **Node.js & Express.js** backend, and backed by a **MongoDB** database.

---

## 📸 Screenshots & Highlights

- **Theme**: Clean fresh green (`#10b981`), crisp mint backgrounds, and professional dark slate typography.
- **Responsive**: Fully optimized for mobile phones, tablets, laptops, and wide desktop screens.
- **Dual Mode**: Runs as a **Full-Stack Application** with Node.js and MongoDB, or as a **Standalone Frontend** directly in any web browser without dependencies!

---

## 🛠️ Technology Stack

| Layer | Technology | Description |
| :--- | :--- | :--- |
| **Frontend** | HTML5 | Semantic structure (`<header>`, `<nav>`, `<main>`, `<section>`, `<dialog>`, `<footer>`) |
| | CSS3 | Vanilla CSS with custom properties (CSS variables), glassmorphism, flexbox & grid |
| | JavaScript | Modern ES6+, DOM manipulation, event delegation, client-side validation |
| **Backend** | Node.js | Runtime environment for server-side JavaScript execution |
| | Express.js | Fast, minimalist REST API framework and static asset server |
| **Database** | MongoDB | Document-oriented NoSQL database for products, orders, and inquiries |
| | Mongoose | Elegant object data modeling (ODM) for MongoDB validation and schemas |

---

## 🚀 Quick Start Guide

### Option 1: Full-Stack Mode (Node.js + Express + MongoDB)

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Seed Sample Grocery Products into MongoDB**:
   ```bash
   npm run seed
   ```

3. **Start the Server**:
   ```bash
   npm start
   ```
   *Or for auto-reloading during development:*
   ```bash
   npm run dev
   ```

4. **Open in Browser**:
   Navigate to:
   ```text
   http://localhost:5000
   ```

---

### Option 2: Standalone Frontend Mode (No Server / Offline)

You can demonstrate the frontend without running Node.js or MongoDB:
- Simply double-click **`index.html`** in Windows Explorer.
- The website automatically detects the environment and uses built-in dummy products, in-memory state, and `localStorage`.

---

## 📦 Project Directory Structure

```text
Grocery shopping system/
├── package.json          # Project metadata and dependencies
├── server.js             # Main Express server entry point
├── seed.js               # MongoDB seeder script (populates 20 products)
├── .env                  # Environment configuration (PORT=5000, MONGO_URI)
├── .env.example          # Sample environment template
│
├── config/
│   └── db.js             # Mongoose connection & error handler
│
├── models/
│   ├── Product.js        # Mongoose Schema for Grocery Products
│   ├── Order.js          # Mongoose Schema for Orders & Items
│   └── Contact.js        # Mongoose Schema for User Messages
│
├── routes/
│   ├── productRoutes.js  # REST API: GET, POST, PUT, DELETE /api/products
│   ├── orderRoutes.js    # REST API: GET, POST, PUT /api/orders
│   └── contactRoutes.js  # REST API: POST, GET /api/contact
│
├── index.html            # Frontend semantic markup & views
├── style.css             # Frontend styling, layout & animations
├── script.js             # Frontend controller, state & API fetcher
└── images/
    └── hero-banner.jpg   # High-resolution grocery showcase photo
```

---

## 🌐 REST API Endpoints Reference

### 1. Products API (`/api/products`)

| Method | Endpoint | Query Parameters | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/products` | `?category=...&search=...&sort=...` | Retrieve filtered/sorted products list |
| `GET` | `/api/products/:id` | None | Get a single product by custom `id` (e.g. `prod-1`) |
| `POST` | `/api/products` | None | Create a new product (Admin) |
| `PUT` | `/api/products/:id` | None | Update an existing product |
| `DELETE` | `/api/products/:id` | None | Delete a product |

#### Query Parameters:
- `category`: `fruits-veg`, `dairy`, `bakery`, `beverages`, `snacks`, `grains`, `personal-care`, or `all`
- `search`: Keyword string (matches name, category, or description)
- `sort`: `featured`, `price-low`, `price-high`, `name-asc`, `rating`

---

### 2. Orders API (`/api/orders`)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/orders` | Retrieve all past orders (sorted newest first) |
| `GET` | `/api/orders/:orderId` | Retrieve order details by Order ID (e.g. `#ORD-2026-9481`) |
| `POST` | `/api/orders` | Place a new order with cart items and delivery details |
| `PUT` | `/api/orders/:orderId/status` | Update delivery status (*Order Placed*, *In Transit*, *Delivered*) |

#### Sample Order POST Payload:
```json
{
  "customerName": "Alex Morgan",
  "phoneNumber": "9876543210",
  "email": "alex@example.com",
  "deliveryAddress": "Flat 402, Green Campus View, Sunnyvale - 94086",
  "deliveryNotes": "Ring doorbell twice",
  "paymentMethod": "Cash on Delivery",
  "items": [
    {
      "id": "prod-1",
      "name": "Fresh Royal Gala Apples",
      "unit": "1 kg",
      "price": 3.49,
      "quantity": 2,
      "image": "https://..."
    }
  ],
  "subtotal": 6.98,
  "deliveryFee": 2.99,
  "discount": 0.00,
  "tax": 0.35,
  "total": 10.32
}
```

---

### 3. Contact Inquiries API (`/api/contact`)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/contact` | Submit a customer support inquiry |
| `GET` | `/api/contact` | View all messages (Admin review) |

---

## 🎓 College Viva / Project Q&A Guide

**Q1: Why did you choose MongoDB for this Grocery Shopping System?**
> *Answer:* MongoDB is a document-oriented NoSQL database that naturally represents hierarchical eCommerce data like orders with nested item arrays (`items: [{ productId, name, price, quantity }]`). It scales horizontally and maps 1:1 with JSON in JavaScript.

**Q2: How does the application handle offline mode or database downtime?**
> *Answer:* The frontend in `script.js` uses progressive enhancement. It attempts to fetch live data from the Express REST API (`/api/products`), but if the API is offline or the file is opened directly, it gracefully falls back to the embedded product dataset and persists carts and orders in `localStorage`.

**Q3: How are delivery fees and discounts calculated?**
> *Answer:* Orders qualify for **Free Delivery** when the cart subtotal is $30.00 or higher; otherwise, a flat $2.99 fee is added. Interactive coupons (e.g., `FRESH10`, `COLLEGE10`) calculate percentage discounts before a 5% estimated tax is applied to calculate the final grand total.

**Q4: What security and validation practices were applied?**
> *Answer:* Both client-side validation (HTML5 pattern regex, non-empty checks, instant inline error feedback) and server-side Mongoose schema validation (required fields, positive price constraints, status enums) are implemented.
