# CLAUDE.md - Project Context for AI Assistants

## What This Is

Photography portfolio for **Mantas Zdancius** built with Hugo and [hugo-theme-gallery v4](https://github.com/nicokaiser/hugo-theme-gallery).

**Live site:** https://mantexas.github.io/space/

## Architecture

```
space/                          # Root = Hugo theme (forked from hugo-theme-gallery)
├── assets/                     # THEME assets (do not edit for site-specific changes)
│   ├── css/
│   │   ├── main.scss           # Entry point: imports _normalize, _colors, _styles, custom
│   │   ├── _colors.scss        # Theme color variables (--surface-1, --text-1, --border, etc.)
│   │   ├── _styles.scss        # All theme component styles (header, footer, cards, galleries)
│   │   └── custom.css          # Theme hook - EMPTY (overridden by exampleSite's custom.css)
│   └── js/
│       ├── main.js             # Gallery init, lazy loading, lightbox
│       └── menu.js             # Navigation toggle
├── layouts/                    # THEME templates
│   ├── _default/baseof.html    # Base: <html> → head.html → header → main block → footer
│   ├── _default/home.html      # Default home: title partial + categories + featured + galleries
│   └── partials/               # head.html, header.html, footer.html, menu.html, etc.
│
└── exampleSite/                # THE ACTUAL WEBSITE (all site-specific work goes here)
    ├── config/_default/hugo.toml   # Site config (title, theme, social links, gallery params)
    ├── content/                    # Gallery content (markdown + images)
    │   ├── _index.md               # Homepage metadata
    │   ├── portfolio/              # Featured gallery (6 images, dark theme)
    │   ├── fashion-beauty/         # 17 images, light theme
    │   ├── nature/                 # 27 images, dark theme
    │   ├── Running/                # 23 images, light theme
    │   └── about.md                # About page (prose layout)
    ├── assets/                     # SITE-SPECIFIC overrides (these take priority over root assets/)
    │   ├── css/
    │   │   ├── custom.css          # Overrides theme's empty custom.css (menu, footer, gaps)
    │   │   └── wolf.css            # Kodak Vision3 500T hero styles
    │   └── js/
    │       └── wolf.js             # Typing animation for hero
    └── layouts/                    # SITE-SPECIFIC template overrides
        ├── _default/home.html      # Overrides theme: adds wolf-hero partial before galleries
        └── partials/
            ├── wolf-hero.html      # Hero section with typing animation
            └── head-custom.html    # Loads wolf.css + wolf.js
```

## Key Concepts

### Hugo Asset Merge Order
Hugo looks for assets in `exampleSite/assets/` FIRST, then falls back to root `assets/`. When `main.scss` does `@import "custom"`, it picks up `exampleSite/assets/css/custom.css` (not the empty root one). This is how site-specific styles get bundled into the main CSS.

### Template Override Chain
`exampleSite/layouts/` overrides `layouts/`. The site's `home.html` replaces the theme's to inject the wolf-hero. The site's `head-custom.html` replaces the theme's empty one to load wolf.css and wolf.js.

### Theme Color System (from _colors.scss)
The theme uses CSS custom properties. Dark mode is the default for this site (`defaultTheme = "dark"` in hugo.toml):

| Variable       | Dark Mode | Light Mode |
|---------------|-----------|------------|
| `--surface-1` | `#0a0a0a` | `#fff`     |
| `--surface-2` | `#404040` | `#e5e5e5`  |
| `--text-1`    | `#fafafa` | `#0a0a0a`  |
| `--text-2`    | `#a3a3a3` | `#737373`  |
| `--border`    | `#606060` | `#bbb`     |

### Kodak Vision3 500T Accent Colors (from wolf.css)
| Variable         | Value     | Usage                              |
|-----------------|-----------|------------------------------------|
| `--kodak-red`   | `#E30613` | Cursor, accent elements            |
| `--tungsten`    | `#FFEDD5` | Hero title text (warm white)       |
| `--grain-black` | `#080808` | Hero background                    |

## Critical Rules

### CSS Selectors - Match the ACTUAL Theme HTML
The theme's HTML uses specific structures. Always verify selectors against `layouts/partials/`:

| Element          | Correct Selector                     | WRONG (doesn't exist)    |
|-----------------|--------------------------------------|--------------------------|
| Menu links      | `body > menu a`                      | `.menu-overlay__item`    |
| Footer          | `body > footer`                      | `footer.footer`          |
| Copyright       | `body > footer section:last-of-type` | `.copyright`             |
| Social icons    | `section.social-icons`               | `.social-icons` (alone)  |
| Gallery cards   | `.card`, `section.galleries`         |                          |
| Featured card   | `.featured-card`, `section.featured` |                          |
| Gallery items   | `.gallery-item`                      |                          |
| Page title      | `hgroup h1`                          |                          |

### File Editing Rules
- **Site-specific changes** go in `exampleSite/` (assets, layouts, content)
- **Never copy root assets/ into exampleSite/assets/** wholesale - this nukes customizations
- `exampleSite/assets/css/custom.css` is imported INTO `main.css` via SCSS `@import`
- `exampleSite/assets/css/wolf.css` is loaded as a SEPARATE stylesheet via `head-custom.html`

### Build & Deploy
```bash
cd exampleSite
hugo server              # Local dev
hugo --gc --minify       # Production build → exampleSite/public/
```
- Deploy triggers on push to `main` via `.github/workflows/deploy.yml`
- Hugo Extended v0.123.0 required (SCSS support)
- Go 1.22 required (module resolution)

### Content Management
- Image naming: `Mantas_Zdancius_*.jpeg`
- Cover image: set `params.cover: true` in resources
- Featured on homepage: set `params.featured: true` in front matter
- Gallery themes: `params.theme: dark` or `light` per gallery
- Menu order: `weight` in front matter (lower = first)

## Current State (Feb 2026)

### What's Implemented
- Kodak Vision3 500T hero with typing animation (progressive enhancement over Hugo-rendered title)
- 4 galleries: Portfolio (featured), Fashion & Beauty, Nature, Running
- Dark theme default
- Custom menu typography (8rem), footer layout, section spacing
- GitHub Pages auto-deploy from main

### Design System
See `DESIGN.md` for the full UI/UX design guide including colors, typography, spacing, and component patterns.
