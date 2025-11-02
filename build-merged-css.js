const fs = require('fs');
const path = require('path');

// Read the files
const coreColors = JSON.parse(fs.readFileSync(path.join(__dirname, 'tokens', 'src', 'core', 'colors.json'), 'utf8'));
const coreTypography = JSON.parse(fs.readFileSync(path.join(__dirname, 'tokens', 'src', 'core', 'typography.json'), 'utf8'));
const coreSpacing = JSON.parse(fs.readFileSync(path.join(__dirname, 'tokens', 'src', 'core', 'spacing.json'), 'utf8'));
const lightColors = JSON.parse(fs.readFileSync(path.join(__dirname, 'tokens', 'src', 'themes', 'light', 'colors.json'), 'utf8'));
const lightComponent = JSON.parse(fs.readFileSync(path.join(__dirname, 'tokens', 'src', 'themes', 'light', 'component.json'), 'utf8'));
const lightMinCSS = fs.readFileSync(path.join(__dirname, 'docs', 'paragon', 'themes', 'light.min.css'), 'utf8');

// Function to flatten token object and generate CSS variables
function generateCSSVariables(obj, prefix = '', result = {}) {
  for (const [key, value] of Object.entries(obj)) {
    if (key.startsWith('$')) continue;
    
    const newPrefix = prefix ? `${prefix}-${key}` : key;
    
    if (value && typeof value === 'object' && value.$value !== undefined) {
      result[`--pgn-${newPrefix}`] = value.$value;
    } else if (value && typeof value === 'object' && !value.$value) {
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

// Create CSS content for tokens
function createCSSVariables(tokens) {
  let css = ':root {\n';
  for (const [varName, value] of Object.entries(tokens)) {
    css += `${varName}: ${value};\n`;
  }
  css += '}\n';
  return css;
}

// Check if light.min.css already has :root
const hasRootSelector = lightMinCSS.includes(':root{');
let mergedCSS;

if (hasRootSelector) {
  // Extract the existing :root block
  const rootMatch = lightMinCSS.match(/:root\{([^}]+)\}/);
  if (rootMatch) {
    // Get existing variables
    const existingVars = rootMatch[1];
    
    // Create new :root with both existing and new variables
    let newRootVars = '';
    for (const [varName, value] of Object.entries(allTokens)) {
      newRootVars += `${varName}: ${value};`;
    }
    
    // Replace the :root block with merged variables (HUMAIN tokens override Paragon defaults)
    mergedCSS = lightMinCSS.replace(/:root\{[^}]+\}/, `:root{${newRootVars}${existingVars}}`);
  } else {
    // Fallback: prepend tokens before existing :root
    const tokenCSS = createCSSVariables(allTokens);
    mergedCSS = tokenCSS + lightMinCSS;
  }
} else {
  // Prepend tokens at the beginning
  const tokenCSS = createCSSVariables(allTokens);
  mergedCSS = tokenCSS + lightMinCSS;
}

// Write merged CSS
const outputPath = path.join(__dirname, 'docs', 'paragon', 'themes', 'light.min.css');
fs.writeFileSync(outputPath, mergedCSS, 'utf8');

console.log(`✓ Merged HUMAIN tokens into light.min.css`);
console.log(`✓ Total tokens merged: ${Object.keys(allTokens).length}`);
console.log(`✓ File size: ${(mergedCSS.length / 1024).toFixed(2)} KB`);
console.log(`✓ Output: ${outputPath}`);
console.log(`\n✨ Open edX will now use HUMAIN brand colors automatically!`);
