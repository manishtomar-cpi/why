// src/app/components/StructuredData.tsx
'use client';

import React from 'react';
import Head from 'next/head';

const StructuredData: React.FC = () => {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "WHY",
    url: "https://www.why.com",
    logo: "https://www.why.com/images/logo.png",
    sameAs: [
      "https://www.facebook.com/why",
      "https://www.twitter.com/why",
      "https://www.instagram.com/why",
      "https://www.linkedin.com/company/why",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-22-1234-5678",
      contactType: "customer service",
      areaServed: "IN",
      availableLanguage: ["English"],
    },
    description: "Providing fresh, nutritious, and affordable tiffin services to students and professionals across India.",
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      />
    </Head>
  );
};

export default StructuredData;
