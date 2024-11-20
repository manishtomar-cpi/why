// src/app/page.tsx
'use client';

import React from 'react';
import HeroSection from './components/home/HeroSection';
import OurStory from './components/home/OurStory';
import ServicesOverview from './components/home/ServicesOverview';
import HowItWorks from './components/home/HowItWorks';
import MenuSection from './components/home/MenuSection';
import Testimonials from './components/home/Testimonials';
import FeaturesAndBenefits from './components/home/FeaturesAndBenefits';
import TrustBadges from './components/home/TrustBadges';
import CallToAction from './components/home/CallToAction';
import ContactSupport from './components/home/ContactSupport';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const HomePage: React.FC = () => {
  return (
    <>
        <HeroSection />
        <OurStory />
        <ServicesOverview />
        <HowItWorks />
        <MenuSection />
        <Testimonials />
        <FeaturesAndBenefits />
        <TrustBadges />
        <CallToAction />
        <ContactSupport />
    </>
  );
};

export default HomePage;
