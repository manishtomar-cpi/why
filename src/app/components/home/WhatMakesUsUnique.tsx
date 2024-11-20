// src/app/components/home/WhatMakesUsUnique.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  FaLeaf,
  FaClock,
  FaHandsHelping,
  FaGraduationCap,
  FaArrowRight,
} from 'react-icons/fa';
import Link from 'next/link'; // Ensure this is the correct import

interface UniqueFeature {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  link?: string;
}

const uniqueFeatures: UniqueFeature[] = [
  {
    id: 1,
    title: 'Local Farmer Partnerships',
    description:
      'We collaborate with local farmers near our kitchen to source the freshest organic fruits and vegetables, ensuring top-notch quality in every meal.',
    icon: <FaLeaf size={40} color="#34D399" aria-label="Local Farmer Partnerships" />,
    link: '/about/our-farmers',
  },
  {
    id: 2,
    title: 'Open Kitchen Visits',
    description:
      'Experience transparency and trust by visiting our kitchen anytime. See firsthand how we maintain high standards in meal preparation.',
    icon: <FaClock size={40} color="#3B82F6" aria-label="Open Kitchen Visits" />,
    link: '/about/visit-kitchen',
  },
  {
    id: 3,
    title: 'Community Support',
    description:
      'In partnership with local trusts, we provide leftover meals to the elderly and homeless at no cost, fostering a supportive community.',
    icon: <FaHandsHelping size={40} color="#F59E0B" aria-label="Community Support" />,
    link: '/about/community-support',
  },
  {
    id: 4,
    title: 'Student Assistance Programs',
    description:
      'Students can return unused tiffins and earn points towards future purchases, ensuring that no meal goes to waste while supporting educational pursuits.',
    icon: <FaGraduationCap size={40} color="#EF4444" aria-label="Student Assistance Programs" />,
    link: '/about/student-assistance',
  },
  // Add more features as needed
];

const WhatMakesUsUnique: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50 w-full" id="unique-features">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <h2 className="text-4xl font-bold text-center text-primary mb-12">
          What Makes Us Unique
        </h2>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {uniqueFeatures.map((feature) => (
            <motion.div
              key={feature.id}
              className="flex items-start"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              {/* Icon */}
              <div className="flex-shrink-0">
                <div className="p-6 bg-white rounded-full shadow-md">
                  {feature.icon}
                </div>
              </div>

              {/* Feature Details */}
              <div className="ml-6">
                <h3 className="text-2xl font-semibold text-primary mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                {feature.link && (
                  <Link
                    href={feature.link}
                    className="inline-flex items-center text-primary hover:text-secondary font-medium"
                  >
                    Learn More
                    <FaArrowRight className="ml-2" aria-hidden="true" />
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

export default WhatMakesUsUnique;
