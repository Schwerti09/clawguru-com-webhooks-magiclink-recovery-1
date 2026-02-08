/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: { 950: "#05060a" },
        brand: {
          cyan: "#22d3ee",
          blue: "#3b82f6",
          orange: "#fb923c",
          red: "#ef4444",
          green: "#22c55e",
          violet: "#8b5cf6"
        }
      },
      boxShadow: {
        glow: "0 0 40px rgba(34, 211, 238, 0.16)",
        glow2: "0 0 60px rgba(139, 92, 246, 0.12)"
      },
      keyframes: {
        fadeUp: { "0%": { opacity: "0", transform: "translateY(10px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        pulseSoft: { "0%,100%": { opacity: "1" }, "50%": { opacity: "0.65" } }
      },
      animation: {
        fadeUp: "fadeUp 420ms ease-out",
        pulseSoft: "pulseSoft 1.8s ease-in-out infinite"
      }
    }
  },
  plugins: []
}
