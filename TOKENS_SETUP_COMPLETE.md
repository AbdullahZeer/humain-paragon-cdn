# ✅ HUMAIN Custom Tokens Setup Complete!

## What Was Created

### 1. **humain-tokens.css** (3.7 KB)
A dynamically generated CSS file containing **101 custom CSS variables** that override Paragon's default theme with HUMAIN design tokens.

**Location**: `docs/paragon/themes/humain-tokens.css`

**CDN URL**: `https://abdullahzeer.github.io/humain-paragon-cdn/paragon/themes/humain-tokens.css`

### 2. **build-custom-css.js** (Build Script)
A Node.js script that automatically converts your token JSON files into CSS variables.

**How it works**:
```bash
node build-custom-css.js
```

This script:
- Reads all token files from `tokens/src/`
- Flattens the nested token structure
- Generates CSS `:root` variables
- Writes output to `docs/paragon/themes/humain-tokens.css`

### 3. **npm Script** 
Added convenience script to `package.json`:
```bash
npm run build-tokens-custom
```

## Token Categories Generated (101 Total)

### 🎨 **Colors** (30 variables)
- **Aqua palette** (50-950): Primary brand color tones
- **Zinc palette** (50-950): Neutral grayscale
- **Air & Oasis**: Accent colors  
- **Status colors**: Success, warning, error

### 📝 **Typography** (21 variables)
- Font families (body, heading, monospace)
- Font sizes (xs to 3xl)
- Font weights (regular to bold)
- Line heights (tight, snug, normal)

### 📏 **Spacing** (13 variables)
- Spacing scale (0, 1, 2, 3, 4, 6, 8, 12, 16)
- Border radius values
- Shadow definitions
- Responsive breakpoints

### 🎯 **Brand** (5 variables)
- Primary brand color + hover state
- Secondary brand fill
- Highlight color

### 🔤 **Text** (4 variables)
- Heading text color
- Primary, secondary, muted text colors

### 🎪 **Surface** (3 variables)
- Base background
- Elevated surface
- Border color

### 🧩 **Components** (25 variables)
- Button styling (background, text, hover, radius, padding, font-size)
- Card styling (background, border, radius, padding, shadow)
- Form field styling (background, border, text, radius, focus ring)

## How to Use

### Option 1: Direct CDN URLs
```html
<!-- Load in this order -->
<link rel="stylesheet" href="https://abdullahzeer.github.io/humain-paragon-cdn/paragon/themes/core.min.css">
<link rel="stylesheet" href="https://abdullahzeer.github.io/humain-paragon-cdn/paragon/themes/light.min.css">
<link rel="stylesheet" href="https://abdullahzeer.github.io/humain-paragon-cdn/paragon/themes/humain-tokens.css">
```

### Option 2: Using CSS Variables in Your Code
```css
/* Use the custom tokens in your own CSS */
.my-element {
  background-color: var(--pgn-brand-primary-fill);      /* #0b6a7f */
  color: var(--pgn-brand-primary-onFill);               /* #FFFFFF */
  font-family: var(--pgn-typography-font-family-body);  /* 'ABCRepro', sans-serif */
  padding: var(--pgn-component-button-paddingX);        /* 24px */
}

.my-element:hover {
  background-color: var(--pgn-brand-primary-hover);     /* #00D49C */
}
```

## Customizing Tokens

### 1. Edit Token Files
Located in `tokens/src/`:
- `tokens/src/core/colors.json` - Global color palette
- `tokens/src/core/typography.json` - Typography definitions  
- `tokens/src/core/spacing.json` - Spacing and sizing
- `tokens/src/themes/light/colors.json` - Light theme colors
- `tokens/src/themes/light/component.json` - Component styles

### 2. Regenerate CSS
```bash
npm run build-tokens-custom
```

### 3. Commit and Push
```bash
git add docs/paragon/themes/humain-tokens.css
git commit -m "Update HUMAIN design tokens"
git push
```

The CDN updates automatically! 🚀

## File Structure

```
humain-paragon-cdn/
├── docs/
│   └── paragon/
│       └── themes/
│           ├── core.min.css              # Paragon core styles (519 KB)
│           ├── light.min.css             # Paragon light theme (194 KB)
│           └── humain-tokens.css         # ✨ Custom HUMAIN tokens (3.7 KB)
├── tokens/
│   └── src/
│       ├── core/                         # Global tokens
│       │   ├── colors.json               # Color palette
│       │   ├── typography.json           # Typography
│       │   └── spacing.json              # Spacing & sizing
│       └── themes/
│           └── light/                    # Light theme tokens
│               ├── colors.json           # Theme colors
│               └── component.json        # Component styles
├── build-custom-css.js                   # Token generation script
├── README.md                             # Full documentation
└── package.json                          # npm scripts

```

## What Changed from Default Paragon

When you load the files in the correct order:
1. `core.min.css` - Sets up all Paragon components with default styles
2. `light.min.css` - Applies light theme colors (defaults)
3. `humain-tokens.css` - **OVERRIDES** with your HUMAIN brand tokens! ✨

This means:
- ✅ All Paragon components work as expected
- ✅ Colors are now in your HUMAIN brand palette
- ✅ Typography follows HUMAIN design standards
- ✅ Spacing aligns with your design system
- ✅ Components have HUMAIN styling

## Token Values Reference

**Key Brand Colors**:
- Primary Fill: `#0b6a7f` (aqua-700)
- Primary Hover: `#00D49C` (air - accent)
- Secondary Fill: `#cafffd` (aqua-100)
- Highlight: `#D0F94A` (oasis)

**Typography**:
- Body Font: 'ABCRepro', sans-serif
- Heading Font: 'Optician-Sans', sans-serif
- Size Range: 12px (xs) → 40px (3xl)

**Spacing**:
- Scale: 0 → 64px (0, 4, 8, 12, 16, 24, 32, 48, 64)
- Border Radius: 0.25rem → 999rem
- Breakpoints: xs (0) → xxl (1400px)

## Next Steps

1. **Test the CDN**: Add the CSS links to your application
2. **Verify Styling**: Check that Paragon components use HUMAIN colors
3. **Customize Further**: Edit token files as needed
4. **Deploy**: Push changes to update the CDN automatically

## Troubleshooting

**Q: Colors aren't changing?**
A: Make sure you load `humain-tokens.css` AFTER the other Paragon CSS files.

**Q: Need to change token values?**
A: Edit the JSON files in `tokens/src/`, then run `npm run build-tokens-custom`.

**Q: CDN not updated?**
A: GitHub Pages may take 1-5 minutes to propagate changes. Hard refresh your browser (Ctrl+Shift+R).

---

**Status**: ✅ Live and ready to use!  
**Last Generated**: November 2, 2025  
**Total Variables**: 101 CSS custom properties
