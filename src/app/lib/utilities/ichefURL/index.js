const buildPlaceholderSrc = (src, resolution) => {
  const parts = src.split('/');
  const [domain, media, imgService, width, ...extraParts] = parts;
  const definedWidth = width.replace('$width', resolution);
  const domainWithProtocol = `https://${domain}`;

  const newUrl = [
    domainWithProtocol,
    media,
    imgService,
    definedWidth,
    ...extraParts,
  ];

  return newUrl.join('/');
};

const buildIChefURL = ({ originCode, locator, resolution }) => {
  if (!originCode) return '';

  if (!locator) return '';

  if (originCode === 'pips') {
    return locator;
  }

  if (originCode === 'mpv') {
    return buildPlaceholderSrc(locator, resolution);
  }

  return `https://ichef.bbci.co.uk/news/${resolution}/${originCode}/${locator}`;
};

export default buildIChefURL;
