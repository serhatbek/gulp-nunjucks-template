import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";
import eslintConfigPrettier from "eslint-config-prettier/flat";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended", eslintConfigPrettier],
    languageOptions: {
      ecmaVersion: "latest",
      globals: globals.browser,
      sourceType: "script", // or "module" if using ES modules
    },
    rules: {
      // 🔧 Modern JavaScript
      "prefer-const": "warn",
      "no-var": "error",
      "prefer-arrow-callback": "warn",
      "prefer-template": "warn",

      // 🧼 Clean code
      "no-unused-vars": [
        "warn",
        { vars: "all", args: "after-used", ignoreRestSiblings: true },
      ],
      "no-console": "warn",
      "no-debugger": "warn",
      "no-duplicate-imports": "error",
      quotes: ["error", "double", { avoidEscape: true }],

      // 🚀 Optional: enforce modern features
      "prefer-destructuring": [
        "warn",
        {
          object: true,
          array: false,
        },
      ],
      "no-underscore-dangle": "off",
    },
  },
]);
