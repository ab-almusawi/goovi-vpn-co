import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        darkSurface: '#0D1117',
        darkCard: '#161B22',
        darkBorder: '#21262D',
        primary: '#238636',
        secondary: '#1F6FEB',
        accent: '#DA7A00',
        error: '#F85149',
      },
    },
  },
  plugins: [],
};
export default config;
