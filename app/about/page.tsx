"use client"

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'

const AboutPage = () => {
  const [activeTab, setActiveTab] = useState('mission')

  const stats = [
    { number: '50K+', label: 'Products Tracked', emoji: '📊' },
    { number: '$2.1M+', label: 'Total Saved', emoji: '💰' },
    { number: '95%', label: 'Accuracy Rate', emoji: '🎯' },
    { number: '24/7', label: 'Price Monitoring', emoji: '👁️' },
  ]

  const team = [
    { name: 'Alex Chen', role: 'Price Hunter', emoji: '🦅', specialty: 'Finds deals before they\'re cool' },
    { name: 'Maya Rodriguez', role: 'Deal Detective', emoji: '🕵️‍♀️', specialty: 'Spots pricing patterns' },
    { name: 'Jordan Smith', role: 'Savings Scientist', emoji: '🧪', specialty: 'Analyzes price trends' },
    { name: 'Taylor Kim', role: 'Bargain Boss', emoji: '👑', specialty: 'Negotiates exclusive deals' },
  ]

  const values = [
    { icon: '⚡', title: 'Lightning Fast', desc: 'Real-time price updates that never miss a beat' },
    { icon: '🎯', title: 'Pinpoint Accurate', desc: 'Precision tracking that hits the bullseye every time' },
    { icon: '🛡️', title: 'Trustworthy', desc: 'Your shopping companion you can rely on' },
    { icon: '🚀', title: 'Always Evolving', desc: 'Constantly leveling up to serve you better' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 100 }}
              className="text-5xl md:text-7xl font-bold font-space-grotesk mb-6"
            >
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                About
              </span>
              <motion.span
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="ml-4"
              >
                🚀
              </motion.span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto font-medium"
            >
              We're the <span className="font-bold text-purple-600">price-tracking superheroes</span> on a mission to make sure you never overpay again!
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 border border-purple-200 shadow-lg"
            >
              <span className="text-sm font-medium text-gray-700">Born to Save You Money</span>
              <motion.span
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                💸
              </motion.span>
            </motion.div>
          </motion.div>

          {/* Floating Elements */}
          <motion.div
            animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute top-10 left-10 text-3xl opacity-60"
          >
            💎
          </motion.div>
          <motion.div
            animate={{ y: [0, 15, 0], rotate: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: 1 }}
            className="absolute top-20 right-10 text-4xl opacity-70"
          >
            🎯
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center p-6 bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all"
              >
                <div className="text-3xl mb-2">{stat.emoji}</div>
                <div className="text-3xl font-bold font-space-grotesk bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission & Story Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl border border-gray-200 shadow-2xl overflow-hidden">
            {/* Tab Navigation */}
            <div className="flex border-b border-gray-200">
              {[
                { id: 'mission', label: 'Our Mission', emoji: '🎯' },
                { id: 'story', label: 'Our Story', emoji: '📖' },
                { id: 'vision', label: 'Our Vision', emoji: '🔮' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-2 py-6 font-semibold transition-all ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                      : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                  }`}
                >
                  <span className="text-xl">{tab.emoji}</span>
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="p-8 md:p-12">
              {activeTab === 'mission' && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-center"
                >
                  <div className="text-6xl mb-6">🎯</div>
                  <h2 className="text-3xl font-bold font-space-grotesk text-gray-900 mb-6">
                    Our Mission: Your Savings
                  </h2>
                  <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                    We're on a <span className="font-bold text-purple-600">crusade against overpricing</span>. Our mission is simple but powerful: 
                    empower every shopper with the tools and intelligence to make smart purchasing decisions. 
                    We believe everyone deserves to get the best value for their money, without the stress of constant price checking.
                  </p>
                </motion.div>
              )}

              {activeTab === 'story' && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-center"
                >
                  <div className="text-6xl mb-6">📖</div>
                  <h2 className="text-3xl font-bold font-space-grotesk text-gray-900 mb-6">
                    From Frustration to Innovation
                  </h2>
                  <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                    It all started when our founder bought a laptop, only to see it go on sale for <span className="font-bold text-red-500">40% off the next day</span>. 
                    That moment of frustration sparked an idea: what if there was a smarter way to shop? 
                    Today, we're a passionate team of <span className="font-bold text-green-600">deal hunters, data scientists, and shopping enthusiasts</span> 
                    united by one goal: making sure you get the best deals, every time.
                  </p>
                </motion.div>
              )}

              {activeTab === 'vision' && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-center"
                >
                  <div className="text-6xl mb-6">🔮</div>
                  <h2 className="text-3xl font-bold font-space-grotesk text-gray-900 mb-6">
                    The Future of Smart Shopping
                  </h2>
                  <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                    We envision a world where <span className="font-bold text-blue-600">smart shopping is accessible to everyone</span>. 
                    Where price anxiety is a thing of the past, and every purchase feels like a victory. 
                    We're building the future of e-commerce—one where AI-powered insights, real-time tracking, 
                    and community-driven deals create the ultimate shopping experience.
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold font-space-grotesk mb-4">
              Our Superpowers 🦸‍♂️
            </h2>
            <p className="text-xl opacity-90">
              The values that make us your ultimate shopping sidekick
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
                className="text-center p-8 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold font-space-grotesk mb-3">
                  {value.title}
                </h3>
                <p className="opacity-90 leading-relaxed">
                  {value.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold font-space-grotesk text-gray-900 mb-4">
              Meet the Dream Team 🌟
            </h2>
            <p className="text-xl text-gray-600">
              The brilliant minds working tirelessly to save you money
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="text-center group"
              >
                <motion.div
                  whileHover={{ rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 0.5 }}
                  className="text-6xl mb-4"
                >
                  {member.emoji}
                </motion.div>
                <h3 className="text-xl font-bold font-space-grotesk text-gray-900 mb-2">
                  {member.name}
                </h3>
                <div className="text-purple-600 font-semibold mb-2">
                  {member.role}
                </div>
                <p className="text-gray-600 text-sm">
                  {member.specialty}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-orange-500 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold font-space-grotesk mb-6">
              Ready to Join the Savings Revolution? 🚀
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Start tracking prices like a pro and never overpay again!
            </p>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-purple-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all"
            >
              Start Saving Today! 💰
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage