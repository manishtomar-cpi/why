// src/app/components/home/Testimonials.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';
import { COLORS } from '../../constants/colors';
import Image from 'next/image';

interface Testimonial {
  id: number;
  name: string;
  photo: string;
  rating: number; // Out of 5
  comment: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Amit Sharma',
    photo: '/images/testimonials/amit.jpg',
    rating: 5,
    comment: 'WHY has transformed my daily meals. Delicious and affordable!',
  },
  {
    id: 2,
    name: 'Sonia Gupta',
    photo: '/images/testimonials/sonia.jpg',
    rating: 4,
    comment: 'The diet plans are fantastic. I feel healthier and more energized.',
  },
  {
    id: 3,
    name: 'Rahul Mehta',
    photo: '/images/testimonials/rahul.jpg',
    rating: 5,
    comment: 'Timely delivery and excellent customer service. Highly recommended!',
  },
  // Add more testimonials as needed
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50 w-full" id="testimonials">
      <div className="container">
        <h2 className="text-4xl font-bold text-center text-primary mb-12">
          What Our Customers Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={testimonial.photo}
                alt={testimonial.name}
                width={80}
                height={80}
                className="rounded-full mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold mb-2">{testimonial.name}</h3>
              <div className="flex mb-4">
                {Array.from({ length: 5 }, (_, i) => (
                  <FaStar
                    key={i}
                    className={`w-5 h-5 ${
                      i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <p className="text-gray-700">{testimonial.comment}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
