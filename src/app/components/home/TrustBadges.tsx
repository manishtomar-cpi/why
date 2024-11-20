// src/app/components/home/TrustBadges.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  FaShieldAlt,
  FaLock,
  FaLeaf,
} from 'react-icons/fa';
import { COLORS } from '../../constants/colors';

interface Badge {
  id: number;
  title: string;
  icon: React.ReactNode; // React Icon component
}

const badges: Badge[] = [
  {
    id: 1,
    title: 'Health Certified',
    icon: <FaShieldAlt size={48} color="#3B82F6" />, // Blue
  },
  {
    id: 2,
    title: 'Secure Payments',
    icon: <FaLock size={48} color="#EF4444" />, // Red
  },
  {
    id: 3,
    title: 'Partnered with Local Farmers',
    icon: <FaLeaf size={48} color="#4ADE80" />, // Green
  },
  // Add more badges as needed
];

const TrustBadges: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50 w-full" id="trust">
      <div className="container">
        <h2 className="text-4xl font-bold text-center text-primary mb-12">
          Our Trust Badges
        </h2>
        <div className="flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-12">
          {badges.map((badge) => (
            <motion.div
              key={badge.id}
              className="flex flex-col items-center"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-4">{badge.icon}</div>
              <p className="text-gray-700">{badge.title}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
