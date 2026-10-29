import {
  use,
  useState,
  type CSSProperties,
  type ReactNode,
  type Ref,
} from 'react';
import NextImage, { getImageProps } from 'next/image';
import Head from 'next/head';
import { RequestContext } from '#app/contexts/RequestContext';
import BASE64_PLACEHOLDER_IMAGE from '#app/components/Image/base64Placeholder';
import {
  createImageSources,
  ichefLoader,
  withJpegFallback,
} from '#nextjs/utilities/imagePoc';
import styles from './ImagePocAdapter.module.scss';

type Props = {
  src?: string;
  alt: string;
  width?: number;
  height?: number;
  sizes?: string;
  aspectRatio?: [number, number];
  lazyLoad?: boolean;
  preload?: boolean;
  fetchPriority?: 'high';
  attribution?: string;
  placeholder?: boolean;
  darkPlaceholder?: boolean;
  className?: string;
  children?: ReactNode;
  imageRef?: Ref<HTMLImageElement>;
  style?: CSSProperties;
  hasCaption?: boolean;
  format?: 'webp' | 'jpeg';
};

type ImageStyle = CSSProperties & {
  '--image-aspect-ratio': string;
  '--image-placeholder': string;
};

const ImagePocAdapter = ({
  src,
  alt,
  width,
  height,
  sizes,
  aspectRatio,
  lazyLoad = false,
  preload = false,
  fetchPriority,
  attribution,
  placeholder = true,
  darkPlaceholder = false,
  className: consumerClassName,
  children,
  imageRef,
  style: consumerStyle,
  hasCaption = false,
  format = 'webp',
}: Props) => {
  const { isAmp, isLite } = use(RequestContext);
  const [loadedSrc, setLoadedSrc] = useState<string>();

  // Lite must omit both image markup and preload hints.
  if (isLite) return null;

  // Track the loaded source so changing src restores the loading placeholder.
  const showPlaceholder = !src || (placeholder && loadedSrc !== src);
  const hasDimensions = Boolean(width && height);
  const resolvedWidth = width ?? 624;
  const resolvedHeight = height ?? 351;
  const resolvedSizes = sizes ?? '100vw';
  const resolvedAspectRatio =
    aspectRatio ??
    (hasDimensions ? [resolvedWidth, resolvedHeight] : undefined);
  // Shared CSS reserves the crop ratio even while loading or without a source.
  const style: ImageStyle = {
    '--image-aspect-ratio': resolvedAspectRatio
      ? `${resolvedAspectRatio[0]} / ${resolvedAspectRatio[1]}`
      : 'auto',
    '--image-placeholder': `url(${BASE64_PLACEHOLDER_IMAGE})`,
  };
  const className = [
    styles.wrapper,
    showPlaceholder && styles.placeholder,
    darkPlaceholder && styles.darkPlaceholder,
    !hasCaption && styles.clip,
    consumerClassName,
  ]
    .filter(Boolean)
    .join(' ');

  // Missing images retain the BBC placeholder without passing an empty src to Next.js.
  if (!src)
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );

  const sources = createImageSources(src);
  const primaryTemplate =
    format === 'jpeg' ? withJpegFallback(src) : sources.primaryTemplate;
  // Next.js generates WebP candidates; the custom loader keeps delivery on iChef,
  // bypassing Next.js's default optimisation endpoint.
  const { props: webp } = getImageProps({
    alt,
    src: primaryTemplate,
    loader: ichefLoader,
    width: resolvedWidth,
    height: resolvedHeight,
    sizes: resolvedSizes,
  });
  // AMP uses explicit candidates and dedicated markup, not a NextImage instance.
  const primarySrcSet = (() => {
    if (!isAmp) return webp.srcSet;
    return format === 'jpeg' ? sources.fallbackSrcSet : sources.primarySrcSet;
  })();
  const imageSrc = format === 'jpeg' ? withJpegFallback(src) : src;

  return (
    <>
      {/* Match the WebP source's candidates and sizes so its preload can be reused.
          This does not preload the JPEG path in browsers without WebP support. */}
      {preload && (
        <Head>
          <link
            key={`image-poc-preload-${src}`}
            rel="preload"
            as="image"
            type="image/webp"
            imageSrcSet={primarySrcSet}
            imageSizes={resolvedSizes}
            fetchPriority={fetchPriority}
          />
        </Head>
      )}
      <div className={className} style={{ ...style, ...consumerStyle }}>
        {isAmp ? (
          <amp-img
            class={styles.image}
            layout={hasDimensions ? 'responsive' : 'fill'}
            alt={alt}
            src={
              format === 'jpeg'
                ? imageSrc.replace('{width}', '624')
                : sources.src
            }
            srcSet={primarySrcSet}
            sizes={resolvedSizes}
            width={width}
            height={height}
            attribution={attribution}
            fallback=""
            {...(preload && { 'data-hero': 'true' })}
          />
        ) : (
          // The browser prefers WebP when supported and otherwise uses the JPEG img.
          // This format fallback does not retry JPEG after a failed WebP request.
          <picture>
            {format === 'webp' && (
              <source
                type="image/webp"
                srcSet={webp.srcSet}
                sizes={resolvedSizes}
              />
            )}
            <NextImage
              ref={imageRef}
              className={styles.image}
              alt={alt}
              src={imageSrc}
              loader={ichefLoader}
              {...(hasDimensions ? { width, height } : { fill: true })}
              sizes={resolvedSizes}
              loading={lazyLoad ? 'lazy' : 'eager'}
              fetchPriority={fetchPriority}
              style={consumerStyle}
              onLoad={() => setLoadedSrc(src)}
            />
          </picture>
        )}
        {children}
      </div>
    </>
  );
};

export default ImagePocAdapter;
