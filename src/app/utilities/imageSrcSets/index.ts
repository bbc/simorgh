import { Theme } from '@emotion/react';
import buildIChefURL from '#app/lib/utilities/ichefURL';
import getOriginCode from '#app/lib/utilities/imageSrcHelpers/originCode';
import getLocator from '#app/lib/utilities/imageSrcHelpers/locator';

const DEFAULT_RESOLUTIONS = [240, 320, 480, 624, 800];
export const MULTILINE_SRCSET_SEPARATOR = ', \n                          ';

type IchefSrcSetParams = {
  originCode?: string;
  locator?: string;
  originalImageWidth: number;
  imageResolutions?: number[];
  srcResolution?: number;
};

type PrepareIchefImageParams = Pick<
  IchefSrcSetParams,
  'originalImageWidth' | 'imageResolutions' | 'srcResolution'
> & {
  imageUrlTemplate: string;
};

type PlaceholderSrcSetParams = Pick<
  IchefSrcSetParams,
  'originCode' | 'locator'
>;

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
      src:
        srcResolution === undefined
          ? undefined
          : buildIChefURL({
              originCode,
              locator,
              resolution: srcResolution,
            }),
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

// Derives the originCode/locator from an iChef template url before building the srcset
export const prepareIchefImage = ({
  imageUrlTemplate,
  originalImageWidth,
  imageResolutions,
  srcResolution,
}: PrepareIchefImageParams) => {
  const url = imageUrlTemplate.split('{width}')[1];

  return createIchefSrcSet({
    originCode: getOriginCode(url),
    locator: getLocator(url),
    originalImageWidth,
    imageResolutions,
    srcResolution,
  });
};

const defaultSizesBuilder = ({
  widths,
  mq,
}: {
  widths: number[];
  mq: Theme['mq'];
}) => {
  if (widths.length < 3) {
    throw new Error(
      'createResponsiveSrcSet requires at least three widths when using the default sizes builder.',
    );
  }

  return `${mq.GROUP_2_MAX_WIDTH.replace('@media ', '')} ${widths[0]}px, ${widths[2]}px`;
};

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
}: PlaceholderSrcSetParams) => {
  if (!originCode || !locator) return '';
  return DEFAULT_RESOLUTIONS.map(
    resolution =>
      `${buildIChefURL({ originCode, locator, resolution })} ${resolution}w`,
  ).join(', ');
};
