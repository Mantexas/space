# Design System - Mantas Zdancius Portfolio

A design guide for maintaining visual consistency across the site. Inspired by Kodak Vision3 500T film stock and cinematic photography aesthetics.

## Design Philosophy

**Cinematic minimalism.** The photography is the hero. Every UI element should recede and let the images speak. Think A24 title cards, not Squarespace templates.

- Show, don't decorate
- Generous whitespace over busy layouts
- Warm, filmic tones over cold digital defaults
- Typography that commands attention when needed, disappears when not

## Color Palette

### Primary Colors (Kodak Vision3 500T)

| Name          | Variable         | Hex       | Usage                                          |
|---------------|------------------|-----------|-------------------------------------------------|
| Kodak Red     | `--kodak-red`    | `#E30613` | Primary accent: cursor, links, hover states, CTAs |
| Tungsten      | `--tungsten`     | `#FFEDD5` | Hero title text, warm highlights                |
| Grain Black   | `--grain-black`  | `#080808` | Hero background, deep black surfaces            |

### Theme Colors (from hugo-theme-gallery)

These are the base theme variables. Use them for all general UI elements.

| Name       | Variable      | Dark Mode  | Light Mode | Usage                          |
|------------|---------------|------------|------------|--------------------------------|
| Surface 1  | `--surface-1` | `#0a0a0a`  | `#ffffff`  | Page background                |
| Surface 2  | `--surface-2` | `#404040`  | `#e5e5e5`  | Card backgrounds, loading states |
| Text 1     | `--text-1`    | `#fafafa`  | `#0a0a0a`  | Primary text, headings         |
| Text 2     | `--text-2`    | `#a3a3a3`  | `#737373`  | Secondary text, descriptions   |
| Border     | `--border`    | `#606060`  | `#bbbbbb`  | Dividers, outlines             |

### When to Use Which

- **Page backgrounds, cards, text**: Use theme variables (`--surface-1`, `--text-1`, etc.)
- **Accent elements** (buttons, active states, links, cursor): Use `--kodak-red`
- **Hero section only**: Use `--tungsten` and `--grain-black`
- **Never** use raw hex values inline - always reference CSS variables

## Typography

### Font Stack

```css
font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
```

The theme uses the system sans-serif stack. The hero overrides with Helvetica Neue for tighter tracking. Do not introduce additional web fonts unless there's a strong reason (they add load time).

### Type Scale

| Element                  | Size                             | Weight | Letter-spacing | Line-height |
|--------------------------|----------------------------------|--------|----------------|-------------|
| Hero title               | `clamp(3rem, 8vw, 6rem)`        | 700    | `-0.02em`      | 1.1         |
| Page title (hgroup h1)   | `clamp(2rem, calc(1.667rem + 1.481vw), 3rem)` | 600 | - | clamp       |
| Section title (hgroup h2)| `clamp(1.5rem, calc(1.333rem + 0.741vw), 2rem)` | 600 | - | clamp       |
| Card title (h2)          | `1.125rem`                       | 600    | -              | 1.375       |
| Featured card title      | `clamp(1.5rem, calc(1.375rem + 0.556vw), 1.875rem)` | 600 | - | 1.2  |
| Body/description         | `1.0625rem`                      | 400    | -              | 1.5556      |
| Card meta (photo count)  | `0.875rem`                       | 400    | -              | 1.4286      |
| Footer text              | `0.875rem`                       | 400    | -              | 1.4286      |
| Copyright                | `0.8rem`                         | 400    | -              | -           |
| Menu links               | `8rem`                           | 700    | -              | 1           |

### Typography Rules

- **Headings**: Weight 600-700, tight line-height
- **Body text**: Weight 400, relaxed line-height (1.5+)
- Use `text-wrap: balance` on headings for clean line breaks
- Use `clamp()` for responsive sizing - no media query breakpoints for fonts
- Menu uses dramatically oversized typography (8rem) - this is intentional for the cinematic feel

## Spacing System

### Base Unit
The theme uses `rem` throughout. Base spacing relationships:

| Name        | Value    | Usage                                      |
|-------------|----------|--------------------------------------------|
| xs          | `0.5rem` | Tight gaps (header padding, button padding) |
| sm          | `1rem`   | Card inner padding, list item gaps          |
| md          | `1.5rem` | Section horizontal padding, card gaps       |
| lg          | `2rem`   | Section bottom margins (mobile)             |
| xl          | `3rem`   | Section bottom margins (desktop), header margin |
| 2xl         | `4rem`   | Footer padding, hero section padding        |
| 3xl         | `6rem`   | Footer top padding, featured section gap    |

### Section Spacing

| Section             | Top          | Bottom       | Horizontal   |
|---------------------|-------------|--------------|--------------|
| Hero                | `4rem`      | `4rem`       | `1.5rem`     |
| Featured            | auto (theme) | `6rem`      | `1.5rem`     |
| Galleries grid      | `0`         | `3rem`/`4rem`| `1.5rem`     |
| Footer              | `6rem`      | `4rem`       | `2.5rem`     |
| Header              | `0.5rem`    | `2rem`/`3rem`| `0.5rem`     |

### Gallery Grid

```
boxSpacing: 8px          # Gap between images in justified layout
targetRowHeight: 280px   # Target height for image rows
Grid gap: 2rem × 1.5rem  # Gallery card grid (row × column)
```

**Breakpoints (gallery cards):**
- Mobile: 1 column
- 640px+: 2 columns, 3rem row gap
- 1024px+: 3 columns

## Component Patterns

### Cards (`.card`)

```
Border radius: 1rem
Image aspect ratio: 3/2
Image hover: box-shadow elevation
Inner padding: 1rem
Title: 1.125rem / 600 weight
Meta text: 0.875rem / --text-2
```

### Featured Card (`.featured-card`)

```
Border radius: 1rem
Aspect ratio: 1/1 (mobile) → 16/9 (desktop)
Background: gradient overlay (black 80% → transparent)
Text position: bottom-left
Max width: 1280px
```

### Buttons (`.btn`, `.btn-square`)

```
Height: 3rem
Border radius: 0.5rem
Horizontal padding: 1rem
Font: 1.25rem / 600 weight
Square buttons: 3rem × 3rem
```

### Social Icons (`section.social-icons`)

```
Icon size: 24×24
Gap: 2rem (custom) / 1.5rem (theme default)
Alignment: centered
Color: --text-2 (inherits)
Hover: scale(1.1), opacity 1
```

### Hero Section (`.wolf-hero`)

```
Min height: 45vh
Background: --grain-black (#080808)
Padding: 4rem 1.5rem
Title: clamp(3rem, 8vw, 6rem) / --tungsten / halation text-shadow
Cursor: --kodak-red / 1.2s blink animation
Progressive enhancement: Hugo renders title, JS adds typing animation
```

## Effects & Animations

### Halation Glow (Hero Title)
```css
text-shadow: 0 0 15px rgba(255, 237, 213, 0.6),
             0 0 30px rgba(255, 100, 0, 0.2);
```
Simulates the bloom/halation effect of Kodak Vision3 500T tungsten film.

### Typing Cursor
```css
animation: blink 1.2s step-end infinite;
```
Kodak Red cursor with hard blink (step-end, not ease). Fades out after typing completes.

### Transitions
- **Default hover**: `0.2s ease` for color, transform, opacity
- **Image hover**: `0.3s ease` for transform, box-shadow
- **Card hover**: `scale(1.01-1.03)` subtle zoom
- **Menu toggle**: instant show/hide (CSS class `.hidden`)

### Reduced Motion
Respect `prefers-reduced-motion: reduce`. Disable animations, show static content.

## Icon System

The theme uses **inline SVGs** (24x24, `currentColor` fill). No icon font or sprite sheet.

Current icons in use:
- Menu hamburger (3 lines)
- Close (X)
- Back arrow
- Instagram, GitHub, LinkedIn, Email (in `social-icons.html`)

### Adding New Icons
1. Use simple 24x24 SVG paths
2. Use `fill="currentColor"` so they inherit text color
3. Add `aria-hidden="true"` since they're decorative
4. Wrap in a link with a descriptive `title` attribute
5. Match the existing style: thin strokes, minimal detail

### Recommended Icon Style
- Outlined/line style (not filled/solid)
- Single-color (`currentColor`)
- Consistent 24x24 viewBox
- Sources: [Heroicons](https://heroicons.com) (already used by the theme), [Lucide](https://lucide.dev)

## Do's and Don'ts

### Do
- Use CSS custom properties for all colors
- Use `clamp()` for responsive typography
- Keep animations subtle and purposeful
- Let photographs fill the visual space
- Test both dark and light gallery themes
- Use `rem` for spacing, never `px` (except borders and shadows)

### Don't
- Add gradients, patterns, or textures competing with photography
- Use more than 2 accent colors (Kodak Red + Tungsten is enough)
- Add web fonts (they slow page load for a photography site)
- Override theme variables in wolf.css (keep Kodak vars scoped to hero)
- Use `!important` unless overriding theme defaults that can't be changed otherwise
- Add decorative elements that don't serve navigation or content

## File Reference

| File | What It Controls |
|------|-----------------|
| `assets/css/_colors.scss` | Theme color variables (don't edit) |
| `assets/css/_styles.scss` | Theme component styles (don't edit) |
| `exampleSite/assets/css/custom.css` | Site overrides bundled INTO main.css |
| `exampleSite/assets/css/wolf.css` | Hero section (loaded separately) |
| `exampleSite/assets/js/wolf.js` | Typing animation |
| `exampleSite/config/_default/hugo.toml` | Gallery params, social links, theme |

## Future Considerations

### Consistency Checklist for New Features
When adding any new UI element, verify:
1. Uses existing CSS variables (no raw hex colors)
2. Follows the spacing scale (0.5/1/1.5/2/3/4/6 rem)
3. Typography matches the scale above
4. Hover states use existing transition patterns (0.2-0.3s ease)
5. Works in both dark and light gallery themes
6. Looks correct at mobile (< 640px) and desktop
7. Respects `prefers-reduced-motion`

### Potential Improvements
- Consistent use of `--kodak-red` as the accent across all interactive elements (links, buttons, hover states)
- Unify card border-radius if adding new card types (use `1rem` consistently)
- Consider a subtle scroll indicator on the hero section
- Loading/skeleton states could use `--surface-2` consistently
