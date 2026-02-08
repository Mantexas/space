# Mantas Zdancius Photography Portfolio

A personal photography portfolio website showcasing my work in fashion & beauty, nature, and creative photography.

**Live Site:** [View Portfolio](https://mantexas.github.io/space/)

## About

I make hard things look easy. Technical depth meets human understanding.

This portfolio features curated collections of my photography work, built with Hugo and the Gallery theme for a fast, responsive, and visually stunning experience.

## Current Collections

- **Portfolio** (6 images) - A curated selection of my finest work (featured on homepage)
- **Fashion & Beauty** (17 images) - Elegant portraits and editorial photography
- **Running** (23 images) - Action and motion photography
- **Nature** (27 images) - Capturing the raw beauty of the natural world

## How It Works

### Project Structure

```
space/
├── exampleSite/              # Your website content
│   ├── content/              # Gallery folders go here
│   │   ├── _index.md         # Homepage settings
│   │   ├── about.md          # About page
│   │   ├── portfolio/        # Gallery folder
│   │   │   ├── index.md      # Gallery settings
│   │   │   └── *.jpeg        # Your images
│   │   ├── fashion-beauty/
│   │   ├── Running/
│   │   └── nature/
│   ├── config/_default/
│   │   └── hugo.toml         # Site configuration
│   ├── assets/
│   │   ├── css/
│   │   │   ├── custom.css    # Site overrides (bundled into main.css)
│   │   │   └── wolf.css      # Kodak Vision3 500T hero styles
│   │   └── js/
│   │       └── wolf.js       # Typing animation
│   └── layouts/
│       ├── _default/home.html        # Homepage (adds hero)
│       └── partials/
│           ├── wolf-hero.html        # Hero template
│           └── head-custom.html      # Loads wolf CSS/JS
├── layouts/                  # Theme templates (don't edit for site changes)
├── assets/                   # Theme CSS/JS (don't edit for site changes)
└── .github/workflows/        # Auto-deployment
```

### Adding a New Gallery

1. **Create a folder** in `exampleSite/content/` with your gallery name:
   ```
   exampleSite/content/my-new-gallery/
   ```

2. **Add an `index.md`** file with this content:
   ```yaml
   ---
   title: My New Gallery
   description: A brief description of this gallery
   weight: 4
   menus: "main"
   params:
     theme: dark
   resources:
     - src: my-cover-image.jpeg
       params:
         cover: true
   ---
   ```

3. **Add your images** (JPEG recommended) to the folder

4. **Commit and push** - the site rebuilds automatically

### Gallery Settings

| Setting | Description |
|---------|-------------|
| `title` | Gallery name shown on site |
| `description` | Brief description shown under title |
| `weight` | Order in menu (lower = first) |
| `menus: "main"` | Show in navigation menu |
| `params.theme` | `dark` or `light` background |
| `params.featured` | `true` to show large on homepage |
| `params.private` | `true` to hide from listings/RSS |

### Image Settings

In the `resources` section of `index.md`:

```yaml
resources:
  - src: image-name.jpeg
    title: Optional caption
    params:
      cover: true      # Use as gallery thumbnail
      hidden: true     # Hide from gallery (use for cover only)
      date: 2024-01-01 # Custom date
```

### Video Support

The gallery supports HEVC (H.265) and other video formats. Simply add video files to your gallery folder:

**Supported formats:**
- `.mov` (HEVC/H.265 - best for Safari/macOS)
- `.mp4` (H.264/HEVC)
- `.webm` (VP9)

**Adding videos:**
1. Add video files to your gallery folder alongside images
2. (Optional) Add a poster image with the same name: `video.mov` + `video.jpg`
3. Videos appear in the gallery with a play icon overlay
4. Click to open in lightbox with full playback controls

**Video settings in `index.md`:**
```yaml
resources:
  - src: my-video.mov
    title: Video title
    params:
      poster: custom-poster.jpg  # Optional custom poster
      width: 1920                # Video width (for aspect ratio)
      height: 1080               # Video height
      hidden: true               # Hide from gallery if needed
```

**HEVC Notes:**
- HEVC is natively supported in Safari, Edge (Windows with HEVC extension)
- For broader compatibility, consider also providing H.264 versions
- Large video files will increase page load times

## Deployment

The site automatically deploys to GitHub Pages when you push to `main`:

1. GitHub Actions runs Hugo build
2. Generates optimized static site
3. Deploys to https://mantexas.github.io/space/

**Workflow file:** `.github/workflows/deploy.yml`

## Local Development

### Prerequisites
- [Hugo Extended](https://gohugo.io/installation/) >= 0.123.0
- Go >= 1.20

### Running Locally

```bash
# Navigate to the site
cd exampleSite

# Start development server
hugo server

# View at http://localhost:1313/space/
```

### Building for Production

```bash
cd exampleSite
hugo --gc --minify
# Output in exampleSite/public/
```

## Customization

### Site Configuration

Edit `exampleSite/config/_default/hugo.toml`:

```toml
title = "Your Name"
copyright = "© Your Name"

[params]
    defaultTheme = "dark"  # or "light"
    description = "Your tagline"

[params.socialIcons]
    instagram = "https://instagram.com/yourhandle"
    github = "https://github.com/yourusername"
```

### Custom Styling

Edit `exampleSite/assets/css/custom.css` to add your own styles.

### Gallery Layout

Adjust in `hugo.toml`:

```toml
[params.gallery]
    boxSpacing = 8           # Gap between images
    targetRowHeight = 280    # Row height in pixels
```

## Homepage Hero

The homepage features a **Kodak Vision3 500T** inspired hero section with a typing animation:

- **Warm tungsten text** (`#FFEDD5`) with halation glow on grain-black (`#080808`) background
- **Typing animation** types "Mantas Zdancius" with a Kodak Red (`#E30613`) blinking cursor
- **Progressive enhancement**: Hugo renders the title server-side; JavaScript adds the typing effect
- **Files**: `wolf-hero.html` (template), `wolf.css` (styles), `wolf.js` (animation)

## Design System

See [`DESIGN.md`](DESIGN.md) for the full UI/UX design guide covering colors, typography, spacing, components, and consistency rules.

## Development Guide

See [`CLAUDE.md`](CLAUDE.md) for architecture details, the asset merge system, CSS selector reference, and development rules.

## Technical Details

- **Framework:** [Hugo](https://gohugo.io/) (Static Site Generator)
- **Theme:** [Hugo Gallery Theme](https://github.com/nicokaiser/hugo-theme-gallery) v4
- **Features:**
  - Responsive justified gallery layout (Flickr-style)
  - PhotoSwipe lightbox for full-screen viewing
  - Dark/light theme support per gallery
  - Automatic image optimization (thumbnails, responsive sizes)
  - Lazy loading for fast page loads
  - SEO optimized with Open Graph tags
  - RSS feed support
  - 11 languages supported

## Contact

- **Email:** [mantas.zdancius@me.com](mailto:mantas.zdancius@me.com)
- **Instagram:** [@mantas.tv](https://www.instagram.com/mantas.tv)
- **GitHub:** [Mantexas](https://github.com/Mantexas)
- **LinkedIn:** [finetune](https://www.linkedin.com/in/finetune)

## License

This portfolio website and its content are personal work by Mantas Zdancius.
The underlying Hugo Gallery Theme is MIT licensed.
