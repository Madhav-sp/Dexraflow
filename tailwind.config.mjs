// tailwind.config.mjs
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./spa/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // ← this makes utilities like bg-brand / text-brand available
      colors: {
        brand: { DEFAULT: "#4F46E5" }
      },
      // ← this creates a custom shadow utility you can @apply: shadow-soft
      boxShadow: {
        soft: "0 12px 32px rgba(15,23,42,0.08)"
      }
    },
  },
  plugins: [],
};
