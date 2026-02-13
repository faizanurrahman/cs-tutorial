module.exports = {
  content: ["./src/**/*.{html,ts,md}"],
  darkMode: "class", // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef2ff",
          100: "#e0e7ff",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
          800: "#3730a3",
          900: "#312e81",
        },
        logic: {
          address: "#3b82f6",
          value: "#10b981",
          null: "#94a3b8",
          pointer: "#f43f5e",
        },
        signal: {
          note: { bg: "#eff6ff", border: "#3b82f6", text: "#1e40af" },
          tip: { bg: "#f0fdf4", border: "#22c55e", text: "#166534" },
          warn: { bg: "#fffbeb", border: "#f59e0b", text: "#92400e" },
          danger: { bg: "#fef2f2", border: "#ef4444", text: "#991b1b" },
        },
        surface: {
          canvas: "#ffffff",
          sidebar: "#f8fafc",
          code: "#1e293b",
          text: "#0f172a",
          muted: "#64748b",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "none",
            color: "var(--tw-prose-body)",
            a: {
              color: "#6366f1",
              "&:hover": {
                color: "#4f46e5",
              },
            },
          },
        },
      },
    },
  },
  plugins: [
    // require('@tailwindcss/typography'),
  ],
};
