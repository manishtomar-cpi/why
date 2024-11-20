// src/app/constants/services.ts

export interface Service {
    id: 'regular' | 'premium';
    name: string;
  }
  
  export const SERVICES: Service[] = [
    { id: 'regular', name: 'Regular' },
    { id: 'premium', name: 'Premium' },
  ];
  