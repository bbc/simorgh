/** @jsx jsx */
import { useContext } from 'react';
import { jsx } from '@emotion/react';
import { ServiceContext } from '#contexts/ServiceContext';
import { RequestContext } from '#app/contexts/RequestContext';
import Image from '#app/components/Image';
import { createSrcsets } from '#app/lib/utilities/srcSet';
import getOriginCode from '#app/lib/utilities/imageSrcHelpers/originCode';
import getLocator from '#app/lib/utilities/imageSrcHelpers/locator';
import styles from './styles';

const MaskedImage = ({
  imageUrl,
  imageUrlTemplate,
  imageWidth,
  altText = '',
  showPlaceholder = true,
}: {
  imageUrl: string;
  imageUrlTemplate: string;
  imageWidth: number;
  altText?: string;
  showPlaceholder?: boolean;
}) => {
  const { dir } = useContext(ServiceContext);
  const { isAmp } = useContext(RequestContext);

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

  return (
    <div
      css={[
        styles.maskedImageWrapper,
        isRtl ? styles.linearGradientRtl : styles.linearGradientLtr,
      ]}
    >
      <Image
        alt={altText}
        src={imageUrl}
        isAmp={isAmp}
        srcSet={primarySrcset || undefined}
        fallbackSrcSet={fallbackSrcset || undefined}
        mediaType={primaryMimeType || undefined}
        fallbackMediaType={fallbackMimeType || undefined}
        sizes="(min-width: 1008px) 660px, 100vw"
        width={800}
        height={533}
        fetchpriority="high"
        preload
        placeholder={showPlaceholder}
      />
    </div>
  );
};

export default MaskedImage;
