/** @jsx jsx */
import { useContext } from 'react';
import { jsx } from '@emotion/react';
import { ServiceContext } from '#contexts/ServiceContext';
import Image from '#app/components/Image';
import { createSrcsets } from '#app/lib/utilities/srcSet';
import getOriginCode from '#app/lib/utilities/imageSrcHelpers/originCode';
import getLocator from '#app/lib/utilities/imageSrcHelpers/locator';
import styles from './styles';

const MaskedImage = ({
  imageUrl,
  imageUrlTemplate,
  imageWidth,
}: {
  imageUrl: string;
  imageUrlTemplate: string;
  imageWidth: number;
}) => {
  const { dir } = useContext(ServiceContext);
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
    <div css={styles.wrapper}>
      <div
        css={[
          styles.maskedImage,
          isRtl ? styles.linearGradientRtl : styles.linearGradientLtr,
        ]}
      >
        <Image
          alt=""
          src={imageUrl}
          // aspectRatio={[16, 9]}
          srcSet={primarySrcset || undefined}
          fallbackSrcSet={fallbackSrcset || undefined}
          mediaType={primaryMimeType || undefined}
          fallbackMediaType={fallbackMimeType || undefined}
          sizes="(min-width: 1008px) 660px, 100vw"
        />
      </div>
    </div>
  );
};

export default MaskedImage;
