const fs = require('fs');
const path = require('path');
const glob = require('glob');

const fonts = glob
  .sync(path.resolve(__dirname, 'static/fonts/**/*'))
  .filter(font => font.match(/(eot|ttf|woff|woff2)/))
  .map(font => font.split('static/')[1]);

const clearBrowserStorageScript = `
<script>
  window.localStorage.removeItem('amp-store:' + window.location.origin);
  document.cookie = 'ckns_policy' + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
  document.cookie = 'ckns_explicit' + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
  document.cookie = 'ckns_privacy' + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
</script>
`;

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

fs.writeFileSync(
  path.resolve(__dirname, 'preview-head.html'),
  clearBrowserStorageScript.concat(preloadLinks),
);
