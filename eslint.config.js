// eslint.config.js

import eslintConfigNext from "eslint-config-next";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  {
    ...eslintConfigNext(),
    files: ["**/*.{js,jsx,ts,tsx}"],
  },
  {
    rules: {
      "react/react-in-jsx-scope": "off", // React 17+
      "react/jsx-uses-react": "off",
    },
  },
  eslintConfigPrettier,
];
