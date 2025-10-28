/** @jsx jsx */
import { use } from 'react';
import { jsx } from '@emotion/react';
import { ServiceContext } from '#contexts/ServiceContext';
import Image from '#app/components/Image';
import buildIChefURL from '#app/lib/utilities/ichefURL';
import { createSrcsets } from '#app/lib/utilities/srcSet';
import getOriginCode from '#app/lib/utilities/imageSrcHelpers/originCode';
import getLocator from '#app/lib/utilities/imageSrcHelpers/locator';
import styles from './styles';

type Props = {
  imageUrl?: string;
  imageUrlTemplate: string;
  imageWidth: number;
  altText?: string;
  showPlaceholder?: boolean;
  showVignette?: boolean;
  isLivePageHeaderImage?: boolean;
};

const getGradientStyles = ({
  isRtl,
  showVignette,
}: {
  isRtl: boolean;
  showVignette: boolean;
}) => {
  if (showVignette) return styles.vignette(isRtl);

  if (isRtl) return styles.linearGradientRtl;

  return styles.linearGradientLtr;
};

const MaskedImage = ({
  imageUrl,
  imageUrlTemplate,
  imageWidth,
  altText = '',
  showPlaceholder = true,
  showVignette = false,
  isLivePageHeaderImage = false,
}: Props) => {
  const { dir } = use(ServiceContext);
  const isRtl = dir === 'rtl';

  const url = imageUrlTemplate.split('{width}')[1];

  const originCode = getOriginCode(url);
  const locator = getLocator(url);

  const { primarySrcset, primaryMimeType, fallbackSrcset, fallbackMimeType } =
    createSrcsets({
      originCode,
      locator,
      originalImageWidth: imageWidth,
    });

  const DEFAULT_IMAGE_RES = 480;
  const srcWebp = buildIChefURL({
    originCode,
    locator,
    resolution: DEFAULT_IMAGE_RES,
  });

  const gradientStyles = getGradientStyles({ isRtl, showVignette });

  return (
    <div css={[styles.maskedImageWrapper, gradientStyles]}>
      <Image
        alt={altText}
        src={isLivePageHeaderImage ? srcWebp : imageUrl}
        srcSet={primarySrcset || undefined}
        fallbackSrcSet={fallbackSrcset || undefined}
        mediaType={primaryMimeType || undefined}
        fallbackMediaType={fallbackMimeType || undefined}
        sizes="(min-width: 1008px) 660px, 100vw"
        width={800}
        height={533}
        fetchPriority="high"
        preload
        placeholder={showPlaceholder}
      />
    </div>
  );
};

export default MaskedImage;
