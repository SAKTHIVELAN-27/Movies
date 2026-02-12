/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gray: "var(--gray)",
        "light-purple": "var(--light-purple)",
        purple: "var(--purple)",
        white: "var(--white)",
      },
      fontFamily: {
        "14px-regular": "var(--14px-regular-font-family)",
        "16-px-bold": "var(--16-px-bold-font-family)",
        "16-px-semibold": "var(--16-px-semibold-font-family)",
        "16px-medium": "var(--16px-medium-font-family)",
        "16px-regular": "var(--16px-regular-font-family)",
        "18px-regular": "var(--18px-regular-font-family)",
        "20px-semibold": "var(--20px-semibold-font-family)",
        "48px-semibold": "var(--48px-semibold-font-family)",
        poppins: ["Poppins", "Helvetica", "sans-serif"],
        mulish: ["Mulish", "Helvetica", "sans-serif"],
      },
    },
  },
  plugins: [],
};
