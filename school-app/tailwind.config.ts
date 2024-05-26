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
        brand: {
          "50": "#f9f7fd",
          "100": "#f1edfa",
          "200": "#e5def6",
          "300": "#d1c4ee",
          "400": "#b49ee2",
          "500": "#9778d4",
          "600": "#7f5bc2",
          "700": "#6946a6",
          "800": "#5b3e8b",
          "900": "#4b3370",
          "950": "#301b50",
        },
        brandark: {
          "50": "#f7f8f8",
          "100": "#edeef1",
          "200": "#d8dbdf",
          "300": "#b6bac3",
          "400": "#8e95a2",
          "500": "#6b7280",
          "600": "#5b616e",
          "700": "#4a4e5a",
          "800": "#40444c",
          "900": "#383a42",
          "950": "#25272c",
        },
        danger: "#dc2626",
        success: "#22c55e",
        light: "#f4f5f8",
        warning: "#ffc409",
      },
    },
  },
  plugins: [],
};
export default config;
