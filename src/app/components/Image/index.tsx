import React, { Fragment, PropsWithChildren, useState, use } from 'react';
import { Helmet } from 'react-helmet';
import { RequestContext } from '../../contexts/RequestContext';
import { HOME_PAGE } from '../../routes/utils/pageTypes';
import BASE64_PLACEHOLDER_IMAGE from './base64Placeholder';

export type ImageProps = {
  alt: string;
  aspectRatio?: [x: number, y: number];
  attribution?: string;
  className?: string;
  fallbackMediaType?: string;
  fallbackSrcSet?: string;
  height?: number;
  lazyLoad?: boolean;
  placeholder?: boolean;
  darkPlaceholder?: boolean;
  preload?: boolean;
  mediaType?: string;
  srcSet?: string;
  sizes?: string;
  src: string;
  width?: number;
  fetchPriority?: 'high';
  hasCaption?: boolean;
  isPortraitOrientation?: boolean;
};

const roundNumber = (num: number) => Math.round(num * 100) / 100;
const getLegacyBrowserAspectRatio = (x: number, y: number) =>
  roundNumber((y / x) * 100)
    .toString()
    .concat('%');

const Image = ({
  alt,
  aspectRatio,
  attribution,
  className,
  fallbackMediaType,
  fallbackSrcSet,
  height,
  lazyLoad = false,
  placeholder = true,
  darkPlaceholder = false,
  preload = false,
  mediaType,
  srcSet,
  sizes,
  src,
  width,
  children,
  fetchPriority,
  hasCaption,
  isPortraitOrientation,
}: PropsWithChildren<ImageProps>) => {
  const { pageType, isLite, isAmp } = use(RequestContext);
  const [isLoaded, setIsLoaded] = useState(false);
  if (isLite) return null;

  const showPlaceholder = placeholder && !isLoaded;
  const hasDimensions = width && height;
  const hasFixedAspectRatio = !!aspectRatio || !!hasDimensions;
  const [aspectRatioX, aspectRatioY] = aspectRatio ||
    (hasDimensions && [width, height]) || [null, null];

  const legacyBrowserAspectRatio = getLegacyBrowserAspectRatio(
    aspectRatioX as number,
    aspectRatioY as number,
  );

  const hasFallback = srcSet && fallbackSrcSet && pageType === HOME_PAGE;
  const ImageWrapper = hasFallback ? 'picture' : Fragment;
  const ampImgLayout = hasDimensions ? 'responsive' : 'fill';
  const getImgSrcSet = () => {
    if (!hasFallback) return srcSet;
    if (pageType !== HOME_PAGE) {
      return fallbackSrcSet;
    }
    return undefined;
  };
  const getImgSizes = () => {
    if ((!hasFallback && srcSet) || pageType !== HOME_PAGE) {
      return sizes;
    }
    return undefined;
  };
  const imgSrcSet = getImgSrcSet();
  const imgSizes = getImgSizes();
  
  const placeholderBackgroundStyle = {
    backgroundImage: `url(${BASE64_PLACEHOLDER_IMAGE})`,
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '60px 17px',
    '@media (min-width: 37.5rem)': {
      backgroundSize: '77px 22px',
    },
    '@media (min-width: 63rem)': {
      backgroundSize: '93px 27px',
    },
  };
  
  return (
    <>
      {preload && (
        <Helmet>
          <link
            rel="preload"
            as="image"
            href={src}
            imageSrcSet={srcSet}
            imageSizes={sizes}
          />
        </Helmet>
      )}
      <div
        className={`
          relative
          ${hasFixedAspectRatio ? 'h-0' : 'h-full'}
          ${isPortraitOrientation ? 'absolute' : ''}
          ${className || ''}
        `}
        style={{
          paddingBottom: hasFixedAspectRatio ? legacyBrowserAspectRatio : 0,
          ...(!hasCaption && { overflow: 'hidden' }),
          ...(showPlaceholder && {
            backgroundColor: darkPlaceholder ? '#0A0A0A' : '#F5F5F5',
            ...placeholderBackgroundStyle,
          }),
        }}
      >
        {isAmp ? (
          <>
            {!hasDimensions && (
              <style>{`
                .bbc-image img {
                  object-fit: cover;
                }
              `}</style>
            )}
            <amp-img
              class="bbc-image"
              layout={ampImgLayout}
              alt={alt}
              src={src}
              width={width}
              height={height}
              fallback=""
              attribution={attribution}
              {...(srcSet && { srcSet: imgSrcSet })}
              {...(imgSizes && { sizes: imgSizes })}
              {...(preload && { 'data-hero': 'true' })}
            />
          </>
        ) : (
          <ImageWrapper>
            {hasFallback && pageType === HOME_PAGE && (
              <>
                <source srcSet={srcSet} type={mediaType} sizes={sizes} />
                <source
                  srcSet={fallbackSrcSet}
                  type={fallbackMediaType}
                  sizes={sizes}
                />
              </>
            )}
            <img
              onLoad={() => setIsLoaded(true)}
              src={src}
              {...(srcSet && { srcSet: imgSrcSet })}
              {...(imgSizes && { sizes: imgSizes })}
              alt={alt}
              loading={lazyLoad ? 'lazy' : 'eager'}
              width={width}
              height={height}
              className={`
                w-full
                object-cover
                ${hasFixedAspectRatio ? 'h-auto' : 'h-full'}
              `}
              fetchPriority={fetchPriority}
              style={{
                aspectRatio: hasFixedAspectRatio
                  ? `${aspectRatioX} / ${aspectRatioY}`
                  : 'auto',
              }}
            />
          </ImageWrapper>
        )}
        {children}
      </div>
    </>
  );
};

export default Image;
