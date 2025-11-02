# HUMAIN Paragon Design Tokens Integration Guide

## Overview

This document explains how to properly structure and integrate HUMAIN design tokens with Paragon v23.0.0 CSS files without breaking the existing theme.

## Directory Structure

```
humain-paragon-cdn/
├── package.json                          # Build scripts and dependencies
├── README.md                             # Main documentation
├── docs/
│   └── paragon/themes/
│       ├── core.min.css                  # Compiled core styles
│       └── light.min.css                 # Compiled light theme
├── tokens/
│   └── src/
│       ├── core/                         # Core (theme-agnostic) tokens
│       │   ├── colors.json              # Global color palette
│       │   ├── typography.json          # Font families, sizes, weights
│       │   └── spacing.json             # Spacing, radius, shadows
│       └── themes/
│           └── light/
│               ├── colors.json          # Light theme semantic colors
│               └── component.json       # Light theme component tokens
├── build/                               # Generated during build
│   └── tokens/                          # Compiled token outputs
├── paragon/
│   └── core.scss                        # Core SCSS file (optional)
└── TOKENS_INTEGRATION_GUIDE.md          # This file
```

## Token Organization

### Core Tokens (`tokens/src/core/`)

Core tokens are **theme-agnostic** and represent fundamental design values:

- **colors.json**: Global color palette (aqua, air, oasis, zinc, status)
- **typography.json**: Font families, sizes, weights, and line heights
- **spacing.json**: Spacing scale, border radius, shadows

**Example Structure:**
```json
{
  "$schema": "https://design-tokens.github.io/community-group/format/module.v1.json",
  "color": {
    "$type": "color",
    "aqua": {
      "50": { "$value": "#eafffe" },
      "100": { "$value": "#cafffd" }
    }
  }
}
```

### Theme Tokens (`tokens/src/themes/light/`)

Theme tokens are **semantic** and override core values based on the theme mode:

- **colors.json**: Semantic colors (brand, surface, text) with theme variations
- **component.json**: Component-specific styling rules

**Key Pattern:**
- Use **references** to core tokens: `"{color.zinc.50}"`
- Override with theme-specific values when needed
- Organize by semantic meaning (brand, surface, text), not usage

**Example:**
```json
{
  "color": {
    "surface": {
      "base": { "$value": "{color.zinc.50}" },      // References core token
      "elevated": { "$value": "#ffffff" }            // Direct override
    }
  }
}
```

## Token Naming Convention

Follow Paragon's semantic naming structure:

### Structure: `category > item > subitem > type > state`

**Categories:**
- `color` - All color-related tokens
- `typography` - Font-related properties
- `spacing` - Padding, margin, gaps
- `radius` - Border radius values
- `shadow` - Box shadow values

**Example Paths:**
```
color.brand.primary.fill              # Brand primary fill color
color.text.primary                    # Primary text color
color.surface.border                  # Surface border color
typography.font.family.heading        # Heading font family
typography.font.size.lg               # Large font size
component.button.primary.background   # Button primary background
```

## Token Types

Always specify `$type` to help the build system process tokens correctly:

| Type | Usage | Example |
|------|-------|---------|
| `color` | Color values | `{ "$type": "color", "$value": "#0b6a7f" }` |
| `dimension` | Sizes, spacing, radius | `{ "$type": "dimension", "$value": "16px" }` |
| `shadow` | Box shadows | `{ "$type": "shadow", "$value": "0 1px 2px ..." }` |
| `fontFamily` | Font names | `{ "$type": "fontFamily", "$value": "'ABCRepro'" }` |
| `fontWeight` | Font weights | `{ "$type": "fontWeight", "$value": "600" }` |

## Build Process

### Step 1: Install Dependencies

```bash
npm install
# or
npm ci
```

### Step 2: Build Tokens

Converts token files to CSS custom properties (variables):

```bash
npm run build-tokens
```

**Output:**
- Generates CSS variable files in `./build/tokens/`
- Creates separate output for each theme (core, light)

### Step 3: Build SCSS

Compiles SCSS with the generated tokens into final CSS:

```bash
npm run build-scss
```

**Output:**
- `dist/core.css` + `dist/core.min.css`
- `dist/light.css` + `dist/light.min.css`
- `dist/theme-urls.json` (URLs for CDN reference)

### Step 4: Deploy

The compiled CSS files are ready for deployment:

```bash
npm run build  # Runs both build-tokens and build-scss
```

## Integration with Paragon

### Without Breaking the Theme

✅ **DO:**
- Override specific tokens (colors, spacing, typography)
- Reference existing Paragon tokens
- Use semantic naming
- Test with both core and light themes

❌ **DON'T:**
- Delete core tokens
- Change token structure mid-project
- Use non-semantic token names
- Modify Paragon's component styles directly

### CSS Variable Usage

Once built, your tokens become CSS variables:

```css
/* Available as CSS custom properties */
:root {
  --pgn-color-brand-primary-fill: #0b6a7f;
  --pgn-typography-font-family-body: 'ABCRepro', sans-serif;
  --pgn-spacing-4: 16px;
}
```

### Using in HTML/Components

```html
<!-- In your HTML -->
<link rel="stylesheet" href="https://abdullahzeer.github.io/humain-paragon-cdn/paragon/themes/core.min.css">
<link rel="stylesheet" href="https://abdullahzeer.github.io/humain-paragon-cdn/paragon/themes/light.min.css">

<!-- Components automatically use your tokens -->
<button class="btn btn-primary">Click me</button>
```

## Common Customization Patterns

### 1. Override Brand Colors

**File:** `tokens/src/themes/light/colors.json`

```json
{
  "color": {
    "brand": {
      "primary": {
        "fill": { "$value": "#your-brand-color" },
        "onFill": { "$value": "#contrast-color" }
      }
    }
  }
}
```

### 2. Adjust Typography

**File:** `tokens/src/core/typography.json`

```json
{
  "typography": {
    "font": {
      "family": {
        "body": { "$value": "'Your Font', sans-serif" }
      },
      "size": {
        "md": { "$value": "17px" }
      }
    }
  }
}
```

### 3. Modify Spacing Scale

**File:** `tokens/src/core/spacing.json`

```json
{
  "spacing": {
    "$type": "dimension",
    "4": { "$value": "18px" }
  }
}
```

### 4. Update Component Styles

**File:** `tokens/src/themes/light/component.json`

```json
{
  "component": {
    "button": {
      "radius": { "$value": "{radius.md}" },
      "paddingY": { "$value": "{spacing.4}" }
    }
  }
}
```

## Validation Checklist

Before building, ensure:

- ✅ All token files have `$schema` property
- ✅ Token values use `$value` key
- ✅ Token types include `$type` where needed
- ✅ References use correct path format: `"{category.item.subitem}"`
- ✅ No circular references (token A → B → A)
- ✅ All category/item paths are consistent across files
- ✅ JSON is valid (no syntax errors)

## Troubleshooting

### Build Fails with "Token not found"

**Cause:** Reference path doesn't match token definition

**Solution:** Check exact path spelling in token files:
```bash
# ❌ Wrong
"value": "{color.primary.fill}"

# ✅ Correct
"value": "{color.brand.primary.fill}"
```

### CSS Variables Not Appearing

**Cause:** Build script didn't run or output path incorrect

**Solution:**
```bash
npm run build-tokens
npm run build-scss
# Check ./build/tokens/ and dist/ directories exist
```

### Theme Looks Broken After Build

**Cause:** Removed or renamed core tokens

**Solution:** 
- Keep all core tokens from original structure
- Only add or override, don't remove
- Test both themes: `core` and `light`

## Additional Resources

- [Paragon Design Tokens Documentation](https://github.com/openedx/paragon/tree/v23.0.0/tokens)
- [Design Tokens Community Group](https://design-tokens.github.io/community-group/)
- [Style Dictionary Documentation](https://styledictionary.com/)
- [Paragon CLI Help](./docs/PARAGON_CLI.md)

## Next Steps

1. ✅ Review the directory structure above
2. ✅ Understand token organization (core vs theme)
3. ✅ Check your token files for proper formatting
4. ✅ Run `npm run build` to generate CSS
5. ✅ Deploy compiled CSS to your CDN
6. ✅ Update your applications to use the new CSS URLs
