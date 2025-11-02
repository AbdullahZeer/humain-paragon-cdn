# HUMAIN Paragon CDN

This repository hosts Paragon CSS files for HUMAIN Open edX theme.

## 📦 Files

- `dist/paragon/themes/core.min.css` - Paragon core styles (507 KB)
- `dist/paragon/themes/light.min.css` - Paragon light theme (190 KB)

## 🚀 Usage

Add the following link tags to your HTML `<head>`:

```html
<!-- Paragon Core Styles -->
<link rel="stylesheet" href="https://abdullahzeer.github.io/humain-paragon-cdn/paragon/themes/core.min.css">

<!-- Paragon Light Theme -->
<link rel="stylesheet" href="https://abdullahzeer.github.io/humain-paragon-cdn/paragon/themes/light.min.css">

<!-- HUMAIN Design Tokens Override (loads your custom brand colors!) -->
<link rel="stylesheet" href="https://abdullahzeer.github.io/humain-paragon-cdn/paragon/themes/humain-tokens.css">
```

**Important:** Load `humain-tokens.css` AFTER the Paragon CSS files so your custom tokens override the defaults.

### Example
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <!-- Load in this order -->
  <link rel="stylesheet" href="https://abdullahzeer.github.io/humain-paragon-cdn/paragon/themes/core.min.css">
  <link rel="stylesheet" href="https://abdullahzeer.github.io/humain-paragon-cdn/paragon/themes/light.min.css">
  <link rel="stylesheet" href="https://abdullahzeer.github.io/humain-paragon-cdn/paragon/themes/humain-tokens.css">
</head>
<body>
  <!-- Your components will now use HUMAIN brand colors -->
  <button class="btn btn-primary">Click Me</button>
  <div class="card">Card with HUMAIN styling</div>
</body>
</html>
```

## Available Files

- **core.min.css** - Core Paragon styles (519 KB)
- **light.min.css** - Light theme styles (194 KB)  
- **humain-tokens.css** - HUMAIN design tokens override (CSS variables)

## Design Tokens

Your HUMAIN design tokens are organized into these categories:

### Colors
- **Aqua** - Primary brand palette (#0b6a7f to #eafffe)
- **Zinc** - Neutral palette (#09090b to #fafafa)
- **Air** - Accent #00D49C
- **Oasis** - Highlight #D0F94A
- **Status** - Success, Warning, Error colors

### Typography
- **Font Families** - ABCRepro (body), Optician-Sans (heading), monospace
- **Font Sizes** - xs (12px) to 3xl (40px)
- **Font Weights** - regular (400) to bold (700)

### Spacing
- **Scale** - 0px to 64px in logical increments
- **Radius** - 0.25rem to 999rem
- **Shadows** - sm and md variants

## Customization

To update your design tokens:

1. Edit token files in `tokens/src/`
2. Update `humain-tokens.css` with new values
3. Commit and push changes
4. Your CDN updates automatically

## GitHub Pages Configuration

This CDN is hosted on GitHub Pages. To view settings:
- Repository: https://github.com/AbdullahZeer/humain-paragon-cdn
- Pages Settings: Settings → Pages
- Branch: main
- Folder: /docs

## Version Information

- Paragon Version: v23.0.0 (CSS only)
- HUMAIN Design Tokens: 1.0.0
- Last Updated: November 2, 2025

## 📝 License

These CSS files are from the Open edX Paragon component library.
Refer to https://github.com/openedx/paragon for more information.
