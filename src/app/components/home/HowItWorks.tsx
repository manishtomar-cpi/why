// src/app/components/home/HowItWorks.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  FaUtensils,
  FaClipboardList,
  FaCreditCard,
  FaTruck,
} from 'react-icons/fa';
import { COLORS } from '../../constants/colors';
import Button from '../Button'; // Ensure the updated Button component is imported

interface Step {
  id: number;
  title: string;
  description: string;
  icon: JSX.Element;
}

const steps: Step[] = [
  {
    id: 1,
    title: 'Browse the Menu',
    description:
      'Explore our diverse range of healthy and delicious meals tailored to your preferences.',
    icon: <FaUtensils size={32} color={COLORS.primary} />, // Purple
  },
  {
    id: 2,
    title: 'Select Your Plan',
    description:
      'Choose from Regular, Premium, or Diet-specific meal plans that suit your needs.',
    icon: <FaClipboardList size={32} color={COLORS.primary} />, // Purple
  },
  {
    id: 3,
    title: 'Make a Payment',
    description:
      'Securely pay for your selected meal plan with our easy payment options.',
    icon: <FaCreditCard size={32} color={COLORS.primary} />, // Purple
  },
  {
    id: 4,
    title: 'Enjoy Fresh Delivery',
    description:
      'Receive your fresh and nutritious meals delivered right to your doorstep on time.',
    icon: <FaTruck size={32} color={COLORS.primary} />, // Purple
  },
];

const HowItWorks: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50 w-full" id="how-it-works">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <h2 className="text-4xl font-bold text-center text-primary mb-12">
          How It Works
        </h2>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <motion.div
              key={step.id}
              className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center transition-transform transform hover:scale-105"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: step.id * 0.2 }}
            >
              {/* Icon */}
              <div className="mb-4">{step.icon}</div>

              {/* Title */}
              <h3 className="text-2xl font-semibold text-primary mb-2">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 mb-6">{step.description}</p>

              {/* Optional: Learn More Button */}
              {/* Uncomment the following lines if you want a button on each card */}
              {/* <Button variant="primary">
                Learn More
              </Button> */}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
