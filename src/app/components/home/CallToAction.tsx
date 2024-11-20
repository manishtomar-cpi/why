// src/app/components/home/CallToAction.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Button from '../Button';
import { ROUTES } from '../../constants/routes';
import { FaArrowRight } from 'react-icons/fa';
import { COLORS } from '../../constants/colors';

const CallToAction: React.FC = () => {
  return (
    <section className="py-16 bg-primary w-full" id="call-to-action">
      <div className="container text-center">
        <motion.h2
          className="text-3xl md:text-5xl font-bold text-white mb-6"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Ready to Transform Your Meals?
        </motion.h2>
        <motion.p
          className="text-lg md:text-xl text-gray-200 mb-8"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Join us today and enjoy fresh, nutritious, and affordable meals tailored just for you.
        </motion.p>
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <Button variant="primary" asChild>
            <a href={ROUTES.auth} className="flex items-center">
              Get Started
              <FaArrowRight className="ml-2" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;
