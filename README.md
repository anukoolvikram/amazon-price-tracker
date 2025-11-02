# 🛍️ PriceTracker - Smart Price Tracking Application

A modern, full-stack web application that helps users track product prices from Amazon and get notified when prices drop.  
Built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, and **MongoDB**.

---

## ✨ Features

- 🔍 **Smart Price Tracking** – Automatically monitor Amazon product prices  
- 🔔 **Price Drop Alerts** – Get email notifications when prices hit your target  
- 📊 **Price History** – Visualize price trends over time  
- 🎯 **Product Insights** – See highest, lowest, and average prices  
- 🔐 **User Authentication** – Secure login with Google OAuth  
- 📱 **Responsive Design** – Works perfectly on all devices  
- ⚡ **Real-time Updates** – Live price monitoring  

---

## 🚀 Tech Stack

- **Frontend:** Next.js 14, React, TypeScript, Tailwind CSS  
- **Backend:** Next.js API Routes, Server Actions  
- **Database:** MongoDB with Mongoose  
- **Authentication:** NextAuth.js with Google OAuth  
- **Web Scraping:** Cheerio (for Amazon product data)  
- **Deployment:** Vercel  
- **Styling:** Tailwind CSS, Framer Motion (for animations)  

---

## 📦 Quick Start

### 🧩 Prerequisites

- Node.js **v18+**  
- MongoDB database (local or Atlas)  
- Google OAuth credentials  

---

### ⚙️ 1. Clone the Repository

```bash
git clone https://github.com/anukoolvikram/amazon-price-tracker.git
cd amazon-price-tracker

📥 2. Install Dependencies
npm install
# or
yarn install
# or
pnpm install

🔐 3. Environment Setup

Create a .env.local file in the root directory and add the following variables:

# Database
MONGODB_URI=mongodb://localhost:27017/price-tracker

# Scraper API
SCRAPERAPI_KEY="scraper-api-key"

# Sender Email Credentials
EMAIL_ID="sender-email-id"
EMAIL_PASSWORD="sender-email-app-password"

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-super-secret-nextauth-secret

# Google OAuth
GOOGLE_CLIENT_ID=your-google-oauth-client-id
GOOGLE_CLIENT_SECRET=your-google-oauth-client-secret

🔧 4. Set Up Google OAuth

Go to Google Cloud Console

Create a new project or select an existing one

Enable the Google+ API

Create OAuth 2.0 credentials

Add http://localhost:3000 to Authorized Redirect URIs

Copy the Client ID and Client Secret into your .env.local file

▶️ 5. Run the Server
npm run dev
# or
yarn dev
# or
pnpm dev


Then open:
👉 http://localhost:3000

🧭 How to Use

Sign Up / Login – Create an account using Google OAuth

Track a Product – Paste any Amazon product URL in the search bar

Monitor Prices – View price history and insights on the product page

Get Notified – Receive email alerts when prices drop to your target
