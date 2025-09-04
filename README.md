# 🛒 E-Commerce MERN

A **full-stack E-Commerce web application** built using the **MERN stack** with a focus on clean UI, secure payments, and an easy-to-manage admin panel.  

🚀 **Live Demo:** [MERN E-Commerce](https://mern-e-commerce-5u1u.onrender.com/)

---

## 📌 Features

- 👥 **User Authentication & Authorization**
  - JWT-based login/signup
  - Role-based access (User/Admin)

- 🛍 **Product Management**
  - Browse products with search & filter options
  - View product details with reviews & ratings
  - Add to cart, update quantity, and checkout

- 💳 **Payments**
  - Integrated **Razorpay** for secure online payments
  - Order verification and payment confirmation

- 📦 **Orders & Admin Panel**
  - Users can view their order history
  - Admin can manage products, orders, and users
  - Order status update (Processing → Shipped → Delivered)

- 🎨 **Responsive UI**
  - Built with React & CSS for a smooth and mobile-friendly experience
  - State management with Redux Toolkit

---

## 🛠 Tech Stack

| Frontend | Backend | Database | Payment |
|---------|---------|---------|---------|
| React, Redux, Axios | Node.js, Express.js | MongoDB, Mongoose | Razorpay |

---

## 📸 Screenshots

### 🏠 Homepage
![Homepage Screenshot](https://via.placeholder.com/1000x500?text=Homepage)

### 🛒 Product Page
![Product Page Screenshot](https://via.placeholder.com/1000x500?text=Product+Page)

### 📊 Admin Dashboard
![Admin Dashboard Screenshot](https://via.placeholder.com/1000x500?text=Admin+Dashboard)

---

## ⚡ Installation & Setup

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/E-Commerce-MERN.git
cd E-Commerce-MERN
```
2. **Install dependencies**
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install

```

3. **Add environment variables**
Create a .env file in the backend folder:
```bash

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=3d
EXPIRE_COOKIE=3
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret
```
3. **Run the project**
```bash
# Start backend
cd backend
npm run dev

# Start frontend
cd ../frontend
npm run dev

```

