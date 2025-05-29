import { Theme } from '@emotion/react';

type GetSrcSetsParams = {
  imageUrlTemplate?: string;
  mq: Theme['mq'];
  imageWidthSmall?: number;
  imageWidthLarge?: number;
};

export default ({
  imageUrlTemplate,
  mq,
  imageWidthSmall = 128,
  imageWidthLarge = 512,
}: GetSrcSetsParams) => {
  const IMAGE_SRC_SMALL_2X_UPSCALE_WIDTH = imageWidthSmall * 2;
  const IMAGE_SRC_LARGE_2X_UPSCALE_WIDTH = imageWidthLarge * 2;

  if (imageUrlTemplate == null) return null;

  const replaceWidth = (width: number) =>
    imageUrlTemplate?.replace('{width}', `${width}`);

  const imgSrcSmall = replaceWidth(imageWidthSmall);
  const imgSrcSmall2x = replaceWidth(IMAGE_SRC_SMALL_2X_UPSCALE_WIDTH);
  const imgSrcLarge = replaceWidth(imageWidthLarge);
  const imgSrcLarge2x = replaceWidth(IMAGE_SRC_LARGE_2X_UPSCALE_WIDTH);

  return {
    srcSet: `${imgSrcSmall} ${imageWidthSmall}w, 
                          ${imgSrcSmall2x} ${IMAGE_SRC_SMALL_2X_UPSCALE_WIDTH}w, 
                          ${imgSrcLarge} ${imageWidthLarge}w, 
                          ${imgSrcLarge2x} ${IMAGE_SRC_LARGE_2X_UPSCALE_WIDTH}w`,
    sizes: `${mq.GROUP_2_MAX_WIDTH.replace('@media ', '')} ${imageWidthSmall}px, ${imageWidthLarge}px`,
  };
};
