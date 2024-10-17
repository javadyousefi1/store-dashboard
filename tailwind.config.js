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
        "primary-5": "var(--color-Primary_5)",
        "primary-25": "var(--color-Primary_25)",
        "primary-50": "var(--color-primary-50)",
        "primary-100": "var(--color-primary-100)",
        "primary-light-select-bg": "var(--color-primary-light-select-bg)",
        "primary-sidebar-bg": "var(--color-primary-sidebar-bg)",
        "primary-hover": "var(--color-primary-hover)",
        "primary-lightBorder": "var(--color-primary-lightBorder)",
        "--color-primarySidebarBg": "var(--color-primarySidebarBg)",

        // secondary color
        secondary: "var(--color-secondary)",
        "secondary-hover": "var(--color-secondary-hover)",
        "secondary-lightHoverBg": "var(--color-secondary-lightHoverBg)",
        "secondary-bg": "var(--color-secondary-bg)",
        "secondary-lightBorder": "var(--color-secondary-lightBorder)",
        "secondary-text": "#717888",

        // main
        "main-bg": "var(--color-main-background)",
        "main-red": "#ef4444",
        "main-text": "var(--color-main-text)",
        "main-purple": "#5A2187",
        "main-border": "#E4E4E4",

        // text
        "text-primary": "var(--color-text-primary)",
        "text-grade3": "var(--color-text-grade3)",
        "text-placeholder": "var(--color-text-placeholder)",
        "text-grade2": "var(--color-text-grade2)",

        // light color
        "middle-border": "var(--color-middle-border)",
        "primary-light-bg": "var(--color-primary-light-bg)",
        "low-border": "var(--color-low-border)",
        "light-border": "var(--color-light-border)",
        "low-border-bg": "var(--color-low-border-bg)",
        white: "#fff",
      },
    },
  },
  plugins: [addDynamicIconSelectors()],
};
