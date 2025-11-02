# Design Tokens Structure Reference

## Before (What You Have) vs After (What You Need)

### ❌ Before: Single Monolithic File

```
Design Tokens/
└── humain-tokens.json
    ├── global (all colors, typography, spacing)
    ├── semantic (brand, component, modes)
    └── modes (light, dark theme overrides)
    
Problem: Not structured for Paragon's build system
```

### ✅ After: Paragon-Compatible Structure

```
tokens/
└── src/
    ├── core/                          # Shared across all themes
    │   ├── colors.json               # Global color palette
    │   ├── typography.json           # Font families, sizes, weights
    │   └── spacing.json              # Spacing, radius, shadows
    │
    └── themes/
        └── light/                     # Light theme overrides
            ├── colors.json           # Semantic colors for light
            └── component.json        # Component styling for light
```

## Token Hierarchy & References

### Core Tokens (Theme-Agnostic)

**File: `tokens/src/core/colors.json`**

```json
{
  "color": {
    "aqua": {              // Brand palette
      "50": "#eafffe",     // Lightest
      "100": "#cafffd",
      "500": "#00d5ea",    // Mid
      "800": "#0b6a7f",    // Dark
      "950": "#023b4a"     // Darkest
    },
    "zinc": {              // Neutral palette
      "50": "#fafafa",     // Light
      "900": "#18181b",    // Dark
      "950": "#09090b"     // Very dark
    },
    "status": {
      "success": "#16a34a",
      "warning": "#d97706",
      "error": "#dc2626"
    }
  }
}
```

**Result: CSS Variables**
```css
--pgn-color-aqua-50: #eafffe;
--pgn-color-aqua-800: #0b6a7f;
--pgn-color-zinc-50: #fafafa;
--pgn-color-zinc-900: #18181b;
--pgn-color-status-success: #16a34a;
```

### Semantic Tokens (Theme-Specific)

**File: `tokens/src/themes/light/colors.json`**

```json
{
  "color": {
    "brand": {
      "primary": {
        "fill": "#0b6a7f",           // Direct value
        "onFill": "#FFFFFF",
        "hover": "#00D49C",
        "onHover": "#18181B"
      },
      "highlight": {
        "fill": "#D0F94A",
        "text": "#18181B"
      }
    },
    
    "surface": {
      "base": "{color.zinc.50}",      // Reference to core
      "elevated": "#ffffff",           // Direct value
      "border": "{color.zinc.200}"    // Reference to core
    },
    
    "text": {
      "heading": "{color.zinc.950}",   // Reference to core
      "primary": "{color.zinc.900}",
      "secondary": "{color.zinc.600}",
      "muted": "{color.zinc.400}"
    }
  }
}
```

**Result: CSS Variables**
```css
--pgn-color-brand-primary-fill: #0b6a7f;
--pgn-color-brand-primary-hover: #00D49C;
--pgn-color-surface-base: #fafafa;      /* Resolved from color.zinc.50 */
--pgn-color-surface-elevated: #ffffff;
--pgn-color-surface-border: #e4e4e7;    /* Resolved from color.zinc.200 */
--pgn-color-text-primary: #18181b;      /* Resolved from color.zinc.900 */
```

### Component Tokens (Theme-Specific Styling)

**File: `tokens/src/themes/light/component.json`**

```json
{
  "component": {
    "button": {
      "primary": {
        "background": "{color.brand.primary.fill}",
        "text": "{color.brand.primary.onFill}",
        "hover": {
          "background": "{color.brand.primary.hover}",
          "text": "{color.brand.primary.onHover}"
        }
      },
      "radius": "{radius.full}",
      "paddingY": "{spacing.3}",
      "paddingX": "{spacing.6}",
      "fontSize": "{typography.font.size.sm}"
    },
    
    "card": {
      "background": "{color.surface.elevated}",
      "border": "{color.surface.border}",
      "radius": "{radius.lg}",
      "padding": "{spacing.6}",
      "shadow": "{shadow.sm}"
    }
  }
}
```

**Result: CSS Variables**
```css
--pgn-component-button-primary-background: #0b6a7f;
--pgn-component-button-primary-text: #FFFFFF;
--pgn-component-button-primary-hover-background: #00D49C;
--pgn-component-button-radius: 999rem;
--pgn-component-button-paddingY: 12px;
--pgn-component-button-paddingX: 24px;
--pgn-component-card-background: #ffffff;
```

## Data Flow: From JSON Tokens to CSS

```
1. Token Definition (JSON)
   ↓
   {
     "color": {
       "brand": {
         "primary": {
           "fill": { "$value": "#0b6a7f" }
         }
       }
     }
   }

2. Build with Paragon CLI
   ↓
   npm run build-tokens

3. Generated CSS Variables
   ↓
   --pgn-color-brand-primary-fill: #0b6a7f;

4. Used in Components
   ↓
   button {
     background-color: var(--pgn-color-brand-primary-fill);
   }

5. Final Output
   ↓
   <button style="background-color: #0b6a7f;">Click me</button>
```

## Reference Path Patterns

### Core Tokens Reference Format

```
{category}.{item}.{subitem}

Examples:
- {color.aqua.50}                       → #eafffe
- {color.zinc.900}                      → #18181b
- {color.status.success}                → #16a34a
- {typography.font.family.body}         → 'ABCRepro', sans-serif
- {typography.font.size.md}             → 16px
- {spacing.4}                           → 16px
- {radius.full}                         → 999rem
- {shadow.sm}                           → 0 1px 2px 0 rgba(0,0,0,0.05)
```

### Semantic Tokens Reference Format

```
{category}.{semantic-name}.{variant}.{property}

Examples:
- {color.brand.primary.fill}            → #0b6a7f
- {color.surface.base}                  → #fafafa
- {color.text.primary}                  → #18181b
- {component.button.radius}             → 999rem
- {component.card.shadow}               → 0 1px 2px 0 rgba(0,0,0,0.05)
```

## File Organization Rules

### ✅ CORE Files (`tokens/src/core/`)

- **What:** Theme-independent values
- **Who uses:** All themes
- **Examples:** Colors (palettes), typography (fonts), spacing scale
- **Can reference:** Other core tokens only

```json
// ✅ OK - References other core tokens
"base": { "$value": "{color.zinc.50}" }

// ❌ NOT OK - References theme-specific token
"text": { "$value": "{color.text.primary}" }  // This is in light/colors.json!
```

### ✅ THEME FILES (`tokens/src/themes/light/`)

- **What:** Theme-specific semantic mappings
- **Who uses:** Only this theme (light)
- **Examples:** Brand colors, surface colors, component styles
- **Can reference:** Core tokens + same theme tokens

```json
// ✅ OK - References core and semantic tokens
"primary": { "$value": "{color.brand.primary.fill}" },
"secondary": { "$value": "{color.zinc.100}" }

// ❌ NOT OK - Circular reference
"fill": { "$value": "{color.brand.primary.onFill}" },
"onFill": { "$value": "{color.brand.primary.fill}" }
```

## Common Naming Patterns

### Color Patterns
```
color.{palette}.{shade}
  → color.aqua.50, color.zinc.900

color.{semantic}.{variant}.{property}
  → color.brand.primary.fill
  → color.surface.elevated
  → color.text.secondary
```

### Typography Patterns
```
typography.font.{category}.{variant}
  → typography.font.family.body
  → typography.font.size.lg
  → typography.font.weight.bold
  → typography.font.lineHeight.normal
```

### Spacing Patterns
```
spacing.{scale}
  → spacing.1, spacing.4, spacing.8

radius.{variant}
  → radius.sm, radius.full

shadow.{intensity}
  → shadow.sm, shadow.md
```

### Component Patterns
```
component.{component-name}.{state}.{property}
  → component.button.primary.background
  → component.card.padding
  → component.field.focusRing
```

## How to Extend

### Adding a New Core Color

1. **File:** `tokens/src/core/colors.json`

```json
{
  "color": {
    "newBrand": {
      "50": { "$value": "#f0f9ff" },
      "500": { "$value": "#0c63e4" },
      "900": { "$value": "#0c2d57" }
    }
  }
}
```

2. **Use in theme:** `tokens/src/themes/light/colors.json`

```json
{
  "color": {
    "accent": {
      "fill": { "$value": "{color.newBrand.500}" }
    }
  }
}
```

### Adding a New Component Token

1. **File:** `tokens/src/themes/light/component.json`

```json
{
  "component": {
    "badge": {
      "background": { "$value": "{color.brand.highlight.fill}" },
      "text": { "$value": "{color.brand.highlight.text}" },
      "padding": { "$value": "{spacing.2}" },
      "radius": { "$value": "{radius.full}" }
    }
  }
}
```

2. **Result:** New CSS variables available

```css
--pgn-component-badge-background: #D0F94A;
--pgn-component-badge-text: #18181B;
--pgn-component-badge-padding: 8px;
--pgn-component-badge-radius: 999rem;
```

## Validation Checklist

Before running build:

- [ ] All files have `$schema` property
- [ ] All values use `$value` key
- [ ] Core files don't reference theme tokens
- [ ] Theme files properly reference core tokens
- [ ] No typos in reference paths (case-sensitive!)
- [ ] No circular dependencies
- [ ] Valid JSON (test with `jsonlint`)
- [ ] Consistent naming across files

## File Summary

| File | Purpose | References | Theme-Specific |
|------|---------|-----------|-----------------|
| `core/colors.json` | Global color palette | Core only | No |
| `core/typography.json` | Font definitions | Core only | No |
| `core/spacing.json` | Spacing/radius/shadow | Core only | No |
| `light/colors.json` | Light theme colors | Core + semantic | Yes |
| `light/component.json` | Component styling | Core + semantic | Yes |
