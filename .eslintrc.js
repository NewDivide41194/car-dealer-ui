module.exports = {
    parser: '@typescript-eslint/parser', // Use the TypeScript parser
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:@typescript-eslint/recommended', // TypeScript rules
      'plugin:react-hooks/recommended', // React Hooks rules
      'plugin:prettier/recommended', // Prettier integration
    ],
    parserOptions: {
      ecmaVersion: 2021, // Allows for the parsing of modern ECMAScript features
      sourceType: 'module', // Allows for the use of imports
      ecmaFeatures: {
        jsx: true, // Allow JSX syntax
      },
    },
    env: {
      browser: true, // Assume browser environment
      node: true, // Assume Node.js environment
      es2021: true, // Enable ECMAScript 2021 features
    },
    rules: {
      // Custom rules
      '@typescript-eslint/no-unused-vars': ['error'],
      "@typescript-eslint/no-unused-expressions": "off",
      'react/prop-types': 'off', // You can turn this off if you are using TypeScript
      'react/react-in-jsx-scope': 'off', // React 17 JSX Transform doesn't need it
    },
    settings: {
      react: {
        version: 'detect', // Automatically detect the React version
      },
    },
  };
  