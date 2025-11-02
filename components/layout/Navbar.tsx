"use client"

import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const Navbar = () => {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { data: session } = useSession();

  const handleIconClick = (href: string) => {
    router.push(href)
    setIsMenuOpen(false)
  }

  const handleLinkClick = () => {
    setIsMenuOpen(false)
  }

  return (
    <header className="w-full bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 md:px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Image
                src="/assets/icons/logo.svg"
                alt="Pricewise"
                width={18}
                height={18}
                className="filter brightness-0 invert"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold font-space-grotesk text-gray-900">
                YourPrice
              </span>
              <span className="text-xs text-gray-500 -mt-1 hidden sm:block">Smart Price Tracker</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <nav className="flex items-center gap-4">
              <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors text-sm">
                Home
              </Link>
              <Link href="/products" className="text-gray-700 hover:text-blue-600 font-medium transition-colors text-sm">
                Products
              </Link>
              <Link href="/deals" className="text-gray-700 hover:text-blue-600 font-medium transition-colors text-sm">
                Hot Deals
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-blue-600 font-medium transition-colors text-sm">
                About
              </Link>
            </nav>

            <div className="flex items-center gap-3">
              {/* User Profile & Auth Section - DESKTOP */}
              {session ? (
                <div className="flex items-center gap-3">
                  {/* User Avatar */}
                  {session.user?.image && (
                    <Image
                      src={session.user.image}
                      alt={session.user.name || 'User'}
                      width={32}
                      height={32}
                      className="rounded-full border-2 border-gray-200"
                    />
                  )}
                  {/* User Info */}
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-900">
                      {session.user?.name || 'User'}
                    </span>
                    <span className="text-xs text-gray-500">
                      {session.user?.email}
                    </span>
                  </div>
                  {/* Logout Button */}
                  <button
                    onClick={() => signOut()}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  {/* Login Button */}
                  <button
                    onClick={() => signIn('google')}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all text-sm"
                  >
                    Login
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <Image
              src={isMenuOpen ? "/assets/icons/x-close.svg" : "/assets/icons/menu.svg"}
              alt="menu"
              width={20}
              height={20}
            />
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg animate-in slide-in-from-top duration-300">
            <div className="px-4 py-4 space-y-4">
              {/* Navigation Links */}
              <div className="space-y-3">
                <Link
                  href="/"
                  className="block py-3 px-4 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition-colors"
                  onClick={handleLinkClick}
                >
                  Home
                </Link>
                <Link
                  href="/products"
                  className="block py-3 px-4 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition-colors"
                  onClick={handleLinkClick}
                >
                  Products
                </Link>
                <Link
                  href="/deals"
                  className="block py-3 px-4 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition-colors"
                  onClick={handleLinkClick}
                >
                  Hot Deals
                </Link>
                <Link
                  href="/about"
                  className="block py-3 px-4 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition-colors"
                  onClick={handleLinkClick}
                >
                  About
                </Link>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200 pt-4">
                {/* Auth Section - MOBILE */}
                <div className="flex flex-col gap-4 px-4">
                  {session ? (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {session.user?.image && (
                          <Image
                            src={session.user.image}
                            alt={session.user.name || 'User'}
                            width={40}
                            height={40}
                            className="rounded-full border-2 border-gray-200"
                          />
                        )}
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-gray-900">
                            {session.user?.name || 'User'}
                          </span>
                          <span className="text-xs text-gray-500">
                            {session.user?.email}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => signOut()}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition-colors"
                      >
                        Logout
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3">
                      <button
                        onClick={() => {
                          signIn('google')
                          setIsMenuOpen(false)
                        }}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all text-sm w-full"
                      >
                        Login with Google
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Additional Mobile-only Info */}
              <div className="px-4 pt-4 border-t border-gray-200">
                <div className="text-xs text-gray-500 text-center">
                  Track prices • Save money • Shop smarter
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Navbar