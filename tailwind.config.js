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
  						// ── CyberSage palette — values live in src/styles/ecosystem.css ──
			"void":            "var(--void)",
			"k":               "var(--k)",
			"base":            "var(--base)",
			"navy":            "var(--navy)",
			"k2":              "var(--k2)",
			"panel":           "var(--panel)",
			"panel-2":         "var(--panel-2)",
			"panel-3":         "var(--panel-3)",
			"surface-deep":    "var(--surface-deep)",
			"edge":            "var(--edge)",
			"edge-soft":       "var(--edge-soft)",
			"edge-strong":     "var(--edge-strong)",
			"dim":             "var(--slate)",
			"dim-2":           "var(--slate-2)",
			"steel":           "var(--steel)",
			"cold":            "var(--cold)",
			"fog":             "var(--fog)",
			"fog-2":           "var(--fog-2)",
			"mist":            "var(--mist)",
			"off":             "var(--off)",
			"paper":           "var(--paper)",
			"brand":           "var(--blue)",
			"brand-deep":      "var(--blue-ink)",
			"periwinkle":      "var(--periwinkle)",
			"gold":            "var(--amber)",
			"alert":           "var(--alert)",
			"danger":          "var(--danger)",

			// Kept so existing bg-primary / bg-background / bg-secondary keep
			// their current values. Same colours, now named in one place.
			"primary":        "var(--periwinkle)",
			"background":     "var(--surface-deep)",
			"secondary":      "var(--amber)",

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
  			"headline": ["Archivo", "sans-serif"],
  			"body":     ["Archivo", "sans-serif"],
  			"mono":     ["IBM Plex Mono", "ui-monospace", "monospace"],
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
