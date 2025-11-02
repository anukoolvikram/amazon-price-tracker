"use client"

import { useRouter } from 'next/navigation'
import Image from 'next/image'
import ProductCard from '../cards/ProductCard'
import { Product } from '@/types'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

interface Props {
  products: Product[];
}

const TrendingSection = ({ products }: Props) => {
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    setIsVisible(true)
  }, [])

  const handleViewAll = () => {
    router.push('/products?sort=price-drop&filter=trending')
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  // Calculate biggest price drop
  const biggestDrop = products.length > 0 
    ? Math.max(...products.map(p => {
        const highest = p.highestPrice || p.originalPrice || p.currentPrice
        const current = p.currentPrice
        return ((highest - current) / highest) * 100
      }))
    : 0

  // Safe timestamp formatting - only render on client
  const formattedTime = isMounted 
    ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })
    : 'Loading...'

  return (
    <section className="relative py-16 md:py-20 bg-gradient-to-br from-orange-50 to-red-50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-slate-200 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,white)]" />
      
      {/* Floating Elements */}
      <div className="absolute top-10 left-5 md:left-10 text-2xl opacity-20 animate-float">
        🔥
      </div>
      <div className="absolute top-20 right-8 text-xl opacity-30 animate-float-delayed">
        ⚡
      </div>
      <div className="absolute bottom-16 left-10 text-xl opacity-25 animate-float">
        💰
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header with Enhanced Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 border border-orange-200 shadow-sm mb-4">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-orange-700">LIVE TRENDING DEALS</span>
            <span className="text-xs text-orange-600">
              Updated {formattedTime}
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold font-space-grotesk text-gray-900 mb-4">
            Hot Right Now 
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-red-500 ml-3"
            >
              🔥
            </motion.span>
          </h2>
          
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Don't miss these sizzling deals with massive price drops! 
            {biggestDrop > 0 && (
              <span className="font-semibold text-red-600">
                {' '}Biggest save: {biggestDrop.toFixed(0)}% off!
              </span>
            )}
          </p>
        </motion.div>

        {/* Stats Bar */}
        {products.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-4 md:gap-8 mb-12"
          >
            <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-3 shadow-lg border border-orange-200">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-gray-700">
                <span className="text-green-600 font-bold">{products.length}</span> Active Deals
              </span>
            </div>
            
            <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-3 shadow-lg border border-orange-200">
              <div className="text-orange-500 text-lg">⚡</div>
              <span className="text-sm font-medium text-gray-700">
                Updated <span className="text-orange-600 font-bold">Every 5 mins</span>
              </span>
            </div>
            
            <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-3 shadow-lg border border-orange-200">
              <div className="text-red-500 text-lg">🎯</div>
              <span className="text-sm font-medium text-gray-700">
                <span className="text-red-600 font-bold">Limited Time</span> Offers
              </span>
            </div>
          </motion.div>
        )}

        {/* Products Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="mb-12"
        >
          {products && products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {products.map((product, index) => (
                <motion.div
                  key={product._id}
                  whileHover={{ 
                    y: -8,
                    transition: { duration: 0.3 }
                  }}
                  className="relative"
                >
                  {/* Hot Badge for top deals */}
                  {index < 2 && (
                    <div className="absolute -top-2 -right-2 z-20">
                      <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                        <span>HOT</span>
                        <span>🔥</span>
                      </div>
                    </div>
                  )}
                  
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-center py-16"
            >
              <div className="text-6xl mb-4">😴</div>
              <div className="text-2xl font-semibold text-gray-400 mb-3">
                No trending deals right now
              </div>
              <p className="text-gray-500 max-w-md mx-auto leading-relaxed">
                Deals are heating up! Check back soon for sizzling price drops and limited-time offers.
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Enhanced CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-8 md:p-12 text-white shadow-2xl">
            <h3 className="text-2xl md:text-3xl font-bold font-space-grotesk mb-4">
              Want More Deals Like These? 🚀
            </h3>
            <p className="text-orange-100 text-lg mb-6 max-w-2xl mx-auto">
              Discover thousands more products with real-time price tracking and smart alerts!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                onClick={handleViewAll}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
                }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-orange-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all flex items-center gap-3 group"
              >
                Explore All Deals
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="group-hover:translate-x-1 transition-transform"
                >
                  🔥
                </motion.span>
              </motion.button>
              
              <button 
                onClick={() => router.push('/search')}
                className="border-2 border-white text-white px-6 py-4 rounded-xl font-semibold hover:bg-white hover:text-orange-600 transition-all"
              >
                Track New Product
              </button>
            </div>
            
            <p className="text-orange-200 text-sm mt-4">
              🎯 Pro Tip: Prices update every 5 minutes. Don't wait too long!
            </p>
          </div>
        </motion.div>
      </div>

      {/* Add CSS for floating animation */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(-5deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 7s ease-in-out infinite;
        }
        .bg-grid-slate-200 {
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(226 232 240 / 0.5)'%3e%3cpath d='m0 .5h31.5m-32 16h31.5m-32 16h31.5m-16-32v31.5m-16-16h31.5m-16-16v31.5m-16-16h31.5'/%3e%3c/svg%3e");
        }
      `}</style>
    </section>
  )
}

export default TrendingSection