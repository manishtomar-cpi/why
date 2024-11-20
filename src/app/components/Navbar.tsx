// src/app/components/Navbar.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FiShoppingCart, FiMenu, FiX } from 'react-icons/fi';

const Navbar: React.FC = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo and Tagline */}
          <div className="flex items-center">
            <Link href="/" className="flex flex-col items-start">
              <span className="text-2xl font-bold text-primary">WHY</span>
              <span className="text-sm text-gray-500">We are here for you</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link href="/" className="text-gray-700 hover:text-primary">
              Home
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-primary">
              About Us
            </Link>

            {/* Services Dropdown */}
            <div className="relative">
              <button
                onClick={() => setServicesOpen(!servicesOpen)}
                className="flex items-center text-gray-700 hover:text-primary focus:outline-none"
                aria-haspopup="true"
                aria-expanded={servicesOpen}
              >
                Services
                <svg
                  className="w-4 h-4 ml-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.44l3.71-4.21a.75.75 0 011.08 1.04l-4.25 4.82a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" />
                </svg>
              </button>
              {/* Dropdown Menu */}
              {servicesOpen && (
                <div
                  className="absolute mt-2 py-2 w-48 bg-white rounded-md shadow-xl"
                  role="menu"
                  aria-label="Services"
                >
                  <Link href="/services/tiffin" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    Tiffin Service
                  </Link>
                </div>
              )}
            </div>

            {/* Menu Dropdown */}
            <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center text-gray-700 hover:text-primary focus:outline-none"
                aria-haspopup="true"
                aria-expanded={menuOpen}
              >
                Menu
                <svg
                  className="w-4 h-4 ml-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.44l3.71-4.21a.75.75 0 011.08 1.04l-4.25 4.82a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" />
                </svg>
              </button>
              {/* Dropdown Menu */}
              {menuOpen && (
                <div
                  className="absolute mt-2 py-2 w-48 bg-white rounded-md shadow-xl"
                  role="menu"
                  aria-label="Menu"
                >
                  <Link href="/menu/lunch" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    Lunch
                  </Link>
                  <Link href="/menu/dinner" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    Dinner
                  </Link>
                </div>
              )}
            </div>

            <Link href="/cart" className="text-gray-700 hover:text-primary" aria-label="Cart">
              <FiShoppingCart size={24} />
            </Link>
            <Link href="/auth" className="text-gray-700 hover:text-primary">
              Login/Signup
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setNavbarOpen(!navbarOpen)}
              className="text-gray-700 hover:text-primary focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {navbarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {navbarOpen && (
          <div className="md:hidden">
            <Link href="/" className="block px-2 py-2 text-gray-700 hover:bg-gray-100">
              Home
            </Link>
            <Link href="/about" className="block px-2 py-2 text-gray-700 hover:bg-gray-100">
              About Us
            </Link>
            {/* Services Mobile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setServicesOpen(!servicesOpen)}
                className="flex items-center w-full px-2 py-2 text-gray-700 hover:bg-gray-100 focus:outline-none"
                aria-haspopup="true"
                aria-expanded={servicesOpen}
              >
                Services
                <svg
                  className="w-4 h-4 ml-auto"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.44l3.71-4.21a.75.75 0 011.08 1.04l-4.25 4.82a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" />
                </svg>
              </button>
              {servicesOpen && (
                <div className="mt-1">
                  <Link href="/services/tiffin" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    Tiffin Service
                  </Link>
                </div>
              )}
            </div>
            {/* Menu Mobile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center w-full px-2 py-2 text-gray-700 hover:bg-gray-100 focus:outline-none"
                aria-haspopup="true"
                aria-expanded={menuOpen}
              >
                Menu
                <svg
                  className="w-4 h-4 ml-auto"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.44l3.71-4.21a.75.75 0 011.08 1.04l-4.25 4.82a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" />
                </svg>
              </button>
              {menuOpen && (
                <div className="mt-1">
                  <Link href="/menu/lunch" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    Lunch
                  </Link>
                  <Link href="/menu/dinner" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    Dinner
                  </Link>
                </div>
              )}
            </div>
            <Link href="/cart" className="block px-2 py-2 text-gray-700 hover:bg-gray-100" aria-label="Cart">
              Cart
            </Link>
            <Link href="/auth" className="block px-2 py-2 text-gray-700 hover:bg-gray-100">
              Login/Signup
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
