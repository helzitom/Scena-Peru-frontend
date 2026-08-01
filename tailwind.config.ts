import type { Config } from "tailwindcss";

// Paleta derivada del mockup aprobado: flyer xerox + tonos calidos andinos.
// coral = accion principal / tocadas, amber = lanzamientos, teal = recuerdos.
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#F7F1E8",
        ink: "#241A14",
        coral: { DEFAULT: "#D85A30", dark: "#993C1D", light: "#F0997B" },
        amber: { DEFAULT: "#E8A23D", dark: "#854F0B", light: "#FAEEDA" },
        teal: { DEFAULT: "#1D9E75", dark: "#0F6E56", light: "#E1F5EE" },
        sand: "#C7B9A3"
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"]
      }
    }
  },
  plugins: []
};
export default config;
