const getPlaceholderSrc = (src, imageWidth) => {
  const parts = src.split('/');
  const [domain, media, imgService, width, ...extraParts] = parts;
  const definedWidth = width.replace('$width', imageWidth);
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

export default getPlaceholderSrc;
