import { Theme } from '@emotion/react';
import buildIChefURL from '#app/lib/utilities/ichefURL';

const DEFAULT_RESOLUTIONS = [240, 320, 480, 624, 800];

type IchefSrcSetParams = {
  originCode?: string;
  locator?: string;
  originalImageWidth: number;
  imageResolutions?: number[];
  srcResolution?: number;
};

type ResponsiveSrcSetParams = {
  imageUrlTemplate?: string;
  mq: Theme['mq'];
  widths?: number[];
  sizesBuilder?: (args: { widths: number[]; mq: Theme['mq'] }) => string;
  imageWidthSmall?: number;
  imageWidthLarge?: number;
  srcSetSeparator?: string;
};

export const getMimeType = (srcset?: string | null) => {
  if (!srcset || typeof srcset !== 'string') return null;

  const [firstSrcset] = srcset.split(',');
  const [firstSrcsetUrl] = firstSrcset.trim().split(' ');
  const urlFileExtension = firstSrcsetUrl.split('.').pop();

  switch (urlFileExtension) {
    case 'webp':
      return 'image/webp';
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg';
    case 'png':
      return 'image/png';
    case 'gif':
      return 'image/gif';
    default:
      return null;
  }
};

export const createIchefSrcSet = ({
  originCode,
  locator,
  originalImageWidth,
  imageResolutions = DEFAULT_RESOLUTIONS,
  srcResolution,
}: IchefSrcSetParams) => {
  if (originCode === 'pips') {
    return {
      src: undefined,
      primarySrcset: undefined,
      primaryMimeType: undefined,
      fallbackSrcset: undefined,
      fallbackMimeType: undefined,
    };
  }

  const requiredResolutions = imageResolutions.filter(
    resolution => resolution <= originalImageWidth,
  );

  if (
    originalImageWidth < imageResolutions[imageResolutions.length - 1] &&
    !requiredResolutions.includes(originalImageWidth)
  ) {
    requiredResolutions.push(originalImageWidth);
  }

  const primarySrcset = requiredResolutions
    .map(
      resolution =>
        `${buildIChefURL({ originCode, locator, resolution })} ${resolution}w`,
    )
    .join(', ');
  const fallbackSrcset = primarySrcset.replaceAll('.webp', '');

  return {
    ...(srcResolution && {
      src: buildIChefURL({ originCode, locator, resolution: srcResolution }),
    }),
    primarySrcset,
    primaryMimeType: getMimeType(primarySrcset),
    fallbackSrcset,
    fallbackMimeType: getMimeType(fallbackSrcset),
  };
};

const defaultSizesBuilder = ({
  widths,
  mq,
}: {
  widths: number[];
  mq: Theme['mq'];
}) =>
  `${mq.GROUP_2_MAX_WIDTH.replace('@media ', '')} ${widths[0]}px, ${widths[2]}px`;

export const createResponsiveSrcSet = ({
  imageUrlTemplate,
  mq,
  widths,
  sizesBuilder = defaultSizesBuilder,
  imageWidthSmall = 128,
  imageWidthLarge = 512,
  srcSetSeparator = ', ',
}: ResponsiveSrcSetParams) => {
  if (imageUrlTemplate == null) return null;

  const resolvedWidths = widths || [
    imageWidthSmall,
    imageWidthSmall * 2,
    imageWidthLarge,
    imageWidthLarge * 2,
  ];
  const srcSet = resolvedWidths
    .map(
      width => `${imageUrlTemplate.replace('{width}', `${width}`)} ${width}w`,
    )
    .join(srcSetSeparator);

  return {
    srcSet,
    sizes: sizesBuilder({ widths: resolvedWidths, mq }),
  };
};

export const getPlaceholderSrcSet = ({
  originCode,
  locator,
}: IchefSrcSetParams) => {
  if (!originCode || !locator) return '';
  return DEFAULT_RESOLUTIONS.map(
    resolution =>
      `${buildIChefURL({ originCode, locator, resolution })} ${resolution}w`,
  ).join(', ');
};
