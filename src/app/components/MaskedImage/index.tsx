import { use } from 'react';
import { ServiceContext } from '#contexts/ServiceContext';
import Image from '#app/components/Image';
import { prepareIchefImage } from '#app/utilities/imageSrcSets';
import styles from './styles';

type Props = {
  imageUrl?: string;
  imageUrlTemplate: string;
  imageWidth: number;
  altText?: string;
  showPlaceholder?: boolean;
  showVignette?: boolean;
  singleImageLayout?: boolean;
  preload?: boolean;
};

const getGradientStyles = ({
  isRtl,
  showVignette,
  disableExtraWideMask,
}: {
  isRtl: boolean;
  showVignette: boolean;
  disableExtraWideMask: boolean;
}) => {
  if (showVignette) return [styles.vignette(isRtl)];

  const gradients = [
    isRtl ? styles.linearGradientRtl : styles.linearGradientLtr,
  ];

  if (disableExtraWideMask) {
    gradients.push(styles.disableExtraWideMask(isRtl));
  }

  return gradients;
};

const MaskedImage = ({
  imageUrl,
  imageUrlTemplate,
  imageWidth,
  altText = '',
  showPlaceholder = true,
  showVignette = false,
  singleImageLayout = false,
  preload = false,
}: Props) => {
  const { dir } = use(ServiceContext);
  const isRtl = dir === 'rtl';

  const { primarySrcset, primaryMimeType, fallbackSrcset, fallbackMimeType } =
    prepareIchefImage({
      imageUrlTemplate,
      originalImageWidth: imageWidth,
    });

  const shouldFillHeight = singleImageLayout;
  const shouldDisableExtraWideMask = singleImageLayout;

  const gradientStyles = getGradientStyles({
    isRtl,
    showVignette,
    disableExtraWideMask: shouldDisableExtraWideMask,
  });

  return (
    <div
      css={[
        styles.maskedImageWrapper,
        ...gradientStyles,
        shouldFillHeight && styles.fullHeight,
      ]}
    >
      <Image
        alt={altText}
        src={imageUrl}
        srcSet={primarySrcset || undefined}
        fallbackSrcSet={fallbackSrcset || undefined}
        mediaType={primaryMimeType || undefined}
        fallbackMediaType={fallbackMimeType || undefined}
        sizes="(min-width: 1008px) 660px, 100vw"
        {...(shouldFillHeight ? {} : { width: 800, height: 533 })}
        fetchPriority={preload ? 'high' : undefined}
        preload={preload}
        placeholder={showPlaceholder}
      />
    </div>
  );
};

export default MaskedImage;
