import htmlUnescape from '#app/routes/utils/htmlUnescape';
import { getEnvConfig } from '#app/lib/utilities/getEnvConfig';

const getImageBlock = (type, blockData, isAmp) => {
  const supportedImageTypes = ['idt2'];

  const imageData = blockData[type];

  if (!supportedImageTypes.includes(type) || !imageData) return null;

  const getSrc = href => {
    return `${getEnvConfig().SIMORGH_INCLUDES_BASE_URL}${href}`;
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
    alt: htmlUnescape(altText),
    ...getImageProps(dimensions),
  };
};

export default getImageBlock;
