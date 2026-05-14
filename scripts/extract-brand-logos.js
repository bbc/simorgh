const fs = require('fs');
const path = require('path');

const LOGOS_SOURCE_DIR = path.join(__dirname, '../src/app/components/ThemeProvider/chameleonLogos');
const PUBLIC_DIR = path.join(__dirname, '../public');

/**
 * Extract service name from filename (e.g., 'bengali.tsx' -> 'bengali')
 */
const getServiceName = (filename) => filename.replace(/\.(tsx|ts|jsx|js)$/, '');

/**
 * Parse path elements from JSX group prop
 * Extracts all <path d="..." /> elements from the JSX
 */
const extractPathsFromJSX = (jsxContent) => {
  const pathRegex = /<path\s+d="([^"]+)"\s*\/>/g;
  const paths = [];
  let match;

  while ((match = pathRegex.exec(jsxContent)) !== null) {
    paths.push(match[1]);
  }

  return paths;
};

/**
 * Extract viewbox configuration from build call
 * Looks for: viewbox: { minY: 145, minX: 690, width: 790, height: 135 }
 */
const extractViewbox = (fileContent) => {
  const viewboxRegex = /viewbox:\s*{\s*minY:\s*(\d+),\s*minX:\s*(\d+),\s*width:\s*(\d+),\s*height:\s*(\d+)\s*}/;
  const match = fileContent.match(viewboxRegex);

  if (match) {
    const minX = parseInt(match[2], 10);
    const minY = parseInt(match[1], 10);
    const width = parseInt(match[3], 10);
    const height = parseInt(match[4], 10);

    return {
      minX,
      minY,
      width,
      height,
      viewBoxString: `${minX} ${minY} ${width} ${height}`,
    };
  }

  return null;
};

/**
 * Generate a well-formed SVG from extracted paths with white fill
 */
const generateSVG = (paths, viewbox) => {
  const pathElements = paths
    .map(d => `    <path d="${d}" fill="white" />`)
    .join('\n');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewbox.viewBoxString}" fill="white">
  <g>
${pathElements}
  </g>
</svg>`;
};

/**
 * Create directory structure if it doesn't exist
 */
const ensureDirectoryExists = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

/**
 * Process a single logo file
 */
const processLogoFile = (filename) => {
  const filePath = path.join(LOGOS_SOURCE_DIR, filename);
  const serviceName = getServiceName(filename);

  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');

    // Extract group JSX content
    const groupMatch = fileContent.match(/group:\s*\(\s*<>([^<]*(?:<(?!\/?>)[^<]*)*(?:<path[^>]*\/>[^<]*)*)<\/>\s*\),/);
    if (!groupMatch) {
      console.warn(`⚠️  Could not find group prop in ${filename}`);
      return;
    }

    const groupContent = groupMatch[1];
    const paths = extractPathsFromJSX(groupContent);

    if (paths.length === 0) {
      console.warn(`⚠️  No paths found in ${filename}`);
      return;
    }

    const viewbox = extractViewbox(fileContent);
    if (!viewbox) {
      console.warn(`⚠️  Could not extract viewbox from ${filename}`);
      return;
    }

    // Create output directory
    const outputDir = path.join(PUBLIC_DIR, serviceName, 'images');
    ensureDirectoryExists(outputDir);

    // Generate and write SVG
    const svg = generateSVG(paths, viewbox);
    const outputPath = path.join(outputDir, 'brandLogo.svg');

    fs.writeFileSync(outputPath, svg, 'utf-8');

    console.log(`✓ Created ${outputPath}`);
    console.log(`  - Service: ${serviceName}`);
    console.log(`  - Paths: ${paths.length}`);
    console.log(`  - ViewBox: ${viewbox.viewBoxString}`);
    console.log(`  - Fill: white\n`);
  } catch (error) {
    console.error(`✗ Error processing ${filename}:`, error.message);
  }
};

/**
 * Main function - process all logo files
 */
const main = () => {
  try {
    if (!fs.existsSync(LOGOS_SOURCE_DIR)) {
      console.error(`✗ Logo source directory not found: ${LOGOS_SOURCE_DIR}`);
      process.exit(1);
    }

    const files = fs.readdirSync(LOGOS_SOURCE_DIR);
    const logoFiles = files.filter(file => /\.(tsx|ts|jsx|js)$/.test(file));

    if (logoFiles.length === 0) {
      console.warn('⚠️  No logo files found');
      return;
    }

    console.log(`\n🎨 Extracting brand logos with white fill...\n`);
    console.log(`Found ${logoFiles.length} logo file(s)\n`);

    logoFiles.forEach(processLogoFile);

    console.log(`✓ Brand logo extraction complete!\n`);
  } catch (error) {
    console.error('✗ Fatal error:', error.message);
    process.exit(1);
  }
};

main();