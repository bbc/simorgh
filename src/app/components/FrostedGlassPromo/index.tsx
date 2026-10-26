/* eslint-disable jsx-a11y/anchor-has-content */
import type { ReactNode } from 'react';

import { PropsWithChildren, use } from 'react';
import Lazyload from 'react-lazyload';

import IMAGE from '../Image';
import makeRelativeUrlPath from '../../lib/utilities/makeRelativeUrlPath';
import useClickTrackerHandler from '../../hooks/useClickTrackerHandler';
import { RequestContext } from '../../contexts/RequestContext';

import FrostedGlassPanel from './FrostedGlassPanel';
import withData from './withData';

import styles from './index.module.scss';
import { EventTrackingBlock } from '../../models/types/eventTracking';
import { PromoProps } from './types';

const PANEL_OFFSET = 250;

type FrostedGlassPromoProps = {
  image: {
    src: string;
    srcSet: string;
    fallbackSrcset: string;
    primaryMimeType: string;
    fallbackMimeType: string;
    sizes: string;
    alt: string;
    ratio: number;
    width: number;
    height: number;
  };
  footer: ReactNode | null;
  url: string;
  eventTrackingData: EventTrackingBlock | null;
  index: number;
  minimumContrast: number;
  paletteSize: number;
};

const FrostedGlassPromo = ({
  image,
  children,
  footer = null,
  url,
  eventTrackingData = null,
  index = 0,
  minimumContrast = 8,
  paletteSize = 10,
}: PropsWithChildren<FrostedGlassPromoProps>) => {
  const { isAmp } = use(RequestContext);
  const isCanonical = !isAmp;
  const relativeUrl = makeRelativeUrlPath(url);
  const {
    src,
    srcSet,
    fallbackSrcset: fallbackSrcSet,
    primaryMimeType: mediaType,
    fallbackMimeType,
    sizes,
    alt,
    width,
    height,
  } = image;

  const clickTracker = useClickTrackerHandler({
    ...(eventTrackingData || {}),
    url: relativeUrl,
  });

  const promoText = (
    <>
      <h3 className={styles.header}>
        <a
          className={`${styles.anchor} ${isAmp ? styles.anchorAmp : ''}`}
          href={relativeUrl}
          {...(eventTrackingData && clickTracker)}
        >
          {children}
        </a>
      </h3>
      {footer}
    </>
  );

  // The ClickableArea component is an anchor ("a") element
  // Anchors cannot be self-closing under the HTML spec
  /* eslint-disable react/self-closing-comp */
  return (
    <div
      className={styles.componentWrapper}
      data-testid={`frosted-promo-${index}`}
    >
      <a
        className={styles.clickableArea}
        href={relativeUrl}
        {...(eventTrackingData && clickTracker)}
        aria-hidden="true"
        tabIndex={-1}
      />
      <IMAGE
        darkPlaceholder={isCanonical}
        lazyLoad
        src={src}
        srcSet={srcSet}
        fallbackSrcSet={fallbackSrcSet}
        mediaType={mediaType}
        fallbackMediaType={fallbackMimeType}
        sizes={sizes}
        alt={alt}
        width={width}
        height={height}
      />
      <Lazyload
        css={{ height: '100%' }}
        offset={PANEL_OFFSET}
        once
        placeholder={
          // Placeholder always gets rendered on AMP
          <div
            className={`${styles.lazyloadPlaceholder} ${
              isAmp ? styles.lazyloadPlaceholderAmp : ''
            }`}
            data-testid="frosted-glass-lazyload-placeholder"
          >
            {promoText}
          </div>
        }
      >
        <FrostedGlassPanel
          image={image.src}
          minimumContrast={minimumContrast}
          paletteSize={paletteSize}
        >
          {promoText}
        </FrostedGlassPanel>
      </Lazyload>
    </div>
  );
};

// This component can receive promo data in a range of different formats
// It uses a withData HoC to convert the prop to a standardised schema
// This array is the list of props that should just be passed straight through
// to the component, without requiring any preprocessing
const propsToPassThrough: (keyof PromoProps | 'children')[] = [
  'minimumContrast',
  'paletteSize',
  'isAmp',
];

export default withData(FrostedGlassPromo, propsToPassThrough);
