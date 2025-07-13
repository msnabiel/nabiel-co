```
# 🛍️ NabielCo — Full-Stack E-commerce Platform

NabielCo is a modern, full-stack e-commerce platform built with Next.js and ShadCN UI. It offers a seamless shopping experience with integrated Razorpay payments and email order confirmations.

## 🌐 Live Demo

🔗 [www.nabiel.co.in](https://www.nabiel.co.in)

## 🚀 Features

- 🔐 Razorpay Payment Gateway integration
- 📧 Email confirmations using Nodemailer
- 🛒 Add-to-cart with localStorage
- 🖼️ Dynamic product pages with slug-based routing
- 📦 Ready for admin features like order tracking (coming soon)
- 🧩 Modular and scalable architecture
- 📱 Fully responsive, mobile-first UI

## 🛠️ Tech Stack

- **Frontend:** Next.js (App Router), TypeScript, ShadCN UI
- **Backend:** Supabase (PostgreSQL), API Routes
- **Payments:** Razorpay
- **Email:** Nodemailer (optionally with Resend)
- **Deployment:** Vercel

## 📂 Project Structure

```

src/
├── app/               # Routes and pages
├── components/        # UI components
├── data/              # Product data
├── lib/               # Utility functions
├── styles/            # Global styles

````

## 🧪 Getting Started

Clone the repository and install dependencies:

```bash
git clone https://github.com/msnabiel/nabielco.git
cd nabielco
npm install
npm run dev
````

> Make sure to set up `.env.local` with your Supabase, Razorpay, and email credentials.

## 📸 Screenshots

| Home Page                     | Product Page                        | Cart Page                     |
| ----------------------------- | ----------------------------------- | ----------------------------- |
| ![Home](screenshots/home.png) | ![Product](screenshots/product.png) | ![Cart](screenshots/cart.png) |

## 📬 Contact

Built with ❤️ by [Syed Nabiel Hasaan](https://www.linkedin.com/in/msnabiel/)
📧 [msyeednabiel@gmail.com](mailto:msyeednabiel@gmail.com)
🌐 [www.nabiel.co.in](https://www.nabiel.co.in)

---
