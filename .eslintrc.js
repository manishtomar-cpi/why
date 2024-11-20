module.exports = {
    root: true,
    extends: ['next/core-web-vitals'],
    rules: {
      // Suppress Prettier-specific errors
      'prettier/prettier': 'off',
  
      // General linting rules to prevent strict failures
      'quotes': ['warn', 'single', { avoidEscape: true }],
      'react/react-in-jsx-scope': 'off',
      'jsx-a11y/alt-text': 'off',
      'react/jsx-no-target-blank': 'off',
      'no-unused-vars': 'warn',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  };
  