const fs = require('fs');
const path = require('path');
const glob = require('glob');

const fonts = glob
  .sync(path.resolve(__dirname, 'static/fonts/**/*'))
  .filter(font => font.match(/(eot|ttf|woff|woff2)/))
  .map(font => font.split('static/')[1]);

const preloadLinks = fonts
  .map(
    font => `
<link
  rel="preload"
  href="${font}"
  as="font"
  type="font/${font.split('.')[1]}"
  crossorigin="anonymous"
/>
`,
  )
  .join('');

fs.writeFileSync(path.resolve(__dirname, 'preview-head.html'), preloadLinks);
