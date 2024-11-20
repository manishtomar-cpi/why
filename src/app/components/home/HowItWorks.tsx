// src/app/components/home/HowItWorks.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  FaMapMarkerAlt,
  FaUtensils,
  FaCreditCard,
  FaArrowRight,
} from 'react-icons/fa';
import { GiMeal } from 'react-icons/gi'; // Updated icon for delivery
import { COLORS } from '../../constants/colors';
import Button from '../Button'; // Ensure the updated Button component is imported
import Link from 'next/link'; // Import Link for navigation

interface Step {
  id: number;
  title: string;
  description: string;
  icon: JSX.Element;
}

const steps: Step[] = [
  {
    id: 1,
    title: 'Choose Your Nearest Kitchen',
    description:
      'Select the kitchen closest to your location to ensure timely and fresh delivery of your meals.',
    icon: <FaMapMarkerAlt size={32} color={COLORS.primary} aria-label="Choose Your Nearest Kitchen" />, // Purple
  },
  {
    id: 2,
    title: 'Browse and Select Meals',
    description:
      'Explore our diverse menu and customize your meals to fit your dietary preferences and needs.',
    icon: <FaUtensils size={32} color={COLORS.primary} aria-label="Browse and Select Meals" />, // Purple
  },
  {
    id: 3,
    title: 'Make a Payment',
    description:
      'Securely pay for your selected meal plan using our easy and trusted payment options.',
    icon: <FaCreditCard size={32} color={COLORS.primary} aria-label="Make a Payment" />, // Purple
  },
  {
    id: 4,
    title: 'Enjoy Fresh Delivery',
    description:
      'Receive your nutritious and delicious meals delivered right to your doorstep on time using our eco-friendly tiffin boxes.',
    icon: <GiMeal size={32} color={COLORS.primary} aria-label="Enjoy Fresh Delivery" />, // Updated to meal icon
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

        {/* Steps Grid with Staggered Animations */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.2,
              },
            },
            hidden: {},
          }}
        >
          {steps.map((step) => (
            <motion.div
              key={step.id}
              className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center transition-transform transform hover:scale-105"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5 }}
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
        </motion.div>

        {/* Optional: Get Started Button */}
        <div className="mt-12 text-center">
          <Button variant="primary" asChild>
            <Link href="/signup" className="inline-flex items-center px-6 py-3">
              Get Started
              <FaArrowRight className="ml-2" /> {/* Ensure FaArrowRight is imported */}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
