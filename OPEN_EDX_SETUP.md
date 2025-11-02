# 🎓 Open edX Integration Guide - CORRECTED

## ✅ How to Use HUMAIN Paragon CDN with Open edX

The HUMAIN Paragon CDN provides properly themed CSS files with your custom brand colors. Here's the correct way to configure it:

### Files Available
- **`core.min.css`** - Paragon core component library (required)
- **`light.min.css`** - Paragon light theme with default colors (required)
- **`humain-overrides.css`** - HUMAIN brand color overrides (required to see your colors!)

### Configuration

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

# IMPORTANT: Also inject the HUMAIN overrides to apply brand colors
MFE_CONFIG["CUSTOM_THEME_CSS"] = [
    "https://abdullahzeer.github.io/humain-paragon-cdn/paragon/themes/humain-overrides.css"
]
"""
    )
)
```

### How It Works

**Load Order (Most Important!):**

1. ✅ **core.min.css** - Loads Paragon's component styles
2. ✅ **light.min.css** - Loads Paragon's default light theme colors
3. ✅ **humain-overrides.css** - OVERRIDES Paragon's default colors with HUMAIN brand colors

### CSS Variables Being Overridden

| Paragon Variable | HUMAIN Variable | Purpose |
|---|---|---|
| `--pgn-color-primary-500` | `--humain-brand-primary-fill` | Primary action buttons |
| `--pgn-color-brand-500` | `--humain-brand-base` | Brand emphasis |
| `--pgn-color-secondary-500` | `--humain-brand-secondary-fill` | Secondary actions |
| `--pgn-color-success-500` | `--humain-status-success` | Success messages |
| `--pgn-color-warning-500` | `--humain-status-warning` | Warning messages |
| `--pgn-color-danger-500` | `--humain-status-error` | Error messages |

### Troubleshooting

**Not seeing HUMAIN brand colors?**

✅ Make sure `humain-overrides.css` is being loaded AFTER `light.min.css`
✅ Check browser DevTools → verify CSS loads in correct order
✅ Check Network tab → all three CSS files should show 200 status
✅ Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)

**Still not working?**

Check that Open edX is actually using the CDN URLs. You should see these in the page source:
```html
<link rel="stylesheet" href="https://abdullahzeer.github.io/humain-paragon-cdn/paragon/themes/core.min.css">
<link rel="stylesheet" href="https://abdullahzeer.github.io/humain-paragon-cdn/paragon/themes/light.min.css">
<link rel="stylesheet" href="https://abdullahzeer.github.io/humain-paragon-cdn/paragon/themes/humain-overrides.css">
```

### Your HUMAIN Brand Colors

- **Primary:** `#0b6a7f` (teal/dark aqua)
- **Hover:** `#00D49C` (bright aqua/mint)
- **Highlight:** `#D0F94A` (bright yellow)
- **Success:** `#16a34a` (green)
- **Warning:** `#d97706` (orange)
- **Error:** `#dc2626` (red)

---

**Next Steps:**

1. Update your Open edX configuration with the code above
2. Restart your Open edX services
3. Hard refresh your browser
4. Your interface should now display HUMAIN brand colors!
