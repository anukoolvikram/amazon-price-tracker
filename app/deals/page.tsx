"use client"

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState, useEffect } from 'react'

const HotDealsPage = () => {
  const [currentEmoji, setCurrentEmoji] = useState(0)
  
  const emojis = ['🔥', '⚡', '🎯', '💰', '🏷️', '👑']
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEmoji((prev) => (prev + 1) % emojis.length)
    }, 2000)
    
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Animated Emoji */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 260, 
            damping: 20,
            duration: 1 
          }}
          className="text-8xl mb-8"
        >
          {emojis[currentEmoji]}
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold font-space-grotesk text-gray-900 mb-6"
        >
          Hot Deals
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="text-orange-500 ml-2"
          >
            🔥
          </motion.span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-xl md:text-2xl text-gray-600 mb-8 font-medium"
        >
          Something amazing is cooking!
        </motion.p>

        {/* Coming Soon Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 1 }}
          className="inline-block bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-2xl mb-12"
        >
          <motion.span
            animate={{ 
              textShadow: [
                "0 0 0px rgba(255,255,255,0)",
                "0 0 20px rgba(255,255,255,1)",
                "0 0 0px rgba(255,255,255,0)"
              ]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="text-2xl font-bold font-space-grotesk"
          >
            Coming Soon
          </motion.span>
        </motion.div>

        {/* Feature List */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          {[
            { icon: '🎯', text: 'Flash Sales', desc: 'Limited time offers' },
            { icon: '⚡', text: 'Lightning Deals', desc: 'Quick expiring deals' },
            { icon: '👑', text: 'Premium Offers', desc: 'Exclusive discounts' },
          ].map((feature, index) => (
            <motion.div
              key={feature.text}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 + index * 0.2, duration: 0.6 }}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-orange-200 shadow-lg"
            >
              <div className="text-3xl mb-3">{feature.icon}</div>
              <h3 className="font-semibold text-gray-900 mb-1">{feature.text}</h3>
              <p className="text-gray-600 text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Countdown Timer (Optional) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-orange-300 shadow-xl"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Get Ready for Amazing Deals! 🚀
          </h3>
          
          <motion.div
            animate={{ 
              backgroundColor: ["#fed7aa", "#fdba74", "#fed7aa"]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity 
            }}
            className="w-full bg-orange-200 rounded-full h-3 mb-4"
          >
            <motion.div
              animate={{ 
                width: ["0%", "100%", "0%"],
                backgroundColor: ["#ea580c", "#dc2626", "#ea580c"]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="h-3 rounded-full"
            />
          </motion.div>

          <p className="text-gray-600 mb-6">
            We're working hard to bring you the hottest deals and exclusive offers!
          </p>

          {/* Notify Me Button */}
          {/* <motion.button
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 10px 30px -10px rgba(249, 115, 22, 0.5)"
            }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            🔔 Notify Me When Live
          </motion.button> */}
        </motion.div>

        {/* Floating Elements */}
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 left-10 text-4xl opacity-60"
        >
          🎁
        </motion.div>
        
        <motion.div
          animate={{ 
            y: [0, 15, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-20 right-10 text-4xl opacity-60"
        >
          💎
        </motion.div>

        <motion.div
          animate={{ 
            y: [0, -10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 2.5, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
          className="absolute top-1/3 right-1/4 text-3xl opacity-40"
        >
          ✨
        </motion.div>
      </div>
    </div>
  )
}

export default HotDealsPage