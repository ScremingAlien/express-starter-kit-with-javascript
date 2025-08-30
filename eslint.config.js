// eslint.config.js
import prettier from "eslint-plugin-prettier";
import globals from "globals";

export default [
  {
    ignores: ["node_modules", "dist", "coverage"],

    languageOptions: {
      globals: globals.node,
      ecmaVersion: "latest",
      sourceType: "module",
    },

    plugins: {
      prettier,
    },

    rules: {
      // ESLint rules
      quotes: ["error", "double"],
      semi: ["error", "always"],
      eqeqeq: ["error", "always"],
      curly: ["error", "all"],

      // Run Prettier as ESLint rule
      "prettier/prettier": [
        "error",
        {
          singleQuote: false, // force double quotes
          semi: true,
          trailingComma: "es5",
          tabWidth: 2,
          printWidth: 100,
        },
      ],
    },
  },
];
