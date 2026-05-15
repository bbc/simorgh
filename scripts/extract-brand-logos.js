const fs = require('fs');
const path = require('path');

const LOGOS_SOURCE_DIR = path.join(
  __dirname,
  '../src/app/components/ThemeProvider/chameleonLogos',
);
const PUBLIC_DIR = path.join(__dirname, '../public');

const getServiceName = filename =>
  filename.replace(/\.(tsx|ts|jsx|js)$/, '');

const ensureDirectoryExists = dirPath => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

const extractGroupContent = fileContent => {
  const groupMatch = fileContent.match(/group:\s*\(\s*([\s\S]*?)\s*\)\s*,/);

  return groupMatch?.[1] ?? null;
};

const extractPathsFromGroup = groupContent => {
  const pathRegex = /<path\s+d="([^"]+)"\s*\/>/g;
  const paths = [];
  let match;

  while ((match = pathRegex.exec(groupContent)) !== null) {
    paths.push(match[1]);
  }

  return paths;
};

const extractViewbox = fileContent => {
  const viewboxMatch = fileContent.match(
    /viewbox:\s*{\s*minY:\s*(-?\d+(?:\.\d+)?),\s*minX:\s*(-?\d+(?:\.\d+)?),\s*width:\s*(-?\d+(?:\.\d+)?),\s*height:\s*(-?\d+(?:\.\d+)?)\s*}/,
  );

  if (!viewboxMatch) return null;

  return {
    minX: Number(viewboxMatch[2]),
    minY: Number(viewboxMatch[1]),
    width: Number(viewboxMatch[3]),
    height: Number(viewboxMatch[4]),
  };
};

const generateSVG = ({ paths, viewbox }) => {
  const pathElements = paths.map(d => `    <path d="${d}" />`).join('\n');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewbox.minX} ${viewbox.minY} ${viewbox.width} ${viewbox.height}">
  <g fill="white" fill-rule="evenodd" stroke="#000" stroke-width=".335" style="stroke:#fff">
${pathElements}
  </g>
</svg>
`;
};

const processLogoFile = filename => {
  const filePath = path.join(LOGOS_SOURCE_DIR, filename);
  const serviceName = getServiceName(filename);

  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');

    const groupContent = extractGroupContent(fileContent);
    if (!groupContent) {
      console.warn(`Skipping ${filename}: could not find group content`);
      return;
    }

    const paths = extractPathsFromGroup(groupContent);
    if (paths.length === 0) {
      console.warn(`Skipping ${filename}: no paths found`);
      return;
    }

    const viewbox = extractViewbox(fileContent);
    if (!viewbox) {
      console.warn(`Skipping ${filename}: could not extract viewbox`);
      return;
    }

    const outputDir = path.join(PUBLIC_DIR, serviceName, 'images');
    ensureDirectoryExists(outputDir);

    const svg = generateSVG({
      paths,
      viewbox,
    });

    const outputPath = path.join(outputDir, 'brandLogo.svg');
    fs.writeFileSync(outputPath, svg, 'utf-8');

    console.log(`Created ${outputPath}`);
  } catch (error) {
    console.error(`Error processing ${filename}: ${error.message}`);
  }
};

const main = () => {
  if (!fs.existsSync(LOGOS_SOURCE_DIR)) {
    console.error(`Logo source directory not found: ${LOGOS_SOURCE_DIR}`);
    process.exit(1);
  }

  const files = fs.readdirSync(LOGOS_SOURCE_DIR);
  const logoFiles = files.filter(file => /\.(tsx|ts|jsx|js)$/.test(file));

  logoFiles.forEach(processLogoFile);
};

main();