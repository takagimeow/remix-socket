module.exports = {
  content: ["./app/**/*.{ts,tsx,js,jsx}"],
  darkMode: "media",
  theme: {
    extend: {
      animation: {
        "pulse-cursor": "pulse-cursor 1.5s ease-in-out infinite",
        "stretch-height": "stretch-height 0.55s ease-in-out",
        "invert-stretch-height": "invert-stretch-height 0.55s ease-in-out",
        "translate-bubble-a": "translate-bubble-a 0.55s ease-in-out",
        "invert-translate-bubble-a": "invert-translate-bubble-a 0.55s ease-in-out",
        "translate-bubble-b": "translate-bubble-b 0.55s ease-in-out",
        "invert-translate-bubble-b": "invert-translate-bubble-b 0.55s ease-in-out",
        "hover-room-text": "hover-room-text 0.55s ease-in-out",
        "invert-hover-room-text": "invert-hover-room-text 0.55s ease-in-out"
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
        },
        "stretch-height": {
          "0%": {
            height: "3rem"
          },
          "100%": {
            height: "12rem"
          }
        },
        "invert-stretch-height": {
          "0%": {
            height: "12rem"
          },
          "100%": {
            height: "3rem"
          }
        },
        "translate-bubble-a": {
          "0%": {
            top: "2rem"
          },
          "100%": {
            top: "11rem"
          }
        },
        "invert-translate-bubble-a": {
          "0%": {
            top: "11rem"
          },
          "100%": {
            top: "2rem"
          }
        },
        "translate-bubble-b": {
          "0%": {
            top: "4rem"
          },
          "100%": {
            top: "13rem"
          }
        },
        "invert-translate-bubble-b": {
          "0%": {
            top: "13rem"
          },
          "100%": {
            top: "4rem"
          }
        },
        "hover-room-text": {
          "0%": {
            opacity: 1
          },
          "100%": {
            opacity: 0.6,
          }
        },
        "invert-hover-room-text": {
          "0%": {
            opacity: 0.6,
          },
          "100%": {
            opacity: 1,
          }
        }
      }
    },
  },
  plugins: [],
}