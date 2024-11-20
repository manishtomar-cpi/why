// src/app/components/home/Testimonials.tsx
'use client';

import React from 'react';
import Slider from 'react-slick';
import { FaStar, FaArrowRight } from 'react-icons/fa';
import { GiMeal } from 'react-icons/gi';
import { COLORS } from '../../constants/colors';
import Image from 'next/image';
import Button from '../Button'; // Ensure the updated Button component is imported
import Link from 'next/link'; // Import Link for navigation

// Import Slick Carousel CSS
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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
  // Slider settings for React Slick
  const settings = {
    dots: true, // Show pagination dots
    infinite: true, // Infinite loop sliding
    speed: 500, // Transition speed in ms
    slidesToShow: 1, // **Set to 1 for one testimonial per slide**
    slidesToScroll: 1, // Number of slides to scroll per swipe
    autoplay: true, // Enable autoplay
    autoplaySpeed: 5000, // Autoplay speed in ms
    arrows: true, // Show next and prev arrows
    responsive: [
      {
        breakpoint: 1024, // Below 1024px screen width
        settings: {
          slidesToShow: 1, // Keep at 1
        },
      },
      {
        breakpoint: 768, // Below 768px screen width
        settings: {
          slidesToShow: 1, // Keep at 1
        },
      },
    ],
  };

  return (
    <section className="py-16 bg-gray-50 w-full" id="testimonials">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <h2 className="text-4xl font-bold text-center text-primary mb-12">
          What Our Customers Say
        </h2>

        {/* Slider */}
        <Slider {...settings}>
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="px-4">
              <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center h-full">
                {/* Customer Photo */}
                <div className="relative w-20 h-20 mb-4">
                  <Image
                    src={testimonial.photo}
                    alt={testimonial.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full"
                    priority={false} // Set to true if image needs high priority
                  />
                </div>

                {/* Customer Name */}
                <h3 className="text-xl font-semibold mb-2">{testimonial.name}</h3>

                {/* Rating */}
                <div className="flex mb-4">
                  {Array.from({ length: 5 }, (_, i) => (
                    <FaStar
                      key={i}
                      className={`w-5 h-5 ${
                        i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                      aria-hidden="true"
                    />
                  ))}
                </div>

                {/* Testimonial Comment */}
                <p className="text-gray-700">{testimonial.comment}</p>
              </div>
            </div>
          ))}
        </Slider>

        {/* Optional: Get Started Button */}
        {/* <div className="mt-12 text-center">
          <Button variant="primary" asChild>
            <Link href="/signup" className="inline-flex items-center px-6 py-3">
              Get Started
              <FaArrowRight className="ml-2" />
            </Link>
          </Button>
        </div> */}
      </div>
    </section>
  );
};

export default Testimonials;
