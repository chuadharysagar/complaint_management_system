/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

    },
    colors: {
      sky: "#C3EBFA",
      skyLight: "#EDF9FD",
      purple: "#CFCEFF",
      purpleLight: "#F1F0FF",
      yellow: "#FAE27C",
      yellowLight: "#FEFCE8",
      green:"#4EAA52",
      red:"#ff0000",
      lightGray:"#f2f2f2",
      black:"#000000",
    },
  },
  plugins: [],
}