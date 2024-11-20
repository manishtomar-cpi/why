// src/app/components/Footer.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin } from 'react-icons/fi';

const Footer: React.FC = () => {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Menu', href: '/menu' },
    { name: 'Contact Us', href: '/contact' },
  ];

  const supportLinks = [
    { name: 'FAQs', href: '/faqs' },
    { name: 'Enquiry', href: '/enquiry' },
    { name: 'Complaint', href: '/complaint' },
  ];

  const careerLinks = [
    { name: 'Join Our Team', href: '/careers' },
    { name: 'Internships', href: '/careers#internships' },
    { name: 'Employee Benefits', href: '/careers#benefits' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Careers */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Careers</h3>
            <ul className="space-y-2">
              {careerLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-gray-400">
              We're always looking for passionate individuals to join our team. Check out our current openings and benefits!
            </p>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Subscribe to our Newsletter</h3>
            <p className="mb-4 text-gray-400">Stay updated with our latest offers and updates.</p>
            <form className="flex flex-col space-y-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className="p-3 rounded bg-gray-800 text-white focus:outline-none"
                required
              />
              <button
                type="submit"
                className="bg-primary hover:bg-primary-dark p-3 rounded text-white font-semibold transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mt-8"></div>

        {/* Bottom Section */}
        <div className="mt-8 flex flex-col md:flex-row justify-between items-center">
          
          {/* Contact Information */}
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <p className="text-gray-400">
              123 Main Street, Mumbai, Maharashtra, India
            </p>
            <p className="text-gray-400">
              Phone: +91 (22) 1234-5678
            </p>
            <p className="text-gray-400">
              Email: support@why.com
            </p>
          </div>

          {/* Social Media Icons */}
          <div className="flex space-x-4">
            <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FiFacebook className="hover:text-primary transition-colors" size={24} />
            </Link>
            <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <FiTwitter className="hover:text-primary transition-colors" size={24} />
            </Link>
            <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FiInstagram className="hover:text-primary transition-colors" size={24} />
            </Link>
            <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FiLinkedin className="hover:text-primary transition-colors" size={24} />
            </Link>
          </div>
        </div>
      </div>

      {/* Responsive Accordion for Mobile */}
      <div className="md:hidden px-4 pb-6">
        {/* Accordion Sections */}
        <div className="space-y-4">
          {/* Quick Links Accordion */}
          <div>
            <button
              onClick={() => toggleSection('quickLinks')}
              className="w-full flex justify-between items-center p-3 bg-gray-800 rounded focus:outline-none"
              aria-expanded={openSection === 'quickLinks'}
              aria-controls="quickLinksContent"
            >
              <span className="text-lg font-semibold">Quick Links</span>
              <svg
                className={`w-6 h-6 transform transition-transform ${
                  openSection === 'quickLinks' ? 'rotate-180' : 'rotate-0'
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.44l3.71-4.21a.75.75 0 011.08 1.04l-4.25 4.82a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" />
              </svg>
            </button>
            {openSection === 'quickLinks' && (
              <ul id="quickLinksContent" className="pl-4 mt-2 space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="hover:text-primary transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Support Accordion */}
          <div>
            <button
              onClick={() => toggleSection('support')}
              className="w-full flex justify-between items-center p-3 bg-gray-800 rounded focus:outline-none"
              aria-expanded={openSection === 'support'}
              aria-controls="supportContent"
            >
              <span className="text-lg font-semibold">Support</span>
              <svg
                className={`w-6 h-6 transform transition-transform ${
                  openSection === 'support' ? 'rotate-180' : 'rotate-0'
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.44l3.71-4.21a.75.75 0 011.08 1.04l-4.25 4.82a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" />
              </svg>
            </button>
            {openSection === 'support' && (
              <ul id="supportContent" className="pl-4 mt-2 space-y-2">
                {supportLinks.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="hover:text-primary transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Careers Accordion */}
          <div>
            <button
              onClick={() => toggleSection('careers')}
              className="w-full flex justify-between items-center p-3 bg-gray-800 rounded focus:outline-none"
              aria-expanded={openSection === 'careers'}
              aria-controls="careersContent"
            >
              <span className="text-lg font-semibold">Careers</span>
              <svg
                className={`w-6 h-6 transform transition-transform ${
                  openSection === 'careers' ? 'rotate-180' : 'rotate-0'
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.44l3.71-4.21a.75.75 0 011.08 1.04l-4.25 4.82a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" />
              </svg>
            </button>
            {openSection === 'careers' && (
              <ul id="careersContent" className="pl-4 mt-2 space-y-2">
                {careerLinks.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="hover:text-primary transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            {openSection === 'careers' && (
              <p className="pl-4 mt-2 text-gray-400">
                Join our team and be a part of a dynamic and growing company. Explore our current openings and discover the benefits of working with us!
              </p>
            )}
          </div>

          {/* Newsletter Accordion */}
          <div>
            <button
              onClick={() => toggleSection('newsletter')}
              className="w-full flex justify-between items-center p-3 bg-gray-800 rounded focus:outline-none"
              aria-expanded={openSection === 'newsletter'}
              aria-controls="newsletterContent"
            >
              <span className="text-lg font-semibold">Newsletter</span>
              <svg
                className={`w-6 h-6 transform transition-transform ${
                  openSection === 'newsletter' ? 'rotate-180' : 'rotate-0'
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.44l3.71-4.21a.75.75 0 011.08 1.04l-4.25 4.82a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" />
              </svg>
            </button>
            {openSection === 'newsletter' && (
              <form id="newsletterContent" className="pl-4 mt-2 space-y-3" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full p-2 rounded bg-gray-800 text-white focus:outline-none"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary-dark p-2 rounded text-white font-semibold transition-colors"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Legal Links */}
      <div className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-center items-center">
          <p className="text-gray-400 text-sm text-center">
            &copy; 2024 WHY. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
