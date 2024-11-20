// src/app/components/home/FeaturesAndBenefits.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  FaLeaf,
  FaClock,
  FaMoneyBillWave,
  FaUserAlt,
} from 'react-icons/fa';
import { COLORS } from '../../constants/colors';

interface Feature {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode; // React Icon component
}

const features: Feature[] = [
  {
    id: 1,
    title: 'Fresh Ingredients',
    description:
      'We use only the freshest ingredients to prepare your meals, ensuring quality and taste.',
    icon: <FaLeaf size={32} color="#4ADE80" />, // Green
  },
  {
    id: 2,
    title: 'Timely Delivery',
    description:
      'Our reliable delivery service ensures your meals arrive on time, every time.',
    icon: <FaClock size={32} color="#3B82F6" />, // Blue
  },
  {
    id: 3,
    title: 'Affordable Pricing',
    description:
      'High-quality meals at pocket-friendly prices, making healthy eating accessible.',
    icon: <FaMoneyBillWave size={32} color="#FBBF24" />, // Amber
  },
  {
    id: 4,
    title: 'Customized Diet Plans',
    description:
      'Tailored meal plans to meet your specific dietary requirements and preferences.',
    icon: <FaUserAlt size={32} color="#EF4444" />, // Red
  },
  // Add more features as needed
];

const FeaturesAndBenefits: React.FC = () => {
  return (
    <section className="py-16 bg-white w-full" id="features">
      <div className="container">
        <h2 className="text-4xl font-bold text-center text-primary mb-12">
          Why Choose Us?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              className="flex items-start"
              initial={{ opacity: 0, x: feature.id % 2 === 0 ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="mr-6">{feature.icon}</div>
              <div>
                <h3 className="text-2xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesAndBenefits;
