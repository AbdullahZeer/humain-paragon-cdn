const fs = require('fs');
const path = require('path');

// Create build directories if they don't exist
const buildDir = path.join(__dirname, 'build', 'tokens');
const docsDir = path.join(__dirname, 'docs', 'paragon', 'themes');

[buildDir, path.join(buildDir, 'core'), path.join(buildDir, 'themes', 'light')].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Read token files
const coreColors = JSON.parse(fs.readFileSync(path.join(__dirname, 'tokens', 'src', 'core', 'colors.json'), 'utf8'));
const coreTypography = JSON.parse(fs.readFileSync(path.join(__dirname, 'tokens', 'src', 'core', 'typography.json'), 'utf8'));
const coreSpacing = JSON.parse(fs.readFileSync(path.join(__dirname, 'tokens', 'src', 'core', 'spacing.json'), 'utf8'));
const lightColors = JSON.parse(fs.readFileSync(path.join(__dirname, 'tokens', 'src', 'themes', 'light', 'colors.json'), 'utf8'));
const lightComponent = JSON.parse(fs.readFileSync(path.join(__dirname, 'tokens', 'src', 'themes', 'light', 'component.json'), 'utf8'));

// Function to flatten token object and generate CSS variables
function generateCSSVariables(obj, prefix = '', result = {}) {
  for (const [key, value] of Object.entries(obj)) {
    if (key.startsWith('$')) continue; // Skip $ metadata
    
    const newPrefix = prefix ? `${prefix}-${key}` : key;
    
    if (value && typeof value === 'object' && value.$value !== undefined) {
      // This is a token with a value
      result[`--pgn-${newPrefix}`] = value.$value;
    } else if (value && typeof value === 'object' && !value.$value) {
      // Recurse into nested objects
      generateCSSVariables(value, newPrefix, result);
    }
  }
  return result;
}

// Generate all CSS variable sets
const allTokens = {
  ...generateCSSVariables(coreColors.color),
  ...generateCSSVariables(coreTypography),
  ...generateCSSVariables(coreSpacing),
  ...generateCSSVariables(lightColors.color),
  ...generateCSSVariables(lightComponent),
};

// Create CSS content
function createCSSFile(tokens) {
  let css = ':root {\n';
  for (const [varName, value] of Object.entries(tokens)) {
    css += `  ${varName}: ${value};\n`;
  }
  css += '}\n';
  return css;
}

// Write the CSS file
const cssContent = createCSSFile(allTokens);
const outputPath = path.join(docsDir, 'humain-tokens.css');

fs.mkdirSync(docsDir, { recursive: true });
fs.writeFileSync(outputPath, cssContent, 'utf8');

console.log(`✓ Generated HUMAIN custom tokens CSS file: ${outputPath}`);
console.log(`✓ Total tokens generated: ${Object.keys(allTokens).length}`);
