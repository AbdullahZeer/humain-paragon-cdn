## HUMAIN Paragon CDN

A Content Delivery Network (CDN) for serving **Open edX Paragon** component library CSS files with integrated **HUMAIN custom design tokens**.

### Files Available

- **`core.min.css`** - Paragon core component styles (v23.0.0)
- **`light.min.css`** - Paragon light theme (v23.0.0)
- **`humain-tokens.css`** - HUMAIN custom design tokens (colors, typography, spacing, components)

### Usage

To use Paragon with HUMAIN custom tokens in your application, load the CSS files in this order:

```html
<!-- 1. Paragon Core Styles (required) -->
<link rel="stylesheet" href="https://abdullahzeer.github.io/humain-paragon-cdn/paragon/themes/core.min.css">

<!-- 2. Paragon Light Theme (required) -->
<link rel="stylesheet" href="https://abdullahzeer.github.io/humain-paragon-cdn/paragon/themes/light.min.css">

<!-- 3. HUMAIN Custom Tokens (overrides Paragon defaults with brand colors!) -->
<link rel="stylesheet" href="https://abdullahzeer.github.io/humain-paragon-cdn/paragon/themes/humain-tokens.css">
```

> **Important**: Load `humain-tokens.css` AFTER Paragon's CSS files so it can override the default theme with your custom brand colors and typography.

### Custom Tokens Included

#### Brand Colors
- `--pgn-brand-primary-fill` - Primary brand color (#0b6a7f - aqua-700)
- `--pgn-brand-primary-onFill` - Text color on primary (#FFFFFF)
- `--pgn-brand-primary-hover` - Hover state (#00D49C - air-flat)
- `--pgn-brand-secondary-fill` - Secondary brand color
- `--pgn-brand-highlight-fill` - Highlight color (#D0F94A - oasis)

#### Typography
- `--pgn-typography-font-family-body` - 'ABCRepro', sans-serif
- `--pgn-typography-font-family-heading` - 'Optician-Sans', sans-serif
- `--pgn-typography-font-size-*` - Font sizes (xs to 3xl)
- `--pgn-typography-font-weight-*` - Font weights (regular to bold)

#### Spacing & Layout
- `--pgn-spacing-*` - Spacing scale (0, 1, 2, 3, 4, 6, 8, 12, 16)
- `--pgn-radius-*` - Border radius values
- `--pgn-size-breakpoint-*` - Responsive breakpoints

#### Component Styles
- `--pgn-component-button-*` - Button styling
- `--pgn-component-card-*` - Card styling
- `--pgn-component-field-*` - Form field styling

#### Text & Surface
- `--pgn-text-heading` - Heading text color
- `--pgn-text-primary` - Primary text color
- `--pgn-text-secondary` - Secondary text color
- `--pgn-surface-base` - Base background color
- `--pgn-surface-elevated` - Elevated surface color

### Token Customization

To customize the design tokens:

1. Edit the token files in `tokens/src/`:
   - `tokens/src/core/colors.json` - Global color palette
   - `tokens/src/core/typography.json` - Typography definitions
   - `tokens/src/core/spacing.json` - Spacing and sizing
   - `tokens/src/themes/light/colors.json` - Light theme color mappings
   - `tokens/src/themes/light/component.json` - Component-specific styles

2. Regenerate the CSS file:
```bash
node build-custom-css.js
```

3. Commit and push the changes to update the CDN

### Version Information

- **Paragon Version**: 23.0.0
- **Source CDN**: https://cdn.jsdelivr.net/npm/@openedx/paragon@23.0.0/
- **GitHub Pages**: Enabled and serving from root directory

### Setup Instructions

1. Clone this repository
2. Create the directory structure: `docs/paragon/themes/`
3. Place `core.min.css` and `light.min.css` in the themes directory
4. Run `node build-custom-css.js` to generate `humain-tokens.css`
5. Configure GitHub Pages to serve from the `docs/` directory
6. Access files at: `https://[your-username].github.io/humain-paragon-cdn/`

### CDN URLs

```
https://abdullahzeer.github.io/humain-paragon-cdn/paragon/themes/core.min.css
https://abdullahzeer.github.io/humain-paragon-cdn/paragon/themes/light.min.css
https://abdullahzeer.github.io/humain-paragon-cdn/paragon/themes/humain-tokens.css
```

### License

Paragon CSS files are from [Open edX](https://github.com/edx/frontend-components/tree/master/packages/paragon) under the AGPL-3.0 license.
