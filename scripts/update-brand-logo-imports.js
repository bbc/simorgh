const fs = require('fs');
const path = require('path');

const LOGOS_DIR = path.join(__dirname, '../src/app/components/ThemeProvider/chameleonLogos');

/**
 * Extract service name from filename (e.g., 'bengali.tsx' -> 'bengali')
 */
const getServiceName = (filename) => filename.replace(/\.(tsx|ts|jsx|js)$/, '');

/**
 * Generate new file content with dynamic URL export using env vars
 */
const generateNewContent = (serviceName) => {
  return `import { getEnvConfig } from '#app/lib/utilities/getEnvConfig';

const {
  SIMORGH_PUBLIC_STATIC_ASSETS_ORIGIN,
  SIMORGH_PUBLIC_STATIC_ASSETS_PATH,
} = getEnvConfig();

export default \`\${SIMORGH_PUBLIC_STATIC_ASSETS_ORIGIN}\${SIMORGH_PUBLIC_STATIC_ASSETS_PATH}/${serviceName}/images/brandLogo.svg\`;
`;
};

/**
 * Process a single logo file
 */
const processLogoFile = (filename) => {
  // Skip index files
  if (filename === 'index.tsx' || filename === 'index.test.ts') {
    console.log(`⊘ Skipped ${filename} (index file)\n`);
    return;
  }

  const filePath = path.join(LOGOS_DIR, filename);
  const serviceName = getServiceName(filename);

  try {
    // Read existing file to confirm it exists and is readable
    const existingContent = fs.readFileSync(filePath, 'utf-8');

    if (!existingContent) {
      console.warn(`⚠️  File is empty: ${filename}`);
      return;
    }

    // Generate new content
    const newContent = generateNewContent(serviceName);

    // Write new content
    fs.writeFileSync(filePath, newContent, 'utf-8');

    console.log(`✓ Updated ${filename}`);
    console.log(`  - Service: ${serviceName}`);
    console.log(`  - Content includes dynamic URL from env vars\n`);
  } catch (error) {
    console.error(`✗ Error processing ${filename}:`, error.message);
  }
};

/**
 * Main function - process all logo files
 */
const main = () => {
  try {
    if (!fs.existsSync(LOGOS_DIR)) {
      console.error(`✗ Logo directory not found: ${LOGOS_DIR}`);
      process.exit(1);
    }

    const files = fs.readdirSync(LOGOS_DIR);
    const logoFiles = files.filter(file => /\.(tsx|ts|jsx|js)$/.test(file));

    if (logoFiles.length === 0) {
      console.warn('⚠️  No logo files found');
      return;
    }

    console.log(`\n🔄 Updating brand logo imports with dynamic env vars...\n`);
    console.log(`Found ${logoFiles.length} file(s) in ${LOGOS_DIR}\n`);

    logoFiles.forEach(processLogoFile);

    console.log(`✓ Brand logo imports updated with dynamic URLs!\n`);
  } catch (error) {
    console.error('✗ Fatal error:', error.message);
    process.exit(1);
  }
};

main();