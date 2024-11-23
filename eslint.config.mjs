// import globals from "globals";
// import pluginJs from "@eslint/js";
// import tseslint from "@typescript-eslint/eslint-plugin";
// import eslintPluginPrettierRecommended from "eslint-plugin-prettier";

// export default [
//   {
//     files: ["**/*.{js,mjs,cjs,ts}"],
//     languageOptions: {
//       globals: globals.node,
//     },
//     rules: {
//       "no-unused-vars": "error",
//       "no-unused-expressions": "error",
//       "prefer-const": "error",
//       "no-console": "warn",
//       "no-undef": "error",
//     },
//   },
//   pluginJs.configs.recommended,
//   ...tseslint.configs.recommended,
//   eslintPluginPrettierRecommended,
//   {
//     ignores: ["node_modules", "dist"],
//   },
// ];

import globals from "globals";
import pluginJs from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import tseslint from "@typescript-eslint/eslint-plugin";
import eslintPluginPrettier from "eslint-plugin-prettier";

export default [
  // Core ESLint Configuration
  {
    files: ["**/*.{ts,js}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: globals.node,
    },
    plugins: {
      "@typescript-eslint": tseslint,
      prettier: eslintPluginPrettier,
    },
    rules: {
      ...pluginJs.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,
      // "prettier/prettier": "error",
      "no-unused-vars": "error",
      "no-unused-expressions": "error",
      "prefer-const": "error",
      "no-console": "warn",
      "no-undef": "error",
      "no-explicit-any": "error"
    },
  },
  // Ignore Directories
  {
    ignores: ["node_modules", "dist"],
  },
];

// import globals from 'globals';
// import pluginJs from '@eslint/js';
// import tsParser from '@typescript-eslint/parser';
// import tseslint from '@typescript-eslint/eslint-plugin';
// import eslintPluginPrettier from 'eslint-plugin-prettier';

// export default [
//   {
//     // Core ESLint Configuration
//     files: ['**/*.{ts,js}'],
//     languageOptions: {
//       parser: tsParser, // Using TypeScript parser
//       parserOptions: {
//         ecmaVersion: 'latest', // Latest ECMAScript features
//         sourceType: 'module', // Support ES Modules
//       },
//       globals: globals.node, // Node.js global variables
//     },
//     plugins: {
//       '@typescript-eslint': tseslint,
//       prettier: eslintPluginPrettier,
//     },
//     rules: {
//       ...pluginJs.configs.recommended.rules, // Core recommended rules
//       ...tseslint.configs.recommended.rules, // TypeScript recommended rules
//       'prettier/prettier': 'error', // Prettier rule
//       'no-unused-vars': 'error', // No unused variables
//       'no-unused-expressions': 'error', // No unused expressions
//       'prefer-const': 'error', // Prefer const
//       'no-console': 'warn', // Warn for console statements
//       'no-undef': 'error', // No undefined variables
//       // "@typescript-eslint/no-explicit-any": "error", // Correct rule for no-explicit-any
//     },
//   },
//   // Ignore directories
//   {
//     ignores: ['node_modules', 'dist'],
//   },
// ];
