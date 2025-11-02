# 🎓 Open edX Integration Guide

## ✅ Ready to Use

Your HUMAIN Paragon CDN is now **fully integrated** with Open edX! The custom design tokens are merged directly into `light.min.css`, so Open edX will automatically use your HUMAIN brand colors without any additional configuration.

## 🚀 How to Configure in Open edX

Add this to your **tutor plugin** or **edx-configuration** settings:

```python
hooks.Filters.ENV_PATCHES.add_item(
    (
        "mfe-lms-common-settings",
        """
# Load Paragon CSS with HUMAIN Design Tokens from GitHub Pages CDN
MFE_CONFIG["PARAGON_THEME_URLS"] = {
    "core": {
        "url": "https://abdullahzeer.github.io/humain-paragon-cdn/paragon/themes/core.min.css"
    },
    "defaults": {
        "light": "light"
    },
    "variants": {
        "light": {
            "url": "https://abdullahzeer.github.io/humain-paragon-cdn/paragon/themes/light.min.css"
        }
    }
}
"""
    )
)
```

That's it! ✨ Open edX will load:
1. **`core.min.css`** - Paragon component styles
2. **`light.min.css`** - Light theme WITH HUMAIN tokens already merged in!

## 🎨 HUMAIN Brand Colors Now Active

When Open edX loads these files, your HUMAIN design tokens are automatically applied:

### Primary Colors
- **Primary Button**: `#0b6a7f` (Aqua 700) instead of default blue
- **Primary Hover**: `#00D49C` (Air) instead of default hover color
- **Secondary**: `#cafffd` (Aqua 100)
- **Highlight**: `#D0F94A` (Oasis)

### Typography
- **Body Font**: 'ABCRepro', sans-serif
- **Heading Font**: 'Optician-Sans', sans-serif

### All Components Updated
- Buttons use HUMAIN primary colors
- Cards use HUMAIN surface colors
- Form fields use HUMAIN styling
- Text uses HUMAIN typography

## 📝 What's Included in light.min.css

The file now contains:
1. **101 HUMAIN custom CSS variables** at the top (`:root` selector)
2. **All original Paragon CSS** below

```css
:root {
  --pgn-aqua-50: #eafffe;
  --pgn-aqua-100: #cafffd;
  /* ... 99 more custom variables ... */
  --pgn-brand-primary-fill: #0b6a7f;
  --pgn-brand-primary-hover: #00D49C;
  --pgn-component-button-primary-background: #0b6a7f;
  /* ... */
}
/* ... all original Paragon CSS ... */
```

When Paragon CSS references variables like `var(--pgn-color-primary-500)`, it now gets your HUMAIN brand color instead of the default!

## 🔄 Updating Tokens

If you need to change brand colors, typography, or spacing:

1. **Edit token files** in `tokens/src/`:
   - `tokens/src/core/colors.json`
   - `tokens/src/core/typography.json`
   - `tokens/src/core/spacing.json`
   - `tokens/src/themes/light/colors.json`
   - `tokens/src/themes/light/component.json`

2. **Regenerate the merged CSS**:
   ```bash
   npm run build-merged-css
   ```

3. **Commit and push**:
   ```bash
   git add docs/paragon/themes/light.min.css
   git commit -m "Update HUMAIN design tokens"
   git push
   ```

4. **Hard refresh in Open edX** (Ctrl+Shift+R)  
   GitHub Pages updates within seconds, so your changes go live immediately!

## 📊 File Summary

### Before (Default Paragon)
```
core.min.css     (519 KB) - Paragon components
light.min.css    (194 KB) - Default light theme colors
Total: 713 KB with default colors
```

### After (HUMAIN Paragon)
```
core.min.css           (519 KB) - Paragon components (unchanged)
light.min.css          (197 KB) - Light theme + 101 HUMAIN tokens
humain-tokens.css      (3.7 KB) - Tokens only (optional, for reference)
Total: 716 KB with HUMAIN brand colors
```

**Only 3 KB overhead added!** 🎯

## 🔧 Customization Examples

### Change Primary Brand Color
Edit `tokens/src/themes/light/colors.json`:
```json
"brand": {
  "primary": {
    "fill": { "$value": "#FF6B35" },  // Your new color
    "onFill": { "$value": "#FFFFFF" }
  }
}
```

Then run: `npm run build-merged-css`

### Change Button Radius
Edit `tokens/src/core/spacing.json`:
```json
"radius": {
  "button": { "$value": "8px" }  // More rounded
}
```

### Add New Typography Style
Edit `tokens/src/core/typography.json`:
```json
"font-size": {
  "hero": { "$value": "56px" }
}
```

## ✨ What Makes This Special

✅ **Zero Configuration** - Just point Open edX to the URLs  
✅ **Zero JavaScript** - Pure CSS variables  
✅ **Zero Fragility** - Works with any Paragon version  
✅ **Automatic Theming** - All components inherit brand colors  
✅ **Live Updates** - Changes deploy instantly via CDN  
✅ **Fully Documented** - Token files show every design decision  
✅ **Easy Maintenance** - Edit JSON files, not CSS  

## 📋 CDN URLs

```
Core Styles:
https://abdullahzeer.github.io/humain-paragon-cdn/paragon/themes/core.min.css

Light Theme with HUMAIN Tokens:
https://abdullahzeer.github.io/humain-paragon-cdn/paragon/themes/light.min.css

Tokens Only (Reference):
https://abdullahzeer.github.io/humain-paragon-cdn/paragon/themes/humain-tokens.css
```

## 🎓 Open edX MFE Config Deep Dive

The configuration tells Open edX:

```python
MFE_CONFIG["PARAGON_THEME_URLS"] = {
    # ↓ Always load core styles first
    "core": {
        "url": "https://..../core.min.css"
    },
    
    # ↓ Default to "light" theme
    "defaults": {
        "light": "light"
    },
    
    # ↓ Define the "light" variant
    "variants": {
        "light": {
            "url": "https://..../light.min.css"  # ← Now has HUMAIN tokens!
        }
    }
}
```

Open edX's React components will use these URLs to load styling, and since `light.min.css` includes all the HUMAIN token variables, all components automatically get your brand styling!

## 🐛 Troubleshooting

**Q: Colors aren't changing in Open edX?**  
A: Hard refresh (Ctrl+Shift+R) and check browser DevTools that the CSS loaded correctly.

**Q: I updated tokens but changes aren't showing?**  
A: Run `npm run build-merged-css` then `git push` - it should update within seconds.

**Q: Which variables does Open edX use?**  
A: Check the `light.min.css` file - every `--pgn-*` variable is available to Paragon components.

**Q: Can I add more tokens?**  
A: Yes! Add to any `tokens/src/*/` JSON file, then run `npm run build-merged-css`.

---

**Status**: ✅ Live and integrated with Open edX!  
**Last Updated**: November 2, 2025  
**Tokens**: 101 custom design variables  
**File Size**: +3 KB overhead  
**Deployment Time**: Instant (GitHub Pages)
