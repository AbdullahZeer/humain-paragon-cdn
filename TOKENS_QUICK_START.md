# Quick Start: HUMAIN Design Tokens Integration

## What You Have

✅ `Design Tokens/humain-tokens.json` - Your design token definitions  
✅ `docs/paragon/themes/core.min.css` & `light.min.css` - Compiled Paragon CSS  
✅ GitHub Pages CDN ready to serve files

## What You Need to Do

### 1. **Split Your Tokens Into Structure** (✅ Done - See files created)

Your monolithic `humain-tokens.json` needs to be split into Paragon-compatible structure:

```
tokens/src/
├── core/
│   ├── colors.json       # Global color palette
│   ├── typography.json   # Font properties
│   └── spacing.json      # Spacing, radius, shadows
└── themes/light/
    ├── colors.json       # Light theme semantic colors
    └── component.json    # Component styling
```

**Why?** Paragon expects separate files for core (shared) vs theme-specific (overrides).

### 2. **Format Your Tokens Correctly**

Each token file must follow the DTCG format:

```json
{
  "$schema": "https://design-tokens.github.io/community-group/format/module.v1.json",
  "category": {
    "item": {
      "$type": "color",
      "$value": "#ffffff"
    }
  }
}
```

**Key Rules:**
- Always include `$schema` at top
- Use `$value` for actual values
- Use `$type` for data type (color, dimension, shadow, etc.)
- Use `{path.to.token}` to reference other tokens

### 3. **Install Paragon CLI**

```bash
npm install
```

This installs `@openedx/paragon` which provides the build tools.

### 4. **Build Your Tokens → CSS Variables**

```bash
npm run build-tokens
```

**What this does:**
- Reads your token files from `tokens/src/`
- Converts them to CSS custom properties (variables)
- Outputs to `build/tokens/` directory

**Result:**
```css
:root {
  --pgn-color-aqua-50: #eafffe;
  --pgn-color-brand-primary-fill: #0b6a7f;
  --pgn-typography-font-family-body: 'ABCRepro', sans-serif;
}
```

### 5. **Build CSS Files**

```bash
npm run build-scss
```

**What this does:**
- Takes the generated CSS variables
- Merges them with Paragon's SCSS
- Generates final CSS files

**Output:**
```
dist/
├── core.css + core.min.css
├── light.css + light.min.css
└── theme-urls.json
```

### 6. **Deploy to GitHub Pages**

Copy `dist/` files to your CDN:

```bash
cp dist/* docs/paragon/themes/
```

Update your CDN URLs in applications:

```html
<link rel="stylesheet" href="https://abdullahzeer.github.io/humain-paragon-cdn/paragon/themes/core.min.css">
<link rel="stylesheet" href="https://abdullahzeer.github.io/humain-paragon-cdn/paragon/themes/light.min.css">
```

## Token Structure Cheat Sheet

### Global Colors (Core)
```json
// tokens/src/core/colors.json
{
  "color": {
    "aqua": {
      "50": { "$value": "#eafffe" },
      "100": { "$value": "#cafffd" }
    }
  }
}
```

### Semantic Colors (Theme-Specific)
```json
// tokens/src/themes/light/colors.json
{
  "color": {
    "brand": {
      "primary": {
        "fill": { "$value": "#0b6a7f" },
        "hover": { "$value": "#00D49C" }
      }
    },
    "text": {
      "primary": { "$value": "{color.zinc.900}" }  // Reference to core token
    }
  }
}
```

### Component Styling (Theme-Specific)
```json
// tokens/src/themes/light/component.json
{
  "component": {
    "button": {
      "primary": {
        "background": { "$value": "{color.brand.primary.fill}" },
        "text": { "$value": "{color.brand.primary.onFill}" }
      }
    }
  }
}
```

## Token Naming Convention

```
category.item.subitem.type.state
```

Examples:
- `color.brand.primary.fill` → Brand primary fill color
- `color.text.primary` → Primary text color
- `typography.font.family.body` → Body font family
- `spacing.4` → 16px spacing unit
- `component.button.primary.background` → Button primary background

## One-Command Workflow

```bash
# Install dependencies
npm install

# Build everything
npm run build

# Done! Files are in dist/
```

## Common Mistakes to Avoid

❌ **Missing `$value` key**
```json
{ "color": "#fff" }  // Wrong!
{ "$value": "#fff" } // Correct!
```

❌ **Typos in references**
```json
{ "$value": "{color.primary}" }      // Wrong - doesn't exist
{ "$value": "{color.brand.primary.fill}" } // Correct
```

❌ **Missing `$schema`**
```json
{}  // Will fail
{
  "$schema": "https://design-tokens.github.io/community-group/format/module.v1.json"
}  // Good!
```

❌ **Mixing paths** - Core tokens shouldn't reference theme tokens:
```json
// ❌ In tokens/src/core/colors.json
{ "$value": "{color.text.primary}" }  // Don't! text.primary is in light/colors.json

// ✅ In tokens/src/themes/light/colors.json
{ "$value": "{color.zinc.900}" }  // OK! zinc is in core/colors.json
```

## Testing Your Tokens

After building, check:

1. **Files exist:**
   ```bash
   ls build/tokens/          # Should have files
   ls dist/                  # Should have .css files
   ```

2. **CSS has variables:**
   ```bash
   grep "pgn-color" dist/core.min.css  # Should show CSS variables
   ```

3. **No errors during build:**
   ```bash
   npm run build 2>&1  # Watch for errors
   ```

## Updating Tokens Later

1. Edit token file in `tokens/src/`
2. Run `npm run build`
3. Update CDN files: `cp dist/* docs/paragon/themes/`
4. Push to GitHub

That's it! Your applications using the CDN URL will automatically get the new tokens.

## Need Help?

- Check `TOKENS_INTEGRATION_GUIDE.md` for detailed explanations
- Review token files we created as examples
- Read [Paragon docs](https://github.com/openedx/paragon/tree/v23.0.0/tokens)
