/** @jsxRuntime classic */
/** @jsx jsx */
/* @jsxFrag React.Fragment */
import React, {
  Fragment,
  PropsWithChildren,
  useState,
  useContext,
} from 'react';
import { Global, jsx } from '@emotion/react';
import { Helmet } from 'react-helmet';
import styles from './index.styles';
import { RequestContext } from '../../contexts/RequestContext';
import { FRONT_PAGE } from '../../routes/utils/pageTypes';

type Props = {
  alt: string;
  aspectRatio?: [x: number, y: number];
  attribution?: string;
  className?: string;
  fallbackMediaType?: string;
  fallbackSrcSet?: string;
  height?: number;
  isAmp?: boolean;
  lazyLoad?: boolean;
  placeholder?: boolean;
  darkPlaceholder?: boolean;
  preload?: boolean;
  mediaType?: string;
  srcSet?: string;
  sizes?: string;
  src: string;
  width?: number;
  fetchpriority?: 'high';
};

// having issues removing this because I get an error:
// Type '0 | [x: number, y: number] | undefined' must have a '[Symbol.iterator]()' method that returns an iterator.
const DEFAULT_ASPECT_RATIO = [16, 9];
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
  isAmp = false,
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
  fetchpriority,
}: PropsWithChildren<Props>) => {
  const { pageType } = useContext(RequestContext);
  const [isLoaded, setIsLoaded] = useState(false);
  const showPlaceholder = placeholder && !isLoaded;
  const hasDimensions = width && height;
  const hasFixedAspectRatio = !!aspectRatio || !!hasDimensions;

  // ideally this wouldn't run every time
  const [aspectRatioX, aspectRatioY] =
    (aspectRatio && aspectRatio) ||
    (hasDimensions && [width, height]) ||
    DEFAULT_ASPECT_RATIO;

  const legacyBrowserAspectRatio = getLegacyBrowserAspectRatio(
    aspectRatioX,
    aspectRatioY,
  );

  const hasFallback = srcSet && fallbackSrcSet;
  const ImageWrapper = hasFallback ? 'picture' : Fragment;
  const ampImgLayout = hasDimensions ? 'responsive' : 'fill';

  const getImgSrcSet = () => {
    if (!hasFallback) return srcSet;
    if (pageType !== FRONT_PAGE) return fallbackSrcSet;
    return undefined;
  };
  const getImgSizes = () => {
    if ((!hasFallback && srcSet) || pageType !== FRONT_PAGE) return sizes;
    return undefined;
  };

  return (
    <>
      {preload && (
        <Helmet>
          <link
            rel="preload"
            as="image"
            href={src}
            imagesrcset={srcSet}
            imagesizes={sizes}
          />
        </Helmet>
      )}
      <div
        className={className}
        css={theme => [
          styles.wrapper,
          hasFixedAspectRatio ? styles.heightNone : styles.heightFull,
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
        }}
      >
        {isAmp ? (
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
              srcSet={getImgSrcSet()}
              sizes={getImgSizes()}
              fallback=""
              attribution={attribution}
              {...(preload && { 'data-hero': true })}
            />
          </>
        ) : (
          <ImageWrapper>
            {hasFallback && pageType === FRONT_PAGE && (
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
              srcSet={getImgSrcSet()}
              sizes={getImgSizes()}
              alt={alt}
              loading={lazyLoad ? 'lazy' : undefined}
              width={width}
              height={height}
              css={[
                styles.image,
                hasFixedAspectRatio ? styles.heightAuto : styles.heightFull,
              ]}
              fetchpriority={fetchpriority}
              style={{
                aspectRatio: hasFixedAspectRatio
                  ? `${aspectRatioX} / ${aspectRatioY}`
                  : 'auto',
              }} // aspectRatio used in combination with the objectFit:cover will center the image horizontally and vertically if aspectRatio prop is different from image's intrinsic aspect ratio
            />
          </ImageWrapper>
        )}
        {children}
      </div>
    </>
  );
};

export default Image;
