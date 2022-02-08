module.exports = {
  content: ["./app/**/*.{ts,tsx,js,jsx}"],
  darkMode: "media",
  theme: {
    extend: {
      animation: {
        "pulse-cursor": "pulse-cursor 1.5s ease-in-out infinite"
      },
      keyframes: {
        "pulse-cursor": {
          "0%": {
            opacity: "0"
          },
          "50%": {
            opacity: "1"
          },
          "100%": {
            opacity: "0"
          }
        }
      }
    },
  },
  plugins: [],
}