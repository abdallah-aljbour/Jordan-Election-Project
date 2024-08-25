import withMT from "@material-tailwind/react/utils/withMT";
import daisyui from "daisyui";
export default withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      spacing: {
        6: "1.5rem",
        8: "2rem",
        3: "0.75rem",
        4: "1rem",
      },
      maxWidth: {
        "4xl": "56rem",
      },
      colors: {
        red: {
          100: "#FBE8E8",
          300: "#F6B2B2",
          500: "#DA2A29", // الأحمر الأساسي
          700: "#B02D2A",
        },
        green: {
          100: "#E6F9F0",
          300: "#9EEDC4",
          500: "#01924C", // الأخضر الأساسي
          700: "#017C3A",
        },
        black: {
          500: "#201D1E", // الأسود الأساسي
          700: "#161616",
        },
        gray: {
          50: "#F9FAFB",
          200: "#E5E7EB",
          300: "#D1D5DB",
          500: "#6B7280",
          700: "#374151",
        },
        blue: {
          500: "#3B82F6",
          600: "#2563EB",
        },
      },
      boxShadow: {
        lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      },
      borderRadius: {
        lg: "0.5rem",
        md: "0.375rem",
      },
      zIndex: {
        10: "10",
      },
      flex: {
        1: "1 1 0%",
      },
      fontFamily: {
        amiri: ["Amiri", "sans-serif"],
      },
      keyframes: {
        animatedgradient: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
      backgroundSize: {
        "300%": "300%",
      },
      animation: {
        gradient: "animatedgradient 6s ease infinite alternate",
      },
    },
  },
  daisyui: {
    themes: ["light", "dark", "cupcake"],
  },
  plugins: [daisyui],
});
