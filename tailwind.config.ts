import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Original vars
        background: "var(--background)",
        foreground: "var(--foreground)",

        // New color scheme
        primary: {
          DEFAULT: '#10B981', // Modern green
          dark: '#059669',
          light: '#34D399',
        },
        dark: {
          DEFAULT: '#111827', // Dark background
          light: '#1F2937',
          darker: '#0F172A',
        },
        accent: {
          DEFAULT: '#22C55E',
          dark: '#16A34A',
        }
      },
    },
  },
  plugins: [],
} satisfies Config;