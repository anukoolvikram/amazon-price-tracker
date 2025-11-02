# 🛍️ PriceTracker - Smart Price Tracking Application

A modern, full-stack web application that helps users track product prices from Amazon and receive notifications when prices drop. Built with Next.js 14, TypeScript, Tailwind CSS, and MongoDB.

---

## ✨ Features

- 🔍 **Smart Price Tracking** - Automatically monitor Amazon product prices in real-time
- 🔔 **Price Drop Alerts** - Receive email notifications when prices hit your target threshold
- 📊 **Price History** - Visualize comprehensive price trends over time with interactive charts
- 🎯 **Product Insights** - View highest, lowest, and average prices with detailed analytics
- 🔐 **User Authentication** - Secure login system with Google OAuth 2.0 integration
- 📱 **Responsive Design** - Seamless experience across all devices and screen sizes
- ⚡ **Real-time Updates** - Live price monitoring with automatic synchronization
- 🎨 **Modern UI/UX** - Clean, intuitive interface with smooth animations

---

## 🚀 Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **UI Components**: React 18+

### Backend
- **API**: Next.js API Routes
- **Server Actions**: Next.js Server Components
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: NextAuth.js v4
- **Web Scraping**: Cheerio

### DevOps & Deployment
- **Hosting**: Vercel
- **Version Control**: Git & GitHub
- **Package Manager**: npm/yarn/pnpm

---

## 📦 Installation & Setup

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** 18.0 or higher
- **npm**, **yarn**, or **pnpm** package manager
- **MongoDB** (local installation or MongoDB Atlas account)
- **Google Cloud Console** account (for OAuth credentials)
- **ScraperAPI** account (for web scraping)

### 1. Clone the Repository

```bash
git clone https://github.com/anukoolvikram/amazon-price-tracker.git
cd amazon-price-tracker
```

### 2. Install Dependencies

Choose your preferred package manager:

```bash
# Using npm
npm install

# Using yarn
yarn install

# Using pnpm
pnpm install
```

### 3. Environment Configuration

Create a `.env.local` file in the root directory and configure the following environment variables:

```env
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/price-tracker
# For MongoDB Atlas, use: mongodb+srv://<username>:<password>@<cluster>.mongodb.net/price-tracker

# ScraperAPI Configuration
SCRAPERAPI_KEY=your-scraperapi-key-here

# Email Configuration (for notifications)
EMAIL_ID=your-sender-email@gmail.com
EMAIL_PASSWORD=your-email-app-password

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-super-secret-nextauth-secret-min-32-chars

# Google OAuth 2.0 Credentials
GOOGLE_CLIENT_ID=your-google-oauth-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-oauth-client-secret
```

### 4. Google OAuth Setup

Follow these steps to configure Google OAuth:

1. Navigate to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **Google+ API** or **Google People API**
4. Go to **Credentials** → **Create Credentials** → **OAuth 2.0 Client ID**
5. Configure the OAuth consent screen with application details
6. Set the application type to **Web application**
7. Add authorized redirect URIs:
   - Development: `http://localhost:3000/api/auth/callback/google`
   - Production: `https://yourdomain.com/api/auth/callback/google`
8. Copy the **Client ID** and **Client Secret** to your `.env.local` file

### 5. Email Configuration

To enable price drop notifications:

1. Use a Gmail account for sending emails
2. Enable **2-Factor Authentication** on your Google account
3. Generate an **App Password**:
   - Go to Google Account Settings → Security → 2-Step Verification
   - Scroll down to **App passwords**
   - Generate a new app password for "Mail"
4. Use this app password in the `EMAIL_PASSWORD` environment variable

### 6. ScraperAPI Setup

1. Sign up at [ScraperAPI](https://www.scraperapi.com/)
2. Get your API key from the dashboard
3. Add it to `SCRAPERAPI_KEY` in your `.env.local` file

### 7. Database Setup

**For Local MongoDB:**
```bash
# Start MongoDB service
mongod --dbpath /path/to/your/data/directory
```

**For MongoDB Atlas:**
1. Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a database user with read/write permissions
3. Whitelist your IP address (or use 0.0.0.0/0 for development)
4. Get your connection string and add it to `MONGODB_URI`

### 8. Run the Development Server

```bash
# Using npm
npm run dev

# Using yarn
yarn dev

# Using pnpm
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

---

## 📖 Usage Guide

### Getting Started

1. **Sign Up/Login**
   - Click on the "Sign In" button
   - Authenticate using your Google account
   - Grant necessary permissions

2. **Track a Product**
   - Copy any Amazon product URL
   - Paste it into the search bar on the home page
   - Click "Track" to start monitoring the product
   - Wait for the initial scrape to complete

3. **Monitor Prices**
   - Navigate to the product detail page
   - View comprehensive price history with interactive charts
   - Check highest, lowest, and average price statistics
   - Analyze price trends over time

4. **Set Up Alerts**
   - Enter your email address on the product page
   - Set your desired target price
   - Receive automatic email notifications when the price drops
   - Manage your tracked products from your dashboard

### Key Features

- **Dashboard**: View all your tracked products in one place
- **Price Charts**: Interactive visualizations of price history
- **Email Notifications**: Automatic alerts for price drops
- **Product Comparison**: Compare prices across different time periods
- **Search History**: Quick access to previously tracked products

---

## 🏗️ Project Structure

```
amazon-price-tracker/
├── app/                        # Next.js 14 app directory
│   ├── api/                   # API routes
│   │   └── auth/             # NextAuth configuration
│   ├── products/             # Product pages
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Home page
├── components/                # React components
│   ├── ui/                   # UI components
│   ├── ProductCard.tsx       # Product display component
│   └── PriceChart.tsx        # Price history chart
├── lib/                       # Utility functions
│   ├── actions/              # Server actions
│   ├── models/               # Mongoose models
│   ├── scraper/              # Web scraping logic
│   └── utils.ts              # Helper functions
├── public/                    # Static assets
├── types/                     # TypeScript type definitions
├── .env.local                # Environment variables (create this)
├── next.config.js            # Next.js configuration
├── tailwind.config.ts        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
└── package.json              # Project dependencies
```

---

## 🔧 Configuration

### Next.js Configuration

The `next.config.js` file includes:
- Image optimization settings for Amazon product images
- Environment variable handling
- Custom webpack configurations

### Tailwind CSS

Custom theme configuration in `tailwind.config.ts`:
- Custom color palette
- Extended spacing and typography
- Responsive breakpoints
- Animation utilities


## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👨‍💻 Author

**Anukool Vikram**
- GitHub: [@anukoolvikram](https://github.com/anukoolvikram)
- Repository: [amazon-price-tracker](https://github.com/anukoolvikram/amazon-price-tracker)

---

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- MongoDB for the database solution
- ScraperAPI for reliable web scraping
- Vercel for seamless deployment
- All contributors and users of this project
