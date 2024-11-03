// @ts-check
const eslint = require("@eslint/js");
const tseslint = require("typescript-eslint");
const angular = require("angular-eslint");
const unusedImports = require('eslint-plugin-unused-imports');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');
// const stylistic = require('@stylistic/eslint-plugin')

module.exports = tseslint.config(
  {
    files: ["**/*.ts"],
    plugins: {
      // @ts-ignore
      'unused-imports': unusedImports,
    },
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
      // eslintPluginPrettierRecommended,
    ],
    processor: angular.processInlineTemplates,
    rules: {
      // Angular-specific rules
      "@angular-eslint/directive-selector": [
        "error",
        { type: "attribute", prefix: "app", style: "camelCase" },
      ],
      "@angular-eslint/component-selector": [
        "error",
        { type: "element", prefix: "app", style: "kebab-case" },
      ],

      // TypeScript-specific rules
      "@typescript-eslint/dot-notation": "off",
      "@typescript-eslint/explicit-function-return-type": "error",
      "@typescript-eslint/explicit-member-accessibility": [
        "off",
        { accessibility: "explicit" },
      ],
      "@typescript-eslint/no-inferrable-types": "off",

      // Unused imports and variables cleanup
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        { vars: "all", varsIgnorePattern: "^_", args: "after-used", argsIgnorePattern: "^_" },
      ],

      // Additional stylistic rules
      "arrow-parens": ["error", "as-needed", { requireForBlockBody: true }],
      "brace-style": "off",
      "import/order": "off",
      "max-len": ["error", { ignorePattern: "^import |^export | implements", code: 180 }],
      "no-underscore-dangle": "off",
      "quote-props": ["error", "consistent"],
      "quotes": ["error", "single"],

      // // Prettier integration
      // "prettier/prettier": [
      //   "error",
      //   {
      //     endOfLine: "auto",
      //     tabWidth: 2,
      //     useTabs: false,
      //     singleQuote: true,
      //     semi: true,
      //     bracketSpacing: true,
      //     arrowParens: "avoid",
      //     trailingComma: "es5",
      //     bracketSameLine: true,
      //     printWidth: 80,
      //   },
      // ],
    },
  },
  {
    files: ["**/*.html"],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
      // eslintPluginPrettierRecommended,  // Add Prettier recommended config for HTML

    ],
    rules: {
      // "prettier/prettier": [
      //   "error",
      //   {
      //     // Add Prettier options specifically for HTML files if needed
      //     endOfLine: "auto",
      //     tabWidth: 2,
      //     printWidth: 80,
      //     bracketSameLine: false,  // Standard HTML formatting
      //   },
      // ],
    },
  }
);
