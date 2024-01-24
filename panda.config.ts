import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ["./src/**/*.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}"],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      tokens: {
        colors: {
          primary: { value: '#FF3F34'},
          dark: { value: '#16161D'},
          cardHead: { value: '#404048'},
        }
      }
    },
  },

  // The output directory for your css system
  outdir: "styled-system",
});
