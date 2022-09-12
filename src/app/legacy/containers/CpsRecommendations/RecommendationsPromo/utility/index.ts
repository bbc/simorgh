import pathOr from 'ramda/src/pathOr';

const optimoToCPSImage = ({ cpsImage }) => {
  if (!cpsImage) return null;
  const imageBlock = ['defaultPromoImage', 'blocks', 1, 'model'];

  const width = pathOr(null, imageBlock.concat(['width']), cpsImage);
  const height = pathOr(null, imageBlock.concat(['height']), cpsImage);
  const copyrightHolder = pathOr(
    null,
    imageBlock.concat(['copyrightHolder']),
    cpsImage,
  );
  const optimoLocator = pathOr(null, imageBlock.concat(['locator']), cpsImage);
  const optimoOriginCode = pathOr(
    null,
    imageBlock.concat(['originCode']),
    cpsImage,
  );
  const altText = pathOr(
    null,
    [
      'defaultPromoImage',
      'blocks',
      0,
      'model',
      'blocks',
      0,
      'model',
      'blocks',
      0,
      'model',
      'text',
    ],
    cpsImage,
  );
  return {
    width,
    height,
    copyrightHolder,
    optimoLocator,
    altText,
    optimoOriginCode,
  };
};

export default optimoToCPSImage;
