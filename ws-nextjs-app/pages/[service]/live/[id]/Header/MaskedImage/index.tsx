/** @jsx jsx */
import { jsx } from '@emotion/react';
import Image from '#app/components/Image';
import { createSrcsets } from '#app/lib/utilities/srcSet';
import getOriginCode from '#app/lib/utilities/imageSrcHelpers/originCode';
import getLocator from '#app/lib/utilities/imageSrcHelpers/locator';
import styles from './styles';

const MaskedImage = ({
  imageUrl,
  imageUrlTemplate,
  imageWidth = 480, // is this a good fallback?
}: {
  imageUrl: string;
  imageUrlTemplate: string;
  imageWidth?: number;
}) => {
  const url = imageUrlTemplate.split('{width}')[1];

  const originCode = getOriginCode(url);
  const locator = getLocator(url);

  const { primarySrcset, primaryMimeType, fallbackSrcset, fallbackMimeType } =
    createSrcsets({
      originCode,
      locator,
      originalImageWidth: imageWidth,
    });

  return (
    <div css={styles.maskedImage}>
      <Image
        alt=""
        src={imageUrl}
        aspectRatio={[16, 9]}
        srcSet={primarySrcset || undefined}
        fallbackSrcSet={fallbackSrcset || undefined}
        mediaType={primaryMimeType || undefined}
        fallbackMediaType={fallbackMimeType || undefined}
        sizes="(max-width: 1008px) 645px, 100vw" // To update
      />
    </div>
  );
};

export default MaskedImage;
