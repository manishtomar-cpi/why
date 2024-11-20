// src/app/components/home/HeroSection.tsx
'use client';

import React from 'react';
import Button from '../Button';
import { motion } from 'framer-motion';
import { COLORS } from '../../constants/colors';
import { ROUTES } from '../../constants/routes';
import { FaArrowRight } from 'react-icons/fa';

const HeroSection: React.FC = () => {
  return (
    <section
      className="relative flex items-center justify-center h-screen w-full overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${COLORS.gradientStart}, ${COLORS.gradientEnd})`,
      }}
    >
      {/* Content Container */}
      <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center md:items-start md:text-left max-w-2xl mx-auto md:mx-0 w-full">
          {/* Main Slogan */}
          <motion.h1
            className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-4"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Empowering Students,
            <br />
            One Meal at a Time
          </motion.h1>

          {/* Description */}
          <motion.p
            className="text-lg md:text-xl text-gray-200 mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Affordable, healthy, and delicious meals delivered right to your campus.
          </motion.p>

          {/* Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <Button variant="primary" asChild>
              <a href={ROUTES.auth} className="flex items-center">
                Order Now
                <FaArrowRight className="ml-2" />
              </a>
            </Button>
            <Button variant="secondary" asChild>
              <a href={ROUTES.services} className="flex items-center">
                Explore Menu
                <FaArrowRight className="ml-2" />
              </a>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Optional Decorative Floating Elements */}
      {/* These elements add subtle depth without causing distraction */}
      {/* Ensure they do not cause horizontal overflow */}
      {/* Uncomment and adjust if you wish to include them */}
      
      <motion.div
        className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full opacity-20 blur-xl"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.2, scale: 1 }}
        transition={{ duration: 1, delay: 0.3, ease: 'easeInOut' }}
      ></motion.div>
      <motion.div
        className="absolute bottom-10 right-10 w-32 h-32 bg-white rounded-full opacity-20 blur-xl"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.2, scale: 1 }}
        transition={{ duration: 1, delay: 0.5, ease: 'easeInOut' }}
      ></motion.div>
     
    </section>
  );
};

export default HeroSection;
