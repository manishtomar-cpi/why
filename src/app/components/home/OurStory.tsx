// src/app/components/home/OurStory.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Button from '../Button';
import Link from 'next/link';
import { ROUTES } from '../../constants/routes';
// import { COLORS } from '../../constants/colors';
import Image from 'next/image';
import { FaArrowRight } from 'react-icons/fa';

const OurStory: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50 w-full" id="our-story">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col-reverse md:flex-row items-center">
          {/* Text Content */}
          <motion.div
            className="md:w-1/2 w-full"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">Our Story</h2>
            <p className="text-gray-700 mb-4">
              At WHY, we believe that good food is a fundamental human requirement. Founded by <strong>Manish Tomar</strong> and <strong>Priyanshu Vishvakarma</strong>, both students passionate about healthy living, our journey began across various cities in India. We faced the common challenge of accessing quality, affordable meals that nourish both body and mind.
            </p>
            <p className="text-gray-700 mb-4">
              Frustrated by the poor quality and high costs of available meal options, we set out to create a solution that addresses these issues head-on. Our mission is to provide fresh, nutritious meals at pocket-friendly prices, tailored to meet the diverse dietary needs of students and professionals alike.
            </p>
            <p className="text-gray-700 mb-6">
              Driven by our commitment to health and affordability, we established WHY as a platform that not only feeds but also empowers our community with the right nutrition for a better tomorrow.
            </p>
            <Button variant="primary" asChild>
              <Link href={ROUTES.about} className="inline-flex items-center">
                Know More
                <FaArrowRight className="ml-2" />
              </Link>
            </Button>
          </motion.div>

          {/* Image Content */}
          <motion.div
            className="md:w-1/2 w-full mb-8 md:mb-0"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <Image
              src="/images/our-story.jpg" // Ensure this image exists in public/images/
              alt="Our Story Image"
              width={600}
              height={400}
              className="rounded-lg shadow-lg object-cover w-full h-auto"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;
