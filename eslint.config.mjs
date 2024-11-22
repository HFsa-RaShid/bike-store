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
    },
  },
  // Ignore Directories
  {
    ignores: ["node_modules", "dist"],
  },
];
