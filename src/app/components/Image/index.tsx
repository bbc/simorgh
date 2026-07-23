import { Fragment, PropsWithChildren, useState, use } from 'react';
import { Global } from '@emotion/react';
import { Helmet } from 'react-helmet';
import styles from './index.styles';
import { RequestContext } from '../../contexts/RequestContext';
import { HOME_PAGE } from '../../routes/utils/pageTypes';

export type BreakpointSource = {
  // CSS media condition gating this source, e.g. '(min-width: 1280px)'.
  // Omit only for the final, catch-all entry (must be listed last).
  media?: string;
  srcSet: string;
  fallbackSrcSet: string;
  sizes: string;
};

export type ImageProps = {
  alt: string;
  aspectRatio?: [x: number, y: number];
  attribution?: string;
  breakpointSources?: BreakpointSource[];
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
  src?: string;
  width?: number;
  fetchPriority?: 'high';
  hasCaption?: boolean;
  isPortraitOrientation?: boolean;
  style?: React.CSSProperties;
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
  breakpointSources,
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
  style,
}: PropsWithChildren<ImageProps>) => {
  const { pageType, isLite, isAmp } = use(RequestContext);
  const [isLoaded, setIsLoaded] = useState(false);
  if (isLite) return null;
  const showPlaceholder = !src || (placeholder && !isLoaded);
  const hasDimensions = width && height;
  const hasFixedAspectRatio = !!aspectRatio || !!hasDimensions;
  const [aspectRatioX, aspectRatioY] = aspectRatio ||
    (hasDimensions && [width, height]) || [null, null];

  const legacyBrowserAspectRatio = getLegacyBrowserAspectRatio(
    aspectRatioX as number,
    aspectRatioY as number,
  );

  const hasBreakpointSources =
    Boolean(breakpointSources?.length) && pageType === HOME_PAGE;
  const hasFallback =
    !hasBreakpointSources &&
    !!srcSet &&
    !!fallbackSrcSet &&
    pageType === HOME_PAGE;
  const ImageWrapper =
    hasBreakpointSources || hasFallback ? 'picture' : Fragment;
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
  return (
    <>
      {preload && (
        <Helmet>
          {hasBreakpointSources ? (
            breakpointSources!.map(
              ({ media, srcSet: breakpointSrcSet, sizes: breakpointSizes }) => (
                <link
                  key={media ?? 'default'}
                  rel="preload"
                  as="image"
                  href={src}
                  media={media}
                  imageSrcSet={breakpointSrcSet}
                  imageSizes={breakpointSizes}
                  {...(fetchPriority && { fetchPriority })}
                />
              ),
            )
          ) : (
            <link
              rel="preload"
              as="image"
              href={src}
              imageSrcSet={srcSet}
              imageSizes={sizes}
              {...(fetchPriority && { fetchPriority })}
            />
          )}
        </Helmet>
      )}
      <div
        className={className}
        css={theme => [
          styles.wrapper,
          hasFixedAspectRatio
            ? styles.wrapperFixedAspectRatio
            : styles.wrapperResponsiveRatio,
          isPortraitOrientation && styles.portraitOrientation,
          showPlaceholder && [
            styles.placeholder,
            {
              backgroundColor: darkPlaceholder
                ? theme.palette.SHADOW
                : theme.palette.LUNAR,
            },
          ],
        ]}
        style={{
          paddingBottom: hasFixedAspectRatio ? legacyBrowserAspectRatio : 0,
          ...(!hasCaption && { overflow: 'hidden' }),
        }}
      >
        {src &&
          (isAmp ? (
            <>
              {!hasDimensions && (
                // ensures amp-img will render when width and height is not provided
                // https://amp.dev/documentation/examples/style-layout/how_to_support_images_with_unknown_dimensions/
                <Global
                  styles={{
                    '.bbc-image img': {
                      objectFit: 'cover',
                    },
                  }}
                />
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
              {hasBreakpointSources &&
                breakpointSources!.map(
                  ({
                    media,
                    srcSet: breakpointSrcSet,
                    fallbackSrcSet: breakpointFallbackSrcSet,
                    sizes: breakpointSizes,
                  }) => (
                    <Fragment key={media ?? 'default'}>
                      <source
                        media={media}
                        srcSet={breakpointSrcSet}
                        type={mediaType}
                        sizes={breakpointSizes}
                      />
                      <source
                        media={media}
                        srcSet={breakpointFallbackSrcSet}
                        type={fallbackMediaType}
                        sizes={breakpointSizes}
                      />
                    </Fragment>
                  ),
                )}
              {hasFallback && (
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
                css={[
                  styles.image,
                  hasFixedAspectRatio
                    ? styles.imageFixedAspectRatio
                    : styles.imageResponsiveRatio,
                ]}
                fetchPriority={fetchPriority}
                style={{
                  aspectRatio: hasFixedAspectRatio
                    ? `${aspectRatioX} / ${aspectRatioY}`
                    : 'auto',
                  ...style,
                }} // aspectRatio used in combination with the objectFit:cover will center the image horizontally and vertically if aspectRatio prop is different from image's intrinsic aspect ratio
              />
            </ImageWrapper>
          ))}
        {children}
      </div>
    </>
  );
};

export default Image;
