# HUMAIN Design Tokens Workflow Diagrams

## 🔄 Build & Deploy Workflow

```
┌─────────────────────────────────────────────────────────────────┐
│                    YOUR DESIGN TOKENS                           │
│                                                                 │
│  tokens/src/                                                    │
│  ├── core/              (Theme-agnostic)                        │
│  │   ├── colors.json        → aqua, zinc, status palettes      │
│  │   ├── typography.json    → fonts, sizes, weights            │
│  │   └── spacing.json       → spacing, radius, shadows         │
│  │                                                              │
│  └── themes/light/      (Light theme-specific)                 │
│      ├── colors.json        → brand, surface, text colors      │
│      └── component.json     → button, card, field styles       │
└─────────────────────────────────────────────────────────────────┘
                            ↓
                  npm run build-tokens
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│              PARAGON CLI PROCESSES TOKENS                       │
│                                                                 │
│  Step 1: Parse JSON files                                      │
│  Step 2: Resolve references ({color.zinc.50} → #fafafa)       │
│  Step 3: Generate CSS variables (--pgn-color-*)               │
│  Step 4: Output to build/tokens/                              │
└─────────────────────────────────────────────────────────────────┘
                            ↓
                  npm run build-scss
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│            COMPILE SCSS WITH TOKENS INTO CSS                    │
│                                                                 │
│  Input:  Paragon SCSS + CSS variables from build/tokens/       │
│  Process: Compile with token variables                         │
│  Output: dist/                                                 │
│    ├── core.css (with variables)                              │
│    ├── core.min.css (minified)                                │
│    ├── light.css (with variables)                             │
│    └── light.min.css (minified)                               │
└─────────────────────────────────────────────────────────────────┘
                            ↓
            cp dist/* docs/paragon/themes/
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│              DEPLOY TO GITHUB PAGES CDN                         │
│                                                                 │
│  https://abdullahzeer.github.io/humain-paragon-cdn/            │
│  ├── paragon/                                                   │
│  │   └── themes/                                               │
│  │       ├── core.min.css                                      │
│  │       └── light.min.css                                     │
└─────────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│           APPLICATIONS USE YOUR CDN                             │
│                                                                 │
│  <link rel="stylesheet"                                        │
│    href="https://.../paragon/themes/core.min.css">             │
│  <link rel="stylesheet"                                        │
│    href="https://.../paragon/themes/light.min.css">            │
│                                                                 │
│  ✅ All Paragon components styled with HUMAIN tokens           │
└─────────────────────────────────────────────────────────────────┘
```

## 🎯 Token Resolution & CSS Variable Generation

```
┌─────────────────────────────────────────────────────────────────┐
│                    CORE TOKEN (colors.json)                    │
│                                                                 │
│  {                                                              │
│    "color": {                                                   │
│      "zinc": {                                                  │
│        "50": "#fafafa",                                        │
│        "900": "#18181b"                                        │
│      }                                                          │
│    }                                                            │
│  }                                                              │
└─────────────────────────────────────────────────────────────────┘
           ↓ Referenced by ↓
┌─────────────────────────────────────────────────────────────────┐
│              SEMANTIC TOKEN (light/colors.json)                │
│                                                                 │
│  {                                                              │
│    "color": {                                                   │
│      "text": {                                                  │
│        "primary": "{color.zinc.900}"  ← Reference               │
│      }                                                          │
│    }                                                            │
│  }                                                              │
└─────────────────────────────────────────────────────────────────┘
           ↓ Resolved to ↓
┌─────────────────────────────────────────────────────────────────┐
│                    CSS VARIABLE OUTPUT                          │
│                                                                 │
│  :root {                                                        │
│    --pgn-color-zinc-50: #fafafa;                              │
│    --pgn-color-zinc-900: #18181b;                             │
│    --pgn-color-text-primary: #18181b;                         │
│  }                                                              │
└─────────────────────────────────────────────────────────────────┘
           ↓ Used by ↓
┌─────────────────────────────────────────────────────────────────┐
│              COMPONENT STYLING IN CSS                          │
│                                                                 │
│  .btn-primary {                                                │
│    color: var(--pgn-color-text-primary);  ← Applied!          │
│  }                                                              │
└─────────────────────────────────────────────────────────────────┘
```

## 📊 File Dependency Graph

```
                      package.json
                           ↓
                    Build Scripts
                           ↓
        ┌──────────────────┴──────────────────┐
        ↓                                      ↓
   npm run                              npm run
   build-tokens                         build-scss
        ↓                                      ↓
   Reads from:                          Reads from:
   ├─ tokens/src/core/*.json            ├─ build/tokens/*
   └─ tokens/src/themes/light/*         └─ paragon/core.scss
        ↓                                      ↓
   Outputs to:                          Outputs to:
   └─ build/tokens/*                    └─ dist/*.css
                                             dist/*.min.css
```

## 🔗 Token Reference Hierarchy

```
┌─────────────────────────────┐
│  CORE PALETTES              │ (Theme-agnostic)
│  ◆ aqua (brand shades)      │
│  ◆ zinc (neutral shades)    │
│  ◆ status (success/warn)    │
│  ◆ air, oasis (accent)      │
│  ◆ fonts, sizes, weights    │
│  ◆ spacing scale            │
└──────────────┬──────────────┘
               │
      Can be Referenced by
               ↓
┌─────────────────────────────┐
│ SEMANTIC COLORS (light)     │ (Theme-specific)
│ ◇ brand.primary.fill        │
│ ◇ surface.base              │
│ ◇ text.primary              │
│ ◇ (uses core tokens above)  │
└──────────────┬──────────────┘
               │
      Can be Referenced by
               ↓
┌─────────────────────────────┐
│ COMPONENT STYLES (light)    │ (Theme-specific)
│ ▢ button.primary.background │
│ ▢ card.padding              │
│ ▢ field.focusRing           │
│ ▢ (uses semantic tokens)    │
└─────────────────────────────┘

Legend:
◆ = Core/Global (all themes)
◇ = Semantic (light theme)
▢ = Component (light theme)

Rule: Can only reference items above in hierarchy
```

## 🔀 Data Flow: From JSON to Rendered Component

```
1. JSON TOKEN DEFINITION
   ┌──────────────────────────────────┐
   │ tokens/src/core/colors.json      │
   │                                  │
   │ "color": {                       │
   │   "aqua": {                      │
   │     "800": "#0b6a7f" ← Value    │
   │   }                              │
   │ }                                │
   └──────────────┬───────────────────┘
                  │
2. REFERENCED BY SEMANTIC TOKEN
   ┌──────────────────────────────────┐
   │ tokens/src/themes/light/colors.json │
   │                                  │
   │ "color": {                       │
   │   "brand": {                     │
   │     "primary": {                 │
   │       "fill": "{color.aqua.800}" ← Reference
   │     }                            │
   │   }                              │
   │ }                                │
   └──────────────┬───────────────────┘
                  │
3. RESOLVED BY PARAGON CLI
   ┌──────────────────────────────────┐
   │ build-tokens command             │
   │                                  │
   │ Replaces: {color.aqua.800}       │
   │ With: #0b6a7f                    │
   │                                  │
   │ Creates CSS variable:            │
   │ --pgn-color-brand-primary-fill   │
   │ --pgn-color-brand-primary-fill: #0b6a7f; 
   └──────────────┬───────────────────┘
                  │
4. COMPILED INTO CSS RULES
   ┌──────────────────────────────────┐
   │ build-scss command               │
   │                                  │
   │ .btn-primary {                   │
   │   background: var(               │
   │     --pgn-color-brand-primary-fill
   │   );                             │
   │ }                                │
   └──────────────┬───────────────────┘
                  │
5. DEPLOYED TO CDN
   ┌──────────────────────────────────┐
   │ docs/paragon/themes/light.min.css │
   │                                  │
   │ :root {                          │
   │   --pgn-color-brand-primary-fill: │
   │     #0b6a7f;                     │
   │ }                                │
   │                                  │
   │ .btn-primary {                   │
   │   background: var(               │
   │     --pgn-color-brand-primary-fill│
   │   );                             │
   │ }                                │
   └──────────────┬───────────────────┘
                  │
6. USED IN APPLICATION
   ┌──────────────────────────────────┐
   │ <link href="...light.min.css">   │
   │                                  │
   │ <button class="btn btn-primary"  │
   │   >Click Me</button>              │
   │                                  │
   │ RENDERED:                        │
   │ ┌────────────────┐               │
   │ │ Click Me  ◄────┼─ #0b6a7f     │
   │ └────────────────┘               │
   │    (aqua-800)                    │
   └──────────────────────────────────┘
```

## ✅ Quality Assurance Workflow

```
BEFORE DEPLOYMENT:

1. Validate JSON Format
   ├─ Check: $schema present ✓
   ├─ Check: $value present ✓
   ├─ Check: $type present where needed ✓
   └─ Tool: jsonlint

2. Validate References
   ├─ Check: No typos in paths ✓
   ├─ Check: No circular refs ✓
   ├─ Check: Core→Theme ordering ✓
   └─ Manual review

3. Build & Test
   ├─ Run: npm run build ✓
   ├─ Check: build/tokens/ exists ✓
   ├─ Check: dist/ files exist ✓
   └─ Check: CSS variables present ✓

4. Validate Output CSS
   ├─ Grep: --pgn-color-* variables ✓
   ├─ Grep: --pgn-typography-* variables ✓
   ├─ Grep: --pgn-spacing-* variables ✓
   └─ Check: No errors in .min files ✓

5. Visual Testing
   ├─ Load HTML with CSS ✓
   ├─ Inspect element colors ✓
   ├─ Compare to design tokens ✓
   └─ Check: Light theme applies ✓

AFTER DEPLOYMENT:

6. Smoke Test on CDN
   ├─ Curl: Check response 200 ✓
   ├─ Inspect: CSS variables present ✓
   ├─ Test: Browser load CSS ✓
   └─ Monitor: For errors ✓
```

## 📋 Directory Structure at a Glance

```
humain-paragon-cdn/
│
├── 📄 package.json               ← Build scripts (npm run build)
├── 📄 TOKENS_*.md                ← Documentation (4 files)
├── 📄 WORKFLOW_DIAGRAM.md        ← This file
│
├── 📁 tokens/                    ← Your token files
│   └── src/
│       ├── core/
│       │   ├── colors.json       ← Global colors (aqua, zinc, etc)
│       │   ├── typography.json   ← Font definitions
│       │   └── spacing.json      ← Spacing/radius/shadows
│       │
│       └── themes/light/
│           ├── colors.json       ← Semantic colors (brand, surface, text)
│           └── component.json    ← Component styles (button, card, etc)
│
├── 📁 build/                     ← Generated during build
│   └── tokens/                   ← CSS variables (from build-tokens)
│
├── 📁 dist/                      ← Generated final CSS
│   ├── core.css
│   ├── core.min.css              ← ✅ Deploy this
│   ├── light.css
│   ├── light.min.css             ← ✅ Deploy this
│   └── theme-urls.json
│
├── 📁 docs/                      ← GitHub Pages CDN
│   └── paragon/themes/
│       ├── core.min.css          ← Copy from dist/
│       └── light.min.css         ← Copy from dist/
│
└── 📁 paragon/
    └── core.scss                 ← Paragon SCSS source (optional)
```

## 🎬 Quick Command Reference

```bash
# Initial setup
npm install                    # Install dependencies (Paragon CLI)

# Development workflow
npm run build-tokens           # Convert JSON tokens → CSS variables
npm run build-scss             # Compile SCSS → CSS files
npm run build                  # Run both above

# Deployment
cp dist/* docs/paragon/themes/ # Copy to CDN location
git add .
git commit -m "Update tokens"
git push                       # Live on GitHub Pages!

# Debugging
npm run paragon:help           # See available Paragon commands
grep "pgn-" dist/core.min.css | head # Check variables exist
```

## 🚀 Success Indicators

```
After npm run build:
✅ build/tokens/ directory created
✅ dist/core.css exists
✅ dist/core.min.css exists (smaller size)
✅ dist/light.css exists
✅ dist/light.min.css exists (smaller size)
✅ grep "pgn-color-" dist/core.min.css shows variables
✅ No "error" or "warning" messages in output

After deploying to docs/:
✅ curl https://...light.min.css returns 200 OK
✅ CSS variables present in response
✅ Paragon components render with HUMAIN colors
✅ Brand colors match design tokens
```
