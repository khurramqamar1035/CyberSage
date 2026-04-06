/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
  	extend: {
  		colors: {
  			// ── Protope 2 Design System ──────────────────────────────────────
  			"surface-tint":                "#b4c5ff",
  			"on-primary":                  "#002a78",
  			"surface-container-highest":   "#2e3447",
  			"surface":                     "#0c1324",
  			"on-background":               "#dce1fb",
  			"on-secondary":                "#472a00",
  			"on-secondary-fixed":          "#2a1700",
  			"surface-bright":              "#33394c",
  			"secondary-container":         "#ee9800",
  			"primary-fixed":               "#dbe1ff",
  			"inverse-surface":             "#dce1fb",
  			"surface-container-low":       "#151b2d",
  			"on-secondary-fixed-variant":  "#653e00",
  			"on-surface-variant":          "#c3c6d7",
  			"surface-dim":                 "#0c1324",
  			"outline-variant":             "#434655",
  			"tertiary":                    "#44d8f1",
  			"secondary-fixed":             "#ffddb8",
  			"primary-fixed-dim":           "#b4c5ff",
  			"on-error":                    "#690005",
  			"tertiary-container":          "#007888",
  			"on-secondary-container":      "#5b3800",
  			"on-primary-fixed":            "#00174b",
  			"background":                  "#0c1324",
  			"outline":                     "#8d90a0",
  			"surface-container-lowest":    "#070d1f",
  			"secondary-fixed-dim":         "#ffb95f",
  			"on-tertiary-fixed-variant":   "#004e59",
  			"inverse-on-surface":          "#2a3043",
  			"on-error-container":          "#ffdad6",
  			"secondary":                   "#ffb95f",
  			"tertiary-fixed-dim":          "#44d8f1",
  			"surface-variant":             "#2e3447",
  			"surface-container":           "#191f31",
  			"primary":                     "#b4c5ff",
  			"error-container":             "#93000a",
  			"primary-container":           "#2563eb",
  			"on-primary-fixed-variant":    "#003ea8",
  			"tertiary-fixed":              "#a1efff",
  			"on-tertiary-fixed":           "#001f25",
  			"on-surface":                  "#dce1fb",
  			"inverse-primary":             "#0053db",
  			"error":                       "#ffb4ab",
  			"on-tertiary":                 "#00363e",
  			"on-primary-container":        "#eeefff",
  			"surface-container-high":      "#23293c",
  			"on-tertiary-container":       "#d1f6ff",
  			// ── shadcn / Dashboard UI tokens (kept for internal components) ──
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			foreground: 'hsl(var(--foreground))',
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		fontFamily: {
  			"headline": ["Inter", "sans-serif"],
  			"body":     ["Inter", "sans-serif"],
  			"label":    ["Space Grotesk", "sans-serif"],
  		},
  		borderRadius: {
  			DEFAULT: "0.125rem",
  			sm:      "calc(var(--radius) - 4px)",
  			lg:      "0.25rem",
  			xl:      "0.5rem",
  			"2xl":   "0.75rem",
  			full:    "9999px",
  		},
  		keyframes: {
  			'accordion-down': {
  				from: { height: '0' },
  				to:   { height: 'var(--radix-accordion-content-height)' }
  			},
  			'accordion-up': {
  				from: { height: 'var(--radix-accordion-content-height)' },
  				to:   { height: '0' }
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up':   'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
