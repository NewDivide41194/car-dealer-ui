module.exports = {
    parser: '@typescript-eslint/parser', // Use the TypeScript parser if you're using TypeScript
    extends: [
      'eslint:recommended',
      'plugin:react/recommended', // React-specific linting rules
      'plugin:react-hooks/recommended', // React Hooks-specific linting rules
      'plugin:@typescript-eslint/recommended', // TypeScript rules (if using TypeScript)
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
      node: true, // Assume Node.js environment (optional)
      es2021: true, // Enable ECMAScript 2021 features
    },
    rules: {
      // Custom rules can go here
      'react/prop-types': 'off', // Disable prop-types if you're using TypeScript
      'react/react-in-jsx-scope': 'off', // Not needed if React 17 JSX Transform is used
      '@typescript-eslint/no-unused-vars': ['error'], // Example custom TypeScript rule
      'react/jsx-uses-react': 'off', // Not needed if React 17 JSX Transform is used
      'react/jsx-uses-vars': 'error', // Warn if React variables are not used
    },
    settings: {
      react: {
        version: 'detect', // Automatically detect the React version
      },
    },
  };
  