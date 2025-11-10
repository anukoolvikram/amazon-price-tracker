"use client"

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState, useEffect } from 'react'

const WorkProcess = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  useEffect(() => {
    if (inView) {
      const interval = setInterval(() => {
        setCurrentStep((prev) => (prev + 1) % 3)
      }, 3000)
      return () => clearInterval(interval)
    }
  }, [inView])

  const steps = [
    {
      number: 1,
      title: "Paste Product Link",
      description: "Copy any product URL from Amazon and paste it into our smart tracker",
      icon: "📋",
      color: "blue",
      details: "We support all major Amazon domains and product categories",
      emoji: "🔗"
    },
    {
      number: 2,
      title: "Track Prices Automatically",
      description: "Our AI monitors price changes 24/7 and analyzes historical trends",
      icon: "📊",
      color: "green",
      details: "Real-time monitoring with 5-minute update intervals",
      emoji: "👁️"
    },
    {
      number: 3,
      title: "Get Smart Price Alerts",
      description: "Receive instant notifications when prices hit your target",
      icon: "🔔",
      color: "purple",
      details: "Customizable alerts for price drops, stock availability, and more",
      emoji: "🎯"
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  const pulseVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  return (
    <section className="relative py-20 md:py-28 bg-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-dots-blue-200/30" />

      {/* Floating Elements */}
      <motion.div
        animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute top-20 left-10 text-3xl opacity-20"
      >
        💡
      </motion.div>
      <motion.div
        animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        className="absolute bottom-20 right-10 text-2xl opacity-20"
      >
        🚀
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 border border-blue-200 shadow-sm mb-6">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-blue-700">SMART SHOPPING SIMPLIFIED</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold font-space-grotesk text-gray-900 mb-6">
            How
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> PriceWise </span>
            Works
          </h2>

          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Transform your shopping experience in three simple steps.
            <span className="font-semibold text-blue-600"> Save money effortlessly</span> with our intelligent price tracking.
          </p>
        </motion.div>

        {/* Steps Container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="relative"
        >
          {/* Connecting Line */}
          <div className="absolute top-24 left-1/2 transform -translate-x-1/2 w-3/4 h-0.5 bg-gradient-to-r from-blue-200 via-green-200 to-purple-200 hidden md:block">
            <motion.div
              animate={{ width: ["0%", "100%"] }}
              transition={{ duration: 2, delay: 0.5 }}
              className="h-full bg-gradient-to-r from-blue-500 via-green-500 to-purple-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                whileHover={{
                  y: -10,
                  transition: { duration: 0.3 }
                }}
                className={`relative text-center group ${currentStep === index ? 'scale-105' : 'scale-100'
                  } transition-transform duration-300`}
              >
                {/* Step Card */}
                <div className="bg-white rounded-2xl p-8 shadow-2xl border border-gray-200 hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
                  {/* Active State Glow */}
                  {currentStep === index && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl"
                    />
                  )}

                  {/* Step Number with Animation */}
                  <motion.div
                    animate={currentStep === index ? "pulse" : ""}
                    className={`relative z-10 w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center shadow-lg ${step.color === 'blue'
                      ? 'bg-blue-500'
                      : step.color === 'green'
                        ? 'bg-green-500'
                        : 'bg-purple-500'
                      }`}
                  >
                    <div className="text-white text-2xl font-bold relative">
                      {step.number}
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute -top-1 -right-1 text-lg"
                      >
                        {step.emoji}
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Main Icon */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="text-5xl mb-4"
                  >
                    {step.icon}
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold font-space-grotesk text-gray-900 mb-4">
                    {step.title}
                  </h3>

                  <p className="text-gray-600 text-lg leading-relaxed mb-4">
                    {step.description}
                  </p>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-sm text-gray-500 font-medium"
                  >
                    {step.details}
                  </motion.p>

                  {/* Progress Indicator */}
                  <div className="mt-6 flex justify-center space-x-1">
                    {steps.map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${i === index
                          ? step.color === 'blue'
                            ? 'bg-blue-500 w-6'
                            : step.color === 'green'
                              ? 'bg-green-500 w-6'
                              : 'bg-purple-500 w-6'
                          : 'bg-gray-300'
                          }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Step Connector (Mobile) */}
                {index < steps.length - 1 && (
                  <div className="md:hidden flex justify-center my-6">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-2xl text-gray-300"
                    >
                      ↓
                    </motion.div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 0.6 }}
          className="text-center mt-16"
        >
          <div className="bg-blue-600 rounded-2xl p-8 md:p-12 text-white shadow-2xl max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold font-space-grotesk mb-4">
              Ready to Start Saving? 🎉
            </h3>
            <p className="text-blue-100 text-lg mb-6 max-w-2xl mx-auto">
              Join thousands of smart shoppers who never overpay. Start tracking your first product now!
            </p>

            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all flex items-center gap-3 mx-auto group"
            >
              Start Tracking Now
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="group-hover:translate-x-1 transition-transform"
              >
                🚀
              </motion.span>
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Add CSS for background pattern */}
      <style jsx global>{`
        .bg-dots-blue-200\/30 {
          background-image: radial-gradient(circle, #93c5fd 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}</style>
    </section>
  )
}

export default WorkProcess;