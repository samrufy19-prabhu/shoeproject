# StepUp E-Commerce Website

A full-stack, responsive footwear e-commerce web platform converted with pixel accuracy from the Figma prototype:
[Figma Prototype Link](https://www.figma.com/proto/JBYBjjbHQqcjyJR57WJsyA/E-Commerce?node-id=1-2&scaling=scale-down-width&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=19%3A324)

---

## 🎨 Design System & Specifications
- **Typography**: Google Font **Libre Baskerville** (Serif elegance with modern readability) + Plus Jakarta Sans for UI elements.
- **Primary Color**: `#2F4F4F` (Dark slate gray)
- **Accent Color**: `#FFA0A0` (Pale Red / Coral Pink)
- **Images**: Extracted from attached project asset bundle (`E Commerce shoe website.zip`).

---

## 🚀 Key Features

### 1. Home Page Animations & Carousels
- **Hero Image Carousel**: Smooth sliding banner carousel cycling through featured campaign images with auto-play, pause on hover, interactive dot indicators, and next/previous controls.
- **Shop by Category Carousel**: Cards for **Men**, **Women**, and **Kids** footwear linking directly to their respective category pages.
- **Featured Footwear Grid**: 8 trending shoes with star ratings, pricing, discount badges, and instant AJAX "Add to Cart" functionality.
- **Special Offer Section with Prototype Animations**: 4 interactive offer tabs (Sneakers, Luxury Pumps, Gentleman Loafers, Festive Stiletto) featuring transition slides, promo code copy button (`STEPUP50`), and direct CTAs.

### 2. Navlinks & Full Page Navigation
- **Home** (`/`): Complete animated landing page.
- **Men's Footwear** (`/category/men/`): Shoes, sneakers, boots, sandals with sorting (Price Low-to-High, High-to-Low, Rating) and search.
- **Women's Footwear** (`/category/women/`): Luxury pumps, heels, wedges, flats, sneakers.
- **Kids' Footwear** (`/category/kids/`): High tops, light-up kicks, runners, boots.
- **Product Detail** (`/product/<slug>/`): Multi-angle thumbnail image gallery, size selector, quantity increment/decrement, customer ratings breakdown, and related products.
- **About Us** (`/about/`): Brand heritage story, master craftsmanship pillars, stats counter, and visual showcases.
- **Contact Us** (`/contact/`): Functional contact message submission with database persistence, support hotline, and store address.
- **Login / Register** (`/login/`): Switchable tabs ("Sign In" / "Register") matching Figma prototype styling with authentication.
- **Cart** (`/cart/`): Item listing, size selection, live AJAX quantity increment/decrement, dynamic subtotal & total recalculation.
- **Checkout** (`/checkout/`): Shipping address form and payment selection.
- **Order Confirmation** (`/order-success/<order_number>/`): Animated green checkmark, order summary, address receipt, and print capability.

### 3. Razorpay Test Payment Integration
- Razorpay Checkout SDK (`checkout.js`) configured with test credentials.
- Creates orders on server, verifies signatures via `razorpay` library, and redirects to order confirmation.
- Includes simulated instant test payment option for offline or sandboxed testing.

---

## 🛠️ Technology Stack
- **Frontend**: HTML5, CSS3 (Custom responsive styling, Flexbox, CSS Grid), JavaScript (Vanilla ES6 for animations, AJAX, carousels)
- **Backend**: Django 6.1, Python 3.13
- **Database**: SQLite3
- **Payment Gateway**: Razorpay Test Integration

---

## 🏃 Quick Start Guide

### 1. Run the Development Server
```bash
python manage.py runserver
```
Or double-click `run_server.bat`.

### 2. Open the Website in Your Browser
Visit [http://127.0.0.1:8000/](http://127.0.0.1:8000/)

### 3. Admin Access
- URL: [http://127.0.0.1:8000/admin/](http://127.0.0.1:8000/admin/)
- **Username**: `admin`
- **Password**: `admin123`
