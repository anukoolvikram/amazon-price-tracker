"use client"

import { scrapeAndStoreProduct } from '@/lib/actions';
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation';
import { useSession, signIn } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

// Validation function
const isValidAmazonProductURL = (url: string) => {
  try {
    const parsedURL = new URL(url);
    const hostname = parsedURL.hostname;

    if (
      hostname.includes('amazon.') ||
      hostname.includes('amzn.in') ||
      hostname.includes('a.co') ||
      hostname.includes('amazon.com')
    ) {
      return true;
    }
  } catch (error) {
    return false;
  }
  return false;
}

const Searchbar = () => {
  const [searchPrompt, setSearchPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();

  // Get session status
  const { data: session, status } = useSession();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    const isValidLink = isValidAmazonProductURL(searchPrompt);
    if (!isValidLink) {
      setError('Please provide a valid Amazon product link');
      return;
    }

    if (status !== 'authenticated') {
      setError('Please log in to track a product.');
      return;
    }

    try {
      setIsLoading(true);
      const product = await scrapeAndStoreProduct(searchPrompt);
      if (product) {
        router.push(`/products/${product._id}`);
      }
    } catch (error: any) {
      setError(`Failed to track product: ${error.message}`);
    } finally {
      setIsLoading(false);
      setSearchPrompt(''); // Clear the search bar
    }
  }

  // Render loading state
  if (status === 'loading') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center gap-6 mt-12"
      >
        <div className="w-full max-w-2xl">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 h-14 bg-white/20 rounded-xl animate-pulse" />
            <div className="w-32 h-14 bg-white/20 rounded-xl animate-pulse" />
          </div>
        </div>
      </motion.div>
    )
  }

  // Render Login button if unauthenticated
  if (status === 'unauthenticated') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-12 text-center"
      >
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 max-w-md mx-auto">
          <div className="text-4xl mb-4">🔐</div>
          <h3 className="text-white text-xl font-bold font-space-grotesk mb-3">
            Login to Start Tracking
          </h3>
          <p className="text-white/80 mb-6 leading-relaxed">
            Sign in to track prices, get alerts, and save money on your favorite products!
          </p>
          <motion.button
            onClick={() => signIn('google')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all w-full flex items-center justify-center gap-3 group"
          >
            <Image
              src="/assets/icons/google.svg"
              alt="Google"
              width={20}
              height={20}
            />
            Continue with Google
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="group-hover:translate-x-1 transition-transform"
            >
              →
            </motion.span>
          </motion.button>
        </div>
      </motion.div>
    )
  }

  // Render Searchbar if authenticated
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="w-full max-w-4xl mx-auto"
    >
      <form
        className="flex flex-col sm:flex-row gap-4 mt-12 relative"
        onSubmit={handleSubmit}
      >
        {/* Main Search Container */}
        <div className={`flex-1 relative transition-all duration-300 group ${isFocused ? 'scale-105' : 'scale-100'
          }`}>
          {/* Input Container with Glow Effect */}
          <div className={`relative rounded-xl transition-all duration-300 ${isFocused ? 'ring-2 ring-yellow-400/50 ring-opacity-50' : ''
            }`}>
            <motion.input
              type="text"
              value={searchPrompt}
              onChange={(e:React.ChangeEvent<HTMLInputElement>) => setSearchPrompt(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Paste Amazon product link here..."
              className="w-full p-4 pl-12 pr-12 border-2 border-white/30 bg-white/10 backdrop-blur-sm rounded-xl
                text-white placeholder-white/60 focus:outline-none focus:border-yellow-400 focus:bg-white/20
                text-lg font-medium transition-all duration-300 shadow-2xl"
              disabled={isLoading}
            />

            {/* Left Icon Container */}
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center justify-center w-6 h-6">
              <motion.div
                animate={isLoading ? { rotate: 360 } : {}}
                transition={isLoading ? { duration: 1, repeat: Infinity, ease: "linear" } : {}}
                className="flex items-center justify-center"
              >
                <Image
                  src={isLoading ? "/assets/icons/loading.svg" : "/assets/icons/search.svg"}
                  alt="search"
                  width={20}
                  height={20}
                  className={isLoading ? "filter brightness-0 invert" : "filter brightness-0 invert opacity-80"}
                />
              </motion.div>
            </div>

            {/* Right Clear Button Container */}
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              {searchPrompt && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  type="button"
                  onClick={() => setSearchPrompt('')}
                  className="p-1 mt-1 rounded-lg hover:bg-white/20 transition-all duration-200 
                    border border-white/20 hover:border-white/40 group/clear"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    whileHover={{ rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Image
                      src="/assets/icons/x-close.svg"
                      alt="clear input"
                      width={16}
                      height={16}
                      className="filter brightness-0 invert opacity-70 group-hover/clear:opacity-100 transition-opacity"
                    />
                  </motion.div>
                </motion.button>
              )}
            </div>
          </div>

          {/* Focus Indicator Line */}
          {isFocused && (
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-400 rounded-full transform origin-left"
            />
          )}
        </div>

        {/* Search Button */}
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-8 py-4 rounded-xl font-bold text-lg
                    hover:shadow-2xl transition-all duration-300 flex items-center gap-3 min-w-[140px] justify-center
                    disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
          disabled={searchPrompt === '' || isLoading}
        >
          {isLoading ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full"
              />
              Tracking...
            </>
          ) : (
            <>
              Track Price
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🔍
              </motion.span>
            </>
          )}
        </motion.button>
      </form>

      {/* Examples & Instructions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 text-center"
      >
        <p className="text-white/60 text-sm mb-3">
          Copy and paste any Amazon product URL. For example:
        </p>
        <div className="flex flex-wrap justify-center gap-2 text-xs">
          {[
            "https://amazon.com/dp/PRODUCT_ID",
            "https://amzn.in/PRODUCT_ID",
            "https://amazon.co.uk/dp/PRODUCT_ID"
          ].map((example, index) => (
            <motion.span
              key={example}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="bg-white/10 px-3 py-1 rounded-full text-white/70 border border-white/20"
            >
              {example}
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* Error Display */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-4 p-4 bg-red-500/20 border border-red-400/30 rounded-xl backdrop-blur-sm"
          >
            <div className="flex items-center gap-3 text-red-100">
              <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm">!</span>
              </div>
              <p className="text-sm font-medium">{error}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success State (when product is being tracked) */}
      <AnimatePresence>
        {!isLoading && searchPrompt && isValidAmazonProductURL(searchPrompt) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 bg-green-500/20 border border-green-400/30 rounded-xl backdrop-blur-sm"
          >
            <div className="flex items-center gap-3 text-green-100">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm">✓</span>
              </div>
              <p className="text-sm font-medium">Valid Amazon link detected! Ready to track.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default Searchbar