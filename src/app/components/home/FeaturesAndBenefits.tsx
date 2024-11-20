// src/app/components/home/FeaturesAndBenefits.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  FaLeaf,
  FaClock,
  FaMoneyBillWave,
  FaUserAlt,
  FaRecycle,
  FaStethoscope,
  FaRegHandshake,
  FaHeadset,
  FaArrowRight,
} from 'react-icons/fa';
// import { COLORS } from '../../constants/colors';
import Link from 'next/link'; // Import Link for navigation

interface Feature {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode; // React Icon component
  link?: string; // Optional: Link for "Learn More"
}

const features: Feature[] = [
  {
    id: 1,
    title: 'Fresh Ingredients',
    description:
      'We use only the freshest ingredients to prepare your meals, ensuring quality and taste.',
    icon: <FaLeaf size={40} color="#34D399" aria-label="Fresh Ingredients" />, // Green
    link: '/features/fresh-ingredients',
  },
  {
    id: 2,
    title: 'Timely Delivery',
    description:
      'Our reliable delivery service ensures your meals arrive on time, every time.',
    icon: <FaClock size={40} color="#3B82F6" aria-label="Timely Delivery" />, // Blue
    link: '/features/timely-delivery',
  },
  {
    id: 3,
    title: 'Affordable Pricing',
    description:
      'High-quality meals at pocket-friendly prices, making healthy eating accessible.',
    icon: <FaMoneyBillWave size={40} color="#FBBF24" aria-label="Affordable Pricing" />, // Amber
    link: '/features/affordable-pricing',
  },
  {
    id: 4,
    title: 'Customized Diet Plans',
    description:
      'Tailored meal plans to meet your specific dietary requirements and preferences.',
    icon: <FaUserAlt size={40} color="#EF4444" aria-label="Customized Diet Plans" />, // Red
    link: '/features/custom-diet-plans',
  },
  {
    id: 5,
    title: 'Sustainability',
    description:
      'Committed to eco-friendly practices, reducing our carbon footprint with every meal.',
    icon: <FaRecycle size={40} color="#10B981" aria-label="Sustainability" />, // Green
    link: '/features/sustainability',
  },
  {
    id: 6,
    title: 'Nutritional Expertise',
    description:
      'Our team of professional nutritionists ensures your meals are balanced and healthy.',
    icon: <FaStethoscope size={40} color="#3B82F6" aria-label="Nutritional Expertise" />, // Blue
    link: '/features/nutritional-expertise',
  },
  {
    id: 7,
    title: 'Flexible Subscription Plans',
    description:
      'Choose from a variety of subscription options that best fit your lifestyle and needs.',
    icon: <FaRegHandshake size={40} color="#F59E0B" aria-label="Flexible Subscription Plans" />, // Amber
    link: '/features/subscription-plans',
  },
  {
    id: 8,
    title: '24/7 Customer Support',
    description:
      'Our dedicated support team is available around the clock to assist you with any queries.',
    icon: <FaHeadset size={40} color="#EF4444" aria-label="24/7 Customer Support" />, // Red
    link: '/features/customer-support',
  },
  // Add more features as needed
];

const FeaturesAndBenefits: React.FC = () => {
  return (
    <section className="py-16 bg-white w-full" id="features">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <h2 className="text-4xl font-bold text-center text-primary mb-12">
          Why Choose Us?
        </h2>

        {/* Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              className={`flex flex-col ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } items-center`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              {/* Feature Icon */}
              <div className="flex-shrink-0">
                <div className="p-6 bg-gray-100 rounded-full flex items-center justify-center">
                  {feature.icon}
                </div>
              </div>

              {/* Feature Details */}
              <div className="mt-6 lg:mt-0 lg:ml-8 lg:mr-8 text-center lg:text-left">
                <h3 className="text-2xl font-semibold text-primary mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                {feature.link && (
                  <Link href={feature.link} className="inline-flex items-center text-primary hover:text-secondary font-medium">
                    Learn More
                    <FaArrowRight className="ml-2" />
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesAndBenefits;
