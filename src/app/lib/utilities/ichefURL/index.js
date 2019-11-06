const getPlaceholderSrc = src => {
  const parts = src.split('/');
  const [domain, media, imgService, width, ...extraParts] = parts;
  const definedWidth = width.replace('$width', '512');
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

const getIChefURL = ({ originCode, locator, resolution }) => {
  if (originCode === 'pips') {
    return locator;
  }

  if (originCode === 'mpv') {
    return getPlaceholderSrc(locator);
  }

  return `https://ichef.bbci.co.uk/news/${resolution}/${originCode}/${locator}`;
};

export default getIChefURL;
