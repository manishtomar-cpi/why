// src/app/components/home/ServicesOverview.tsx
'use client';

import React from 'react';
import { SERVICES, Service } from '../../constants/services';
import { motion } from 'framer-motion';
import Button from '../Button';
import Link from 'next/link';
import { ROUTES } from '../../constants/routes';
import { FaLeaf, FaStar } from 'react-icons/fa';
import { COLORS } from '../../constants/colors';

const serviceIcons: Record<Service['id'], JSX.Element> = {
  regular: <FaLeaf size={48} color={COLORS.primary} />, // Icon for Regular Plan
  premium: <FaStar size={48} color={COLORS.primary} />, // Icon for Premium Plan
};

const ServicesOverview: React.FC = () => {
  return (
    <section className="py-16 bg-white w-full" id="services">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-primary mb-12">
          Our Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICES.map((service) => (
            <motion.div
              key={service.id}
              className="bg-gray-50 p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col justify-between"
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {/* Icon and Title */}
              <div className="flex flex-col items-center md:items-start">
                <div className="mb-4">{serviceIcons[service.id]}</div>
                <h3 className="text-2xl font-semibold mb-1">{service.name} Plan</h3>
                <p className="text-lg font-bold text-primary">
                  {service.id === 'regular' ? '₹45/meal' : '₹59/meal'}
                </p>
              </div>

              {/* Brief Description */}
              <div className="mt-4 text-gray-700">
                {service.id === 'regular' ? (
                  <ul className="list-disc list-inside space-y-2">
                    <li>Choose pre-defined daily menus or customize from healthy options</li>
                    <li>Adjust up to 6 chapatis per meal</li>
                    <li>Includes roti, varied sabzi, and fresh salad</li>
                  </ul>
                ) : (
                  <ul className="list-disc list-inside space-y-2">
                    <li>Weekly meal customization with exclusive dishes</li>
                    <li>Includes salads with seasonal fruits</li>
                    <li>Higher quality ingredients for a gourmet experience</li>
                  </ul>
                )}
              </div>

              {/* Learn More Button */}
              <div className="mt-6">
                <Button variant="primary" asChild>
                  <Link href={`${ROUTES.services}/${service.id}`} className="inline-flex items-center">
                    Learn More
                    {service.id === 'regular' ? (
                      <FaLeaf className="ml-2" />
                    ) : (
                      <FaStar className="ml-2" />
                    )}
                  </Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;
