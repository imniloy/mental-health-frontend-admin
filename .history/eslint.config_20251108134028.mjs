import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // === 🔧 TypeScript Rules ===
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
      "@typescript-eslint/no-explicit-any": "off", // too strict for real projects
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-require-imports": "off",

      // === ⚙️ Next.js Specific ===
      "@next/next/no-img-element": "off", // allow <img> while developing
      "@next/next/no-page-custom-font": "off",

      // === 💬 React Rules ===
      "react/no-unescaped-entities": "off", // allow normal quotes in JSX

      // === 🧹 General Cleanups ===
      "no-console": "off", // keep console logs during development
      "no-unused-vars": "off", // handled by TS plugin
      "react/react-in-jsx-scope": "off", // not needed in Next.js
    },
  },
];

export default eslintConfig;
