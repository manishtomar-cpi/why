module.exports = {
    root: true,
    extends: ['next/core-web-vitals', 'plugin:prettier/recommended'],
    rules: {
      // Your custom rules
      'react/react-in-jsx-scope': 'off',
      'jsx-a11y/alt-text': 'off',
      'quotes': ['error', 'single', { avoidEscape: true }],
    },
  };
  