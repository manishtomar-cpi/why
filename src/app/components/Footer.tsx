// src/app/components/Footer.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin } from 'react-icons/fi';
import { ROUTES } from '../constants/routes';

const Footer: React.FC = () => {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const quickLinks = [
    { name: 'Home', href: ROUTES.home },
    { name: 'About Us', href: ROUTES.about },
    { name: 'Services', href: ROUTES.services },
    { name: 'Menu', href: ROUTES.menu },
    { name: 'Contact Us', href: ROUTES.contact },
  ];

  const supportLinks = [
    { name: 'FAQs', href: ROUTES.faqs },
    { name: 'Enquiry', href: ROUTES.enquiry },
    { name: 'Complaint', href: ROUTES.complaint },
  ];

  const careerLinks = [
    { name: 'Join Our Team', href: ROUTES.careers },
    { name: 'Become a Delivery Partner', href: ROUTES.careersDelivery },
    { name: 'Student Opportunities', href: ROUTES.careersStudents },
  ];

  const partnerLinks = [
    // { name: 'Partner with Us', href: ROUTES.partners },
    { name: 'Farmer Registration', href: ROUTES.partnersFarmers },
    // { name: 'Delivery Partner Registration', href: ROUTES.partnersDelivery },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-5 gap-8">
          
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
              Join our team and embark on a rewarding journey. Explore our current openings and discover the benefits of working with us!
            </p>
          </div>

          {/* Partner with Us */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Partner with Us</h3>
            <ul className="space-y-2">
              {partnerLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-gray-400">
              Collaborate with us to grow your farming business. we're here to support you.
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
                aria-label="Email Address"
              />
              <button
                type="submit"
                className="bg-primary hover:bg-primary-dark p-3 rounded text-white font-semibold transition-colors"
                aria-label="Subscribe to Newsletter"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mt-8"></div>

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
                  aria-hidden="true"
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
                  aria-hidden="true"
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
                  aria-hidden="true"
                >
                  <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.44l3.71-4.21a.75.75 0 011.08 1.04l-4.25 4.82a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" />
                </svg>
              </button>
              {openSection === 'careers' && (
                <>
                  <ul id="careersContent" className="pl-4 mt-2 space-y-2">
                    {careerLinks.map((link) => (
                      <li key={link.name}>
                        <Link href={link.href} className="hover:text-primary transition-colors">
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <p className="pl-4 mt-2 text-gray-400">
                    Join our team and embark on a rewarding journey. Explore our current openings and discover the benefits of working with us!
                  </p>
                </>
              )}
            </div>

            {/* Partner with Us Accordion */}
            <div>
              <button
                onClick={() => toggleSection('partner')}
                className="w-full flex justify-between items-center p-3 bg-gray-800 rounded focus:outline-none"
                aria-expanded={openSection === 'partner'}
                aria-controls="partnerContent"
              >
                <span className="text-lg font-semibold">Partner with Us</span>
                <svg
                  className={`w-6 h-6 transform transition-transform ${
                    openSection === 'partner' ? 'rotate-180' : 'rotate-0'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.44l3.71-4.21a.75.75 0 011.08 1.04l-4.25 4.82a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" />
                </svg>
              </button>
              {openSection === 'partner' && (
                <>
                  <ul id="partnerContent" className="pl-4 mt-2 space-y-2">
                    {partnerLinks.map((link) => (
                      <li key={link.name}>
                        <Link href={link.href} className="hover:text-primary transition-colors">
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <p className="pl-4 mt-2 text-gray-400">
                    Collaborate with us to grow your business. Whether you're a farmer or interested in delivery partnerships, we're here to support you.
                  </p>
                </>
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
                  aria-hidden="true"
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
                    aria-label="Email Address"
                  />
                  <button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary-dark p-2 rounded text-white font-semibold transition-colors"
                    aria-label="Subscribe to Newsletter"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mt-8"></div>

        {/* Bottom Section */}
        <div className="mt-8 flex flex-col md:flex-row justify-between items-center">
          
          {/* Contact Information */}
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <p className="text-gray-400">
              123 Main Street, India
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
