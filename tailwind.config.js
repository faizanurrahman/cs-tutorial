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
        canvas: {
          DEFAULT: "#0f172a",
          card: "#1e293b",
          border: "#334155",
        },
        neon: {
          cyan: "#22d3ee",
          purple: "#a855f7",
          orange: "#fb923c",
          green: "#4ade80",
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
          "canvas-dark": "#111827",
          sidebar: "#f8fafc",
          "sidebar-dark": "#1f2937",
          code: "#f1f5f9",
          "code-dark": "#0f172a",
          text: "#0f172a",
          "text-dark": "#f9fafb",
          muted: "#64748b",
          "muted-dark": "#9ca3af",
        },
        slate: {
          850: "#1e293b",
          950: "#020617",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Inter Tight", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      animation: {
        "pulse-slow":
          "pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        shimmer: "shimmer 2s linear infinite",
      },
      keyframes: {
        shimmer: {
          from: { backgroundPosition: "0 0" },
          to: { backgroundPosition: "-200% 0" },
        },
      },
      backgroundImage: {
        "grid-white": `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(255 255 255 / 0.05)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`,
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
  plugins: [require("@tailwindcss/typography")],
};
