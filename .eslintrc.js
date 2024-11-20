module.exports = {
    root: true,
    extends: ['next/core-web-vitals', 'plugin:prettier/recommended'],
    rules: {
      'react/react-in-jsx-scope': 'off', // Next.js doesn't require React to be in scope
      'jsx-a11y/alt-text': 'off', // Adjust based on your needs
      'react/jsx-no-target-blank': 'off', // Optional based on your project
      'no-unused-vars': 'warn',
      'quotes': ['error', 'single', { avoidEscape: true }], // Fix quotes issue
    },
  };
  