// src/app/components/CustomToast.tsx

import React from 'react';

interface CustomToastProps {
  icon: React.ReactElement;
  title: string;
  message: string;
}

const CustomToast: React.FC<CustomToastProps> = ({ icon, title, message }) => {
  return (
    <div className="flex items-start">
      <div className="mr-3 mt-1">{icon}</div>
      <div>
        <strong className="block text-sm font-bold">{title}</strong>
        <span className="block text-sm">{message}</span>
      </div>
    </div>
  );
};

export default CustomToast;
