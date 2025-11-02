const fs = require('fs');
const path = require('path');

// Read token files
const coreColors = JSON.parse(fs.readFileSync(path.join(__dirname, 'tokens', 'src', 'core', 'colors.json'), 'utf8'));
const lightColors = JSON.parse(fs.readFileSync(path.join(__dirname, 'tokens', 'src', 'themes', 'light', 'colors.json'), 'utf8'));
const lightComponent = JSON.parse(fs.readFileSync(path.join(__dirname, 'tokens', 'src', 'themes', 'light', 'component.json'), 'utf8'));

// Read the original light.min.css to extract Paragon's default variable structure
const lightMinCSSPath = path.join(__dirname, 'docs', 'paragon', 'themes', 'light.min.css');
const lightMinCSS = fs.readFileSync(lightMinCSSPath, 'utf8');

// Extract existing Paragon variables to understand structure
console.log('📋 Analyzing Paragon\'s default CSS variables...\n');

// Function to flatten token object and generate CSS variables
function flattenTokens(obj, prefix = '') {
  const result = {};
  for (const [key, value] of Object.entries(obj)) {
    if (key.startsWith('$')) continue;
    
    const newPrefix = prefix ? `${prefix}-${key}` : key;
    
    if (value && typeof value === 'object' && value.$value !== undefined) {
      result[newPrefix] = value.$value;
    } else if (value && typeof value === 'object' && !value.$value) {
      Object.assign(result, flattenTokens(value, newPrefix));
    }
  }
  return result;
}

// Create CSS override rules for HUMAIN tokens
function createHUMAINOverrides() {
  const coreColorTokens = flattenTokens(coreColors.color);
  const lightColorTokens = flattenTokens(lightColors.color);
  const componentTokens = flattenTokens(lightComponent);
  
  let css = ':root {\n';
  
  // Add core color tokens as CSS variables
  console.log('🎨 HUMAIN Color Tokens:');
  for (const [key, value] of Object.entries(coreColorTokens)) {
    const varName = `--humain-${key}`;
    css += `  ${varName}: ${value};\n`;
    console.log(`  ${varName}: ${value}`);
  }
  
  console.log('\n🎨 HUMAIN Light Theme Tokens:');
  for (const [key, value] of Object.entries(lightColorTokens)) {
    const varName = `--humain-${key}`;
    css += `  ${varName}: ${value};\n`;
    console.log(`  ${varName}: ${value}`);
  }
  
  // Map HUMAIN brand colors to Paragon's primary/secondary/brand colors
  console.log('\n🔗 Mapping HUMAIN to Paragon Variables:');
  
  const mappings = [
    // Brand colors
    { paragon: '--pgn-color-primary-500', humain: '--humain-primary-base', desc: 'Primary Color' },
    { paragon: '--pgn-color-brand-500', humain: '--humain-brand-base', desc: 'Brand Color' },
    { paragon: '--pgn-color-secondary-500', humain: '--humain-secondary-base', desc: 'Secondary Color' },
    
    // Semantic color overrides for light theme
    { paragon: '--pgn-color-success-500', humain: '--humain-status-success', desc: 'Success Status' },
    { paragon: '--pgn-color-warning-500', humain: '--humain-status-warning', desc: 'Warning Status' },
    { paragon: '--pgn-color-danger-500', humain: '--humain-status-error', desc: 'Error Status' },
  ];
  
  for (const mapping of mappings) {
    css += `  ${mapping.paragon}: var(${mapping.humain}, var(${mapping.paragon}));\n`;
    console.log(`  ${mapping.paragon} → ${mapping.humain} (${mapping.desc})`);
  }
  
  css += '}\n';
  return css;
}

// Generate the override CSS
const humainOverrideCSS = createHUMAINOverrides();

// Write to a new override file that can be loaded AFTER light.min.css
const overridePath = path.join(__dirname, 'docs', 'paragon', 'themes', 'humain-overrides.css');
fs.writeFileSync(overridePath, humainOverrideCSS, 'utf8');

console.log(`\n✅ Generated: ${overridePath}`);
console.log(`\n📝 Usage Instructions:`);
console.log(`\n1. Load CSS in this order:\n`);
console.log(`   <link rel="stylesheet" href="...core.min.css">`);
console.log(`   <link rel="stylesheet" href="...light.min.css">`);
console.log(`   <link rel="stylesheet" href="...humain-overrides.css">`);
console.log(`\n2. OR use @import:\n`);
console.log(`   @import url("...core.min.css");`);
console.log(`   @import url("...light.min.css");`);
console.log(`   @import url("...humain-overrides.css");`);
