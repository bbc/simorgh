import { use, useState, type CSSProperties } from 'react';
import NextImage, { getImageProps } from 'next/image';
import { RequestContext } from '#app/contexts/RequestContext';
import BASE64_PLACEHOLDER_IMAGE from '#app/components/Image/base64Placeholder';
import { ichefLoader, isImageAdapterSource } from './ichefLoader';
import styles from './index.module.scss';

// Matches the existing promo `src` for browsers without srcset support, such as Opera Mini.
const FALLBACK_SRC_WIDTH = 240;

export type ImageAdapterProps = {
  src?: string;
  alt: string;
  width: number;
  height: number;
  sizes: string;
  loading?: 'lazy' | 'eager' | 'priority';
  placeholder?: 'light' | 'dark' | 'none';
  className?: string;
};

type WrapperStyle = CSSProperties & { '--image-adapter-placeholder': string };

const toPercentage = (value: number) => `${Math.round(value * 10000) / 100}%`;

// Canonical-only. AMP and Lite stay on the existing Image component until replacements are validated.
const ImageAdapter = ({
  src,
  alt,
  width,
  height,
  sizes,
  loading = 'lazy',
  placeholder = 'light',
  className,
}: ImageAdapterProps) => {
  const { isAmp, isLite } = use(RequestContext);
  const [loadedSrc, setLoadedSrc] = useState<string>();

  if (isAmp || isLite) return null;

  const hasValidSrc = isImageAdapterSource(src);
  const showPlaceholder =
    !hasValidSrc || (placeholder !== 'none' && loadedSrc !== src);

  const wrapperClassName = [
    styles.wrapper,
    showPlaceholder && styles.placeholder,
    showPlaceholder && placeholder === 'dark' && styles.darkPlaceholder,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // Padding-based ratio matches the existing Image component for browsers without CSS aspect-ratio.
  const wrapperStyle: WrapperStyle = {
    paddingBottom: toPercentage(height / width),
    '--image-adapter-placeholder': `url(${BASE64_PLACEHOLDER_IMAGE})`,
  };

  if (!hasValidSrc) {
    return <div className={wrapperClassName} style={wrapperStyle} />;
  }

  const isPriority = loading === 'priority';
  // The BFF owns the format: a `.webp` template gets a WebP <source>, with the original format as the fallback.
  const isWebpTemplate = src.endsWith('.webp');
  const fallbackTemplate = isWebpTemplate ? src.slice(0, -'.webp'.length) : src;
  const webpSrcSet = isWebpTemplate
    ? getImageProps({
        src,
        alt,
        width,
        height,
        sizes,
        loader: ichefLoader,
      }).props.srcSet
    : undefined;

  const image = (
    <NextImage
      src={fallbackTemplate}
      overrideSrc={src.replace('{width}', String(FALLBACK_SRC_WIDTH))}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      loader={ichefLoader}
      loading={isPriority ? 'eager' : loading}
      {...(isPriority && { fetchPriority: 'high' as const })}
      className={styles.image}
      style={{ aspectRatio: `${width} / ${height}` }}
      onLoad={() => setLoadedSrc(src)}
    />
  );

  return (
    <div className={wrapperClassName} style={wrapperStyle}>
      {webpSrcSet ? (
        <picture>
          <source type="image/webp" srcSet={webpSrcSet} sizes={sizes} />
          {image}
        </picture>
      ) : (
        image
      )}
    </div>
  );
};

export default ImageAdapter;
