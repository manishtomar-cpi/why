// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}', // Adjust the paths as needed
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6B21A8', // Purple
        primaryDark: '#5A178A',
        secondary: '#1F2937', // Dark Gray
        secondaryDark: '#111827',
        accent: '#FBBF24', // Amber
        white: '#FFFFFF',
        gray: {
          50: '#F9FAFB',
          200: '#E5E7EB',
          700: '#374151',
          800: '#1F2937',
        },
      },
      animation: {
        'fade-in-down': 'fadeInDown 1s ease-out forwards',
        'fade-in-up': 'fadeInUp 1s ease-out forwards',
        fadeIn: 'fadeIn 2s ease-in-out forwards',
      },
    },
  },
  plugins: [],
};
