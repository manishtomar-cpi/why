// src/app/components/home/ContactSupport.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import { COLORS } from '../../constants/colors';
import Button from '../Button';
// import Link from 'next/link';
// import { ROUTES } from '../../constants/routes';

const ContactSupport: React.FC = () => {
  return (
    <section className="py-16 bg-white" id="contact-support">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-primary mb-12">
          Get in Touch
        </h2>
        <div className="flex flex-col md:flex-row justify-between items-start md:space-x-12 space-y-8 md:space-y-0">
          {/* Contact Information */}
          <motion.div
            className="w-full md:w-1/2 flex flex-col space-y-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center">
              <FaMapMarkerAlt size={32} color={COLORS.accent} className="mr-4" />
              <div>
                <h4 className="text-xl font-semibold text-primary">Our Address</h4>
                <p className="text-gray-600">
                  123 Main Street, Mumbai, Maharashtra, India
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <FaPhoneAlt size={32} color={COLORS.accent} className="mr-4" />
              <div>
                <h4 className="text-xl font-semibold text-primary">Phone</h4>
                <p className="text-gray-600">+91 (22) 1234-5678</p>
              </div>
            </div>
            <div className="flex items-center">
              <FaEnvelope size={32} color={COLORS.accent} className="mr-4" />
              <div>
                <h4 className="text-xl font-semibold text-primary">Email</h4>
                <p className="text-gray-600">support@why.com</p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="w-full md:w-1/2 bg-gray-50 p-6 rounded-lg shadow-md"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-semibold mb-4">Contact Us</h3>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Your Name"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Your Email"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-700">
                  Message
                </label>
                <textarea
                  id="message"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Your Message"
                  rows={5}
                  required
                ></textarea>
              </div>
              <div className="text-center">
                <Button variant="primary" type="submit">
                  Send Message
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSupport;
