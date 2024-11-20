// src/app/components/home/MenuSection.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Button from '../Button';
import Link from 'next/link';
import { ROUTES } from '../../constants/routes';
import Image from 'next/image';
import { COLORS } from '../../constants/colors';

interface Meal {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string; // Path to meal image
}

interface Service {
  id: string;
  name: string;
  price: number;
  meals: Meal[];
}

const services: Service[] = [
  {
    id: 'regular',
    name: 'Regular',
    price: 49,
    meals: [
      {
        id: 1,
        name: 'Dal Chawal',
        description: 'Classic lentil curry served with steamed rice.',
        price: 49,
        image: '/images/meals/dal-chawal.jpg',
      },
      {
        id: 2,
        name: 'Roti and Salad',
        description: 'Whole wheat rotis paired with fresh garden salad.',
        price: 49,
        image: '/images/meals/roti-salad.jpg',
      },
      {
        id: 3,
        name: 'Mixed Vegetable Curry',
        description: 'A blend of seasonal vegetables cooked to perfection.',
        price: 49,
        image: '/images/meals/mixed-veg-curry.jpg',
      },
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 69,
    meals: [
      {
        id: 1,
        name: 'Grilled Chicken',
        description: 'Juicy grilled chicken breast with herbs.',
        price: 69,
        image: '/images/meals/grilled-chicken.jpg',
      },
      {
        id: 2,
        name: 'Paneer Tikka',
        description: 'Spiced paneer cubes grilled to perfection.',
        price: 69,
        image: '/images/meals/paneer-tikka.jpg',
      },
      {
        id: 3,
        name: 'Quinoa and Veggie Bowl',
        description: 'Protein-packed quinoa with mixed vegetables and dressing.',
        price: 69,
        image: '/images/meals/quinoa-veggie-bowl.jpg',
      },
    ],
  },
];

const MenuSection: React.FC = () => {
  return (
    <section className="py-16 bg-white w-full" id="menu">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <h2 className="text-4xl font-bold text-center text-primary mb-12">
          Our Menu
        </h2>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {services.map((service) => (
            <motion.div
              key={service.id}
              className="bg-gray-50 rounded-lg shadow-lg overflow-hidden flex flex-col"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Service Image */}
              <div className="relative h-48 w-full">
                <Image
                  src={service.meals[0].image} // Use the first meal's image as a representative
                  alt={`${service.name} Plan`}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform transform hover:scale-105 duration-300"
                />
              </div>

              {/* Service Details */}
              <div className="p-6 flex flex-col flex-grow">
                {/* Service Header */}
                <h3 className="text-2xl font-semibold text-primary mb-4">
                  {service.name} Plan
                </h3>
                <p className="text-gray-700 mb-4">
                  ₹{service.price} /mo - Enjoy a variety of delicious and healthy meals every day.
                </p>

                {/* Meals List */}
                <ul className="mb-6">
                  {service.meals.map((meal) => (
                    <li key={meal.id} className="flex items-center mb-2">
                      <span className="text-gray-600 mr-2">🍽️</span>
                      <span className="font-medium">{meal.name}</span>
                    </li>
                  ))}
                </ul>

                {/* Learn More Button */}
                <div className="mt-auto">
                  <Button variant="primary" asChild>
                    <Link
                      href={`${ROUTES.menu}/${service.id}`}
                      className="inline-flex items-center justify-center w-full"
                      aria-label={`Learn more about the ${service.name} Plan`}
                    >
                      Know More
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Optional: Additional Information */}
        <div className="mt-12 text-center">
          <p className="text-gray-600">
            Customize your meal plans to fit your lifestyle and dietary preferences. Join us today and enjoy fresh, nutritious meals delivered right to your doorstep!
          </p>
        </div>
      </div>
    </section>
  );
};

export default MenuSection;
