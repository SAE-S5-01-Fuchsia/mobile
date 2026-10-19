// https://docs.expo.dev/guides/using-eslint/
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { FlatCompat } = require("@eslint/eslintrc");
const compat = new FlatCompat();

module.exports = [
  {
    ignores: [
      "dist/**",
      "node_modules/**",
      ".expo/**",
      "web-build/**",
      "app-example/**",
      "**/*.config.js",
      "**/Constants.ts",
      ".next/**",
      "build/**",
      "coverage/**",
    ],
  },
  ...compat.extends("eslint-config-expo"),
  ...compat.extends("plugin:@typescript-eslint/recommended"),
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
      quotes: [
        "error",
        "single",
        { avoidEscape: true, allowTemplateLiterals: false },
      ],
      "no-unused-vars": "off",
    },
  },
  {
    files: ["scripts/**/*.js"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
];
