// Load the font and avoid re-loading it when components change
import * as fontFaces from '@bbc/psammead-styles/fonts';

const fontPathMap = [
  { prefix: 'F_ISKOOLA_POTA_BBC', path: 'fonts/IskoolaPota/' },
  { prefix: 'F_LATHA', path: 'fonts/Latha/' },
  { prefix: 'F_MALLANNA', path: 'fonts/Mallanna/' },
  { prefix: 'F_NOTO_SANS_ETHIOPIC', path: 'fonts/NotoSansEthiopic/' },
  { prefix: 'F_PADAUK', path: 'fonts/Padauk/' },
  { prefix: 'F_REITH_QALAM', path: 'fonts/ReithQalam/' },
  { prefix: 'F_REITH_SANS', path: 'fonts/Reith/' },
  { prefix: 'F_REITH_SERIF', path: 'fonts/Reith/' },
  { prefix: 'F_SHONAR_BANGLA', path: 'fonts/ShonarBangla/' },
];
const fontLinkId = 'storybook-font-definitions';
const fonts = Object.values(fontFaces).map(fontFace => {
  const fontMap =
    fontPathMap.find(map => fontFace.name.startsWith(map.prefix)) ||
    fontPathMap[0];
  return fontFace(fontMap.path);
});

export default () => {
  if (!document.getElementById(fontLinkId)) {
    const fontStyle = document.createElement('style');

    fontStyle.id = fontLinkId;
    fontStyle.innerHTML = fonts.join('');

    document.head.appendChild(fontStyle);
  }
};
