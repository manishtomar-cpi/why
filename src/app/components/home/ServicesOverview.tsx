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
import Image from 'next/image'; // Optional: Use if you plan to include images

const serviceIcons: Record<Service['id'], JSX.Element> = {
  regular: <FaLeaf size={48} color={COLORS.primary} />, // Purple icon for Regular
  premium: <FaStar size={48} color={COLORS.primary} />, // Purple icon for Premium
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
              className="bg-gray-50 p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer group overflow-hidden flex flex-col justify-between"
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {/* Icon and Title */}
              <div className="flex flex-col items-center md:items-start">
                <div className="mb-4">{serviceIcons[service.id]}</div>
                <h3 className="text-2xl font-semibold mb-2">{service.name} Plan</h3>
              </div>

              {/* Service Details */}
              <div className="mt-4 flex-grow">
                {service.id === 'regular' && (
                  <div className="text-gray-700">
                    <h4 className="text-xl font-bold mb-2">Regular Plan</h4>
                    <p className="mb-2">
                      Our Regular Plan offers a menu based on the days of the week, ensuring you receive healthy and balanced meals with salads.
                    </p>
                    <ul className="list-disc list-inside mb-4">
                      <li>Choose between random predefined meals or a weekly menu</li>
                      <li>No meal customization</li>
                      <li>Healthy meals with salads</li>
                      <li>Affordable price: <span className="font-bold">₹49</span></li>
                    </ul>
                  </div>
                )}
                {service.id === 'premium' && (
                  <div className="text-gray-700">
                    <h4 className="text-xl font-bold mb-2">Premium Plan</h4>
                    <p className="mb-2">
                      Our Premium Plan allows you to customize your meals, offering higher quality ingredients and flexibility to add or reduce items.
                    </p>
                    <ul className="list-disc list-inside mb-4">
                      <li>Ability to choose preferred meals</li>
                      <li>Flexible item additions or reductions</li>
                      <li>Higher quality meals compared to regular</li>
                      <li>Premium price: <span className="font-bold">₹69</span></li>
                    </ul>
                  </div>
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
