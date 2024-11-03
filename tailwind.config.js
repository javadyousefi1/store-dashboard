const { addDynamicIconSelectors } = require("@iconify/tailwind");

/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./ant-design/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    // fontSize
    fontSize: {
      sm: "var(--font-size-sm)",
      base: "var(--font-size-base)",
      lg: "var(--font-size-lg)",
      xl: "var(--font-size-xl)",
      "2xl": "var(--font-size-2xl)",
      "3xl": "var(--font-size-3xl)",
      "4xl": "var(--font-size-4xl)",
      "5xl": "var(--font-size-5xl)",
      "6xl": "var(--font-size-6xl)",
      "7xl": "var(--font-size-7xl)",
    },
    // iconSize
    iconSize: {
      sm: "var(--icon--sm)",
      base: "var(--icon--base)",
      lg: "var(--icon--lg)",
      xl: "var(--icon-xl)",
      "2xl": "var(--icon-2xl)",
      "3xl": "var(--icon-3xl)",
      "4xl": "var(--icon-4xl)",
      "5xl": "var(--icon-5xl)",
      "6xl": "var(--icon-6xl)",
      "7xl": "var(--icon-7xl)",
    },
    // screen
    screens: {
      xs: "320px",
      sm: "425px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    extend: {
      colors: {
        // primary color
        primary: "var(--color-primary)",
        "primary-bg": "var(--color-primary-bg)",
        
        // background
        "color-bg": "var(--color--bg)",
        "gray-icon": "var(--gray-icon)",
        "gray-light-icon": "var(--gray-light-icon)",

        // secondary color
        secondary: "var(--color-secondary)",
        "secondary-bg": "var(--color-secondary-bg)",

        // first blue
        "first-blue": "var(--color-first-blue)",
        "first-blue-light": "var(--color-first-blue-light)",

        // second blue
        "second-blue": "var(--color-second-blue)",
        "second-blue-light": "var(--color-second-blue-light)",

        // highlight
        "highlight-yellow": "var(--color-highlight-yellow)",
        "highlight-yellow-light": "var(--color-highlight-yellow-light)",

        // status
        error: "var(--color-error)",
        "error-light": "var(--color-error-light)",
        success: "var(--color-success)",
        "success-light": "var( --color-success-light)",
      },
    },
  },
  plugins: [addDynamicIconSelectors()],
};
