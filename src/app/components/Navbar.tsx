'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { FiShoppingCart, FiMenu, FiX } from 'react-icons/fi';
import { ROUTES } from '../constants/routes';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [planOpen, setPlanOpen] = useState(false);
  const [citiesOpen, setCitiesOpen] = useState(false);

  const pathname = usePathname();

  const navbarRef = useRef<HTMLDivElement>(null);

  const closeAllDropdowns = () => {
    setServicesOpen(false);
    setMenuOpen(false);
    setPlanOpen(false);
    setCitiesOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target as Node)) {
        closeAllDropdowns();
        setNavbarOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4" ref={navbarRef}>
        <div className="flex items-center justify-between h-20">
          {/* Logo and Tagline */}
          <div className="flex items-center">
            <Link href={ROUTES.home} className="flex flex-col items-start">
              <span className="text-2xl font-bold text-primary">WHY</span>
              <span className="text-sm text-gray-500">We are here for you</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link
              href={ROUTES.home}
              className={`text-gray-700 hover:text-primary transition-colors duration-200 ${
                isActive(ROUTES.home) ? 'text-primary' : ''
              }`}
            >
              Home
            </Link>
            <Link
              href={ROUTES.about}
              className={`text-gray-700 hover:text-primary transition-colors duration-200 ${
                isActive(ROUTES.about) ? 'text-primary' : ''
              }`}
            >
              About Us
            </Link>

            {/* Services Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                onClick={() => setServicesOpen(!servicesOpen)}
                className="flex items-center text-gray-700 hover:text-primary transition-colors duration-200 focus:outline-none"
                aria-haspopup="true"
                aria-expanded={servicesOpen}
              >
                Services
                <svg
                  className={`w-4 h-4 ml-1 transition-transform duration-200 ${
                    servicesOpen ? 'transform rotate-180' : ''
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.44l3.71-4.21a.75.75 0 011.08 1.04l-4.25 4.82a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" />
                </svg>
              </button>
              {/* Dropdown Menu */}
              {servicesOpen && (
                <div
                  className="absolute mt-2 py-2 w-48 bg-white rounded-md shadow-xl transition ease-out duration-200 transform opacity-100 scale-100"
                  role="menu"
                  aria-label="Services"
                >
                  <Link
                    href={ROUTES.servicesRegular}
                    className={`block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200 ${
                      isActive(ROUTES.servicesRegular) ? 'bg-gray-100' : ''
                    }`}
                  >
                    Regular Service
                  </Link>
                  <Link
                    href={ROUTES.servicesPremium}
                    className={`block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200 ${
                      isActive(ROUTES.servicesPremium) ? 'bg-gray-100' : ''
                    }`}
                  >
                    Premium Service
                  </Link>
                </div>
              )}
            </div>

            {/* Menu Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setMenuOpen(true)}
              onMouseLeave={() => setMenuOpen(false)}
            >
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center text-gray-700 hover:text-primary transition-colors duration-200 focus:outline-none"
                aria-haspopup="true"
                aria-expanded={menuOpen}
              >
                Menu
                <svg
                  className={`w-4 h-4 ml-1 transition-transform duration-200 ${
                    menuOpen ? 'transform rotate-180' : ''
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.44l3.71-4.21a.75.75 0 011.08 1.04l-4.25 4.82a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" />
                </svg>
              </button>
              {/* Dropdown Menu */}
              {menuOpen && (
                <div
                  className="absolute mt-2 py-2 w-48 bg-white rounded-md shadow-xl transition ease-out duration-200 transform opacity-100 scale-100"
                  role="menu"
                  aria-label="Menu"
                >
                  <Link
                    href={ROUTES.menuRegular}
                    className={`block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200 ${
                      isActive(ROUTES.menuRegular) ? 'bg-gray-100' : ''
                    }`}
                  >
                    Regular Menu
                  </Link>
                  <Link
                    href={ROUTES.menuPremium}
                    className={`block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200 ${
                      isActive(ROUTES.menuPremium) ? 'bg-gray-100' : ''
                    }`}
                  >
                    Premium Menu
                  </Link>
                </div>
              )}
            </div>

            {/* Plan Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setPlanOpen(true)}
              onMouseLeave={() => setPlanOpen(false)}
            >
              <button
                onClick={() => setPlanOpen(!planOpen)}
                className="flex items-center text-gray-700 hover:text-primary transition-colors duration-200 focus:outline-none"
                aria-haspopup="true"
                aria-expanded={planOpen}
              >
                Plan
                <svg
                  className={`w-4 h-4 ml-1 transition-transform duration-200 ${
                    planOpen ? 'transform rotate-180' : ''
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.44l3.71-4.21a.75.75 0 011.08 1.04l-4.25 4.82a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" />
                </svg>
              </button>
              {/* Dropdown Menu */}
              {planOpen && (
                <div
                  className="absolute mt-2 py-2 w-48 bg-white rounded-md shadow-xl transition ease-out duration-200 transform opacity-100 scale-100"
                  role="menu"
                  aria-label="Plan"
                >
                  <Link
                    href={ROUTES.planRegular}
                    className={`block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200 ${
                      isActive(ROUTES.planRegular) ? 'bg-gray-100' : ''
                    }`}
                  >
                    Regular Plan
                  </Link>
                  <Link
                    href={ROUTES.planPremium}
                    className={`block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200 ${
                      isActive(ROUTES.planPremium) ? 'bg-gray-100' : ''
                    }`}
                  >
                    Premium Plan
                  </Link>
                </div>
              )}
            </div>

            {/* Cities Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setCitiesOpen(true)}
              onMouseLeave={() => setCitiesOpen(false)}
            >
              <button
                onClick={() => setCitiesOpen(!citiesOpen)}
                className="flex items-center text-gray-700 hover:text-primary transition-colors duration-200 focus:outline-none"
                aria-haspopup="true"
                aria-expanded={citiesOpen}
              >
                Cities
                <svg
                  className={`w-4 h-4 ml-1 transition-transform duration-200 ${
                    citiesOpen ? 'transform rotate-180' : ''
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.44l3.71-4.21a.75.75 0 011.08 1.04l-4.25 4.82a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" />
                </svg>
              </button>
              {/* Dropdown Menu */}
              {citiesOpen && (
                <div
                  className="absolute mt-2 py-2 w-48 bg-white rounded-md shadow-xl transition ease-out duration-200 transform opacity-100 scale-100"
                  role="menu"
                  aria-label="Cities"
                >
                  <Link
                    href={ROUTES.citiesKitchen}
                    className={`block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200 ${
                      isActive(ROUTES.citiesKitchen) ? 'bg-gray-100' : ''
                    }`}
                  >
                    Kitchen
                  </Link>
                  {/* Add more sub-links as needed */}
                </div>
              )}
            </div>

            {/* Blog Link */}
            <Link
              href={ROUTES.blog}
              className={`text-gray-700 hover:text-primary transition-colors duration-200 ${
                isActive(ROUTES.blog) ? 'text-primary' : ''
              }`}
            >
              Blog
            </Link>

            {/* Image Gallery Link */}
            <Link
              href={ROUTES.imageGallery}
              className={`text-gray-700 hover:text-primary transition-colors duration-200 ${
                isActive(ROUTES.imageGallery) ? 'text-primary' : ''
              }`}
            >
              Image Gallery
            </Link>

            {/* Dashboard Link */}
            <Link
              href={ROUTES.dashboard}
              className={`text-gray-700 hover:text-primary transition-colors duration-200 ${
                isActive(ROUTES.dashboard) ? 'text-primary' : ''
              }`}
            >
              Dashboard
            </Link>

            {/* Cart Icon */}
            <Link
              href={ROUTES.cart}
              className="text-gray-700 hover:text-primary transition-colors duration-200 relative"
              aria-label="Cart"
            >
              <FiShoppingCart size={24} />
              {/* Optional: Cart Item Count Badge */}
              {/* <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">3</span> */}
            </Link>

            {/* Login/Signup Link */}
            <Link
              href={ROUTES.signup}
              className={`text-gray-700 hover:text-primary transition-colors duration-200 ${
                isActive(ROUTES.signup) ? 'text-primary' : ''
              }`}
            >
              Login/Signup
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setNavbarOpen(!navbarOpen)}
              className="text-gray-700 hover:text-primary transition-colors duration-200 focus:outline-none"
              aria-label="Toggle navigation menu"
              aria-expanded={navbarOpen}
            >
              {navbarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {navbarOpen && (
          <div className="md:hidden space-y-1 pb-4">
            <Link
              href={ROUTES.home}
              className={`block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200 ${
                isActive(ROUTES.home) ? 'bg-gray-100' : ''
              }`}
            >
              Home
            </Link>
            <Link
              href={ROUTES.about}
              className={`block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200 ${
                isActive(ROUTES.about) ? 'bg-gray-100' : ''
              }`}
            >
              About Us
            </Link>

            {/* Services Mobile Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setServicesOpen(!servicesOpen);
                  setMenuOpen(false);
                  setPlanOpen(false);
                  setCitiesOpen(false);
                }}
                className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200 focus:outline-none"
                aria-haspopup="true"
                aria-expanded={servicesOpen}
              >
                Services
                <svg
                  className={`w-4 h-4 ml-auto transition-transform duration-200 ${
                    servicesOpen ? 'transform rotate-180' : ''
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.44l3.71-4.21a.75.75 0 011.08 1.04l-4.25 4.82a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" />
                </svg>
              </button>
              {servicesOpen && (
                <div className="mt-1 pl-6">
                  <Link
                    href={ROUTES.servicesRegular}
                    className={`block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200 ${
                      isActive(ROUTES.servicesRegular) ? 'bg-gray-100' : ''
                    }`}
                  >
                    Regular Service
                  </Link>
                  <Link
                    href={ROUTES.servicesPremium}
                    className={`block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200 ${
                      isActive(ROUTES.servicesPremium) ? 'bg-gray-100' : ''
                    }`}
                  >
                    Premium Service
                  </Link>
                </div>
              )}
            </div>

            {/* Menu Mobile Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setMenuOpen(!menuOpen);
                  setServicesOpen(false);
                  setPlanOpen(false);
                  setCitiesOpen(false);
                }}
                className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200 focus:outline-none"
                aria-haspopup="true"
                aria-expanded={menuOpen}
              >
                Menu
                <svg
                  className={`w-4 h-4 ml-auto transition-transform duration-200 ${
                    menuOpen ? 'transform rotate-180' : ''
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.44l3.71-4.21a.75.75 0 011.08 1.04l-4.25 4.82a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" />
                </svg>
              </button>
              {menuOpen && (
                <div className="mt-1 pl-6">
                  <Link
                    href={ROUTES.menuRegular}
                    className={`block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200 ${
                      isActive(ROUTES.menuRegular) ? 'bg-gray-100' : ''
                    }`}
                  >
                    Regular Menu
                  </Link>
                  <Link
                    href={ROUTES.menuPremium}
                    className={`block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200 ${
                      isActive(ROUTES.menuPremium) ? 'bg-gray-100' : ''
                    }`}
                  >
                    Premium Menu
                  </Link>
                </div>
              )}
            </div>

            {/* Plan Mobile Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setPlanOpen(!planOpen);
                  setServicesOpen(false);
                  setMenuOpen(false);
                  setCitiesOpen(false);
                }}
                className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200 focus:outline-none"
                aria-haspopup="true"
                aria-expanded={planOpen}
              >
                Plan
                <svg
                  className={`w-4 h-4 ml-auto transition-transform duration-200 ${
                    planOpen ? 'transform rotate-180' : ''
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.44l3.71-4.21a.75.75 0 011.08 1.04l-4.25 4.82a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" />
                </svg>
              </button>
              {planOpen && (
                <div className="mt-1 pl-6">
                  <Link
                    href={ROUTES.planRegular}
                    className={`block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200 ${
                      isActive(ROUTES.planRegular) ? 'bg-gray-100' : ''
                    }`}
                  >
                    Regular Plan
                  </Link>
                  <Link
                    href={ROUTES.planPremium}
                    className={`block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200 ${
                      isActive(ROUTES.planPremium) ? 'bg-gray-100' : ''
                    }`}
                  >
                    Premium Plan
                  </Link>
                </div>
              )}
            </div>

            {/* Cities Mobile Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setCitiesOpen(!citiesOpen);
                  setServicesOpen(false);
                  setMenuOpen(false);
                  setPlanOpen(false);
                }}
                className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200 focus:outline-none"
                aria-haspopup="true"
                aria-expanded={citiesOpen}
              >
                Cities
                <svg
                  className={`w-4 h-4 ml-auto transition-transform duration-200 ${
                    citiesOpen ? 'transform rotate-180' : ''
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.44l3.71-4.21a.75.75 0 011.08 1.04l-4.25 4.82a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" />
                </svg>
              </button>
              {citiesOpen && (
                <div className="mt-1 pl-6">
                  <Link
                    href={ROUTES.citiesKitchen}
                    className={`block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200 ${
                      isActive(ROUTES.citiesKitchen) ? 'bg-gray-100' : ''
                    }`}
                  >
                    Kitchen
                  </Link>
                  {/* Add more sub-links as needed */}
                </div>
              )}
            </div>

            {/* Blog Link */}
            <Link
              href={ROUTES.blog}
              className={`block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200 ${
                isActive(ROUTES.blog) ? 'bg-gray-100' : ''
              }`}
            >
              Blog
            </Link>

            {/* Image Gallery Link */}
            <Link
              href={ROUTES.imageGallery}
              className={`block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200 ${
                isActive(ROUTES.imageGallery) ? 'bg-gray-100' : ''
              }`}
            >
              Image Gallery
            </Link>

            {/* Dashboard Link */}
            <Link
              href={ROUTES.dashboard}
              className={`block px-4 py-2 text-gray-700 hover:text-primary transition-colors duration-200 ${
                isActive(ROUTES.dashboard) ? 'text-primary' : ''
              }`}
            >
              Dashboard
            </Link>

            {/* Cart Link */}
            <Link
              href={ROUTES.cart}
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200 relative"
              aria-label="Cart"
            >
              Cart
              {/* Optional: Cart Item Count Badge */}
              {/* <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">3</span> */}
            </Link>

            {/* Login/Signup Link */}
            <Link
              href={ROUTES.signup}
              className={`block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200 ${
                isActive(ROUTES.signup) ? 'bg-gray-100' : ''
              }`}
            >
              Login/Signup
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
