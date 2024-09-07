import defaultTheme from "tailwindcss/defaultTheme";

function withOpacityValue(variable) {
  return ({ opacityVariable, opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variable}), ${opacityValue})`;
    }
    if (opacityVariable !== undefined) {
      return `rgba(var(${variable}), var(${opacityVariable}, 1))`;
    }
    return `rgb(var(${variable}))`;
  };
}

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        kanit: ["Kanit", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        transparent: "transparent",
        current: "currentColor",
        blue: withOpacityValue("--tw-color-blue"),
        indigo: "#6610f2",
        purple: "#6f42c1",
        pink: "#e83e8c",
        red: "#dc3545",
        orange: "#fd7e14",
        yellow: "#ffc107",
        green: "#28a745",
        teal: "#20c997",
        cyan: "#17a2b8",
        white: "#fff",
        gray: "#6c757d",
        "gray-dark": "#343a40",
        primary: "#0747A6",
        secondary: "#e1e1ef",
        success: "#1dc9b7",
        info: "#5578eb",
        warning: "#ffb822",
        danger: "#fd397a",
        light: "#f8f9fa",
        dark: "#343a40",
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
