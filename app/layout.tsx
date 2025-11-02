import Navbar from '@/components/layout/Navbar'
import './globals.css'
import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import AuthProvider from '@/components/AuthProvider'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter'
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-space-grotesk'
})

export const metadata: Metadata = {
  title: 'YourPrice - Track Prices & Save Money',
  description: 'Track product prices effortlessly and save money on your online shopping.',
  keywords: 'price tracking, shopping, deals, amazon, ecommerce',
  icons: {
    icon: '/assets/icons/icon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans`}>
        <AuthProvider>
          <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            <Navbar />
            <main className="max-w-7xl mx-auto">
              {children}
            </main>
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}