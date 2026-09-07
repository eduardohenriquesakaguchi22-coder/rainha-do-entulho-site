/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    // ---- Design System · Rainha do Entulho v2.0 ("Realeza Industrial") ----
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", sm: "2rem", lg: "3rem" },
      screens: { xl: "1320px" },
    },
    extend: {
      colors: {
        // Primária
        red: { DEFAULT: "#B51731", dark: "#8B1226", deep: "#6E0F1F" },
        // Secundária / realeza
        gold: { DEFAULT: "#C19A6B", dark: "#9A7A4E", light: "#DAC19B" },
        // Estrutura
        charcoal: { DEFAULT: "#2C2C2C", soft: "#3A3A38" },
        // Neutras
        cream: { DEFAULT: "#FBF5E5", 2: "#F3EAD3" },
        line: "#E6DBBF",
        ink: { DEFAULT: "#2C2C2C", soft: "#6B6459" },
        // Semântico (fora do sistema de marca)
        wa: "#25D366",
      },
      fontFamily: {
        display: ['"Anton"', "system-ui", "sans-serif"],
        head: ['"Archivo"', "system-ui", "sans-serif"],
        body: ['"IBM Plex Sans"', "system-ui", "sans-serif"],
      },
      fontSize: {
        "2xs": ["0.6875rem", { lineHeight: "1rem", letterSpacing: "0.14em" }],
      },
      borderRadius: {
        // Industrial / editorial: cantos discretos, nada de "app"
        card: "4px",
        xl2: "6px",
      },
      maxWidth: {
        prose2: "58ch",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(44,44,44,.05), 0 10px 24px -18px rgba(44,44,44,.22)",
        card: "0 1px 2px rgba(44,44,44,.05), 0 14px 34px -22px rgba(44,44,44,.28)",
        lift: "0 10px 22px -12px rgba(44,44,44,.30)",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.25,0.46,0.45,0.94)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-ring": {
          "0%": { boxShadow: "0 0 0 0 rgba(181,23,49,.45)" },
          "70%": { boxShadow: "0 0 0 12px rgba(181,23,49,0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(181,23,49,0)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-7px)" },
        },
      },
      animation: {
        "fade-up": "fade-up .6s var(--tw-ease, cubic-bezier(0.25,0.46,0.45,0.94)) both",
        "pulse-ring": "pulse-ring 2.4s ease-out infinite",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
}
