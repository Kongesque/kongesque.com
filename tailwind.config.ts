import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ["var(--font-geist-mono)"],
      },
      colors: {
        background: "var(--background)",
        accent: "var(--color-accent)",
		accentHover: "var(--color-accent-hover)",
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        secondaryHover: "var(--color-secondary-hover)",
        blockBg: "var(--color-block-bg)",
        blockBorder: "var(--color-block-border)",
        blockHover: "var(--color-block-hover)",
        inblockBorder: "var(--color-inblock-border)",
      },
    },
  },
  plugins: [],
} satisfies Config;