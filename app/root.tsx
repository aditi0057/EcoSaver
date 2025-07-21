import React from "react";
import { Outlet, Link } from "react-router-dom";
import {
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaEnvelope,
} from "react-icons/fa";
import "app/app.css";

export default function RootLayout() {
  return (
    <div className="font-sans min-h-screen flex flex-col bg-gray-50 text-gray-900">
      {/* Navbar */}
      <header className="bg-white shadow-md px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <Link
          to="/"
          className="text-2xl font-extrabold text-green-600 hover:text-green-700 tracking-tight"
        >
          EcoSaver 🌿
        </Link>
        <nav className="space-x-6 text-gray-700 font-medium">
          <Link to="/" className="hover:text-green-600 transition">
            Home
          </Link>
          <Link to="/about" className="hover:text-green-600 transition">
            About Us
          </Link>
          <Link to="/products" className="hover:text-green-600 transition">
            Products
          </Link>
          <Link to="/cart" className="hover:text-green-600 transition">
            Cart
          </Link>
          <Link to="/ecoparse" className="hover:text-green-600 transition">
            EcoParse
          </Link>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-grow overflow-y-auto">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-8 px-6 py-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
        <p>© 2025 EcoSaver. All rights reserved.</p>
        <div className="flex space-x-4 mt-2 md:mt-0 text-xl">
  <a href="mailto:hello@ecosaver.in" className="hover:text-green-500">
    <FaEnvelope size={24} />
  </a>
  <a href="https://instagram.com" className="hover:text-pink-500">
    <FaInstagram size={24} />
  </a>
  <a href="https://linkedin.com" className="hover:text-blue-700">
    <FaLinkedin size={24} />
  </a>
  <a href="https://twitter.com" className="hover:text-blue-400">
    <FaTwitter size={24} />
  </a>
</div>

      </footer>
    </div>
  );
}
