// src/app/page.tsx
'use client';

import React from 'react';
import HeroSection from './components/home/HeroSection';
import ServicesOverview from './components/home/ServicesOverview';
import HowItWorks from './components/home/HowItWorks';
import Testimonials from './components/home/Testimonials';
import FeaturesAndBenefits from './components/home/FeaturesAndBenefits';
import TrustBadges from './components/home/TrustBadges';
import CallToAction from './components/home/CallToAction';
import ContactSupport from './components/home/ContactSupport';
import WhatMakesUsUnique from './components/home/WhatMakesUsUnique';

const HomePage: React.FC = () => {
  return (
    <div className="overflow-x-hidden">
      <HeroSection />
      {/* <OurStory /> */}
      <ServicesOverview />
      <HowItWorks />
      {/* <MenuSection /> */}
      <Testimonials />
      <FeaturesAndBenefits />
      <WhatMakesUsUnique />
      <TrustBadges />
      <CallToAction />
      <ContactSupport />
    </div>
  );
};

export default HomePage;
