const getImageBlock = (type, blockData, isAmp) => {
  const supportedImageTypes = ['idt2'];

  if (!supportedImageTypes.includes(type)) return null;

  const imageData = blockData[type];

  const getSrc = href => {
    return `${process.env.SIMORGH_INCLUDES_BASE_URL}${href}`;
  };

  const getSize = href => href.split('/').pop();

  const getSrcSet = sizes =>
    sizes.map(({ href }) => `${getSrc(href)} ${getSize(href)}w`).join(',');

  const getImageProps = ({ small, medium, large }) => {
    const defaultImage = isAmp ? medium : large;

    const { height, width, href } = defaultImage;

    return {
      src: getSrc(href),
      srcset: isAmp ? getSrcSet([small, medium]) : getSrcSet([medium, large]),
      height,
      width,
      layout: 'responsive',
    };
  };

  const { altText, dimensions } = imageData;

  return {
    alt: altText,
    ...getImageProps(dimensions),
  };
};

export default getImageBlock;
