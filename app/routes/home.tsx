import React from "react";
import { Link } from "react-router-dom";
import { FaLeaf, FaRecycle, FaFilter } from "react-icons/fa";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <div className="bg-gray-50 text-gray-900 px-4 py-25 min-h-[calc(100vh-160px)]">
      <div className="max-w-6xl mx-auto text-center space-y-10">
        {/* Hero */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-5xl font-bold text-green-700 hover:scale-105 hover:text-green-800 transition-transform duration-300"
        >
          Shop Smarter, Greener with Walmart EcoScore
        </motion.h1>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Link
            to="/products"
            className="inline-block bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-3 rounded-full shadow-xl transition-transform transform hover:scale-105"
          >
            Browse Sustainable Products
          </Link>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16">
          <motion.div
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 30 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition"
          >
            <div className="text-green-500 text-5xl mb-4 mx-auto">
              <FaLeaf />
            </div>
            <h3 className="text-xl font-semibold mb-2">Smartly Calculated EcoScore</h3>
            <p className="text-gray-600">
              Smart analysis of materials and packagi to give clear
              impact scores.
            </p>
          </motion.div>

          <motion.div
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 30 }}
            transition={{ delay: 0.4 }}
            className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition"
          >
            <div className="text-green-500 text-5xl mb-4 mx-auto">
              <FaRecycle />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              Recyclability & Water Use
            </h3>
            <p className="text-gray-600">
              See how recyclable products are and how much water you're saving
              by choosing them.
            </p>
          </motion.div>
   

          <motion.div
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 30 }}
            transition={{ delay: 0.6 }}
            className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition"
          >
            <div className="text-green-500 text-5xl mb-4 mx-auto">
              <FaFilter />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              Filter for Greener Products
            </h3>
            <p className="text-gray-600">
              Quickly filter and view sustainable, low-impact products across
              Walmart.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
