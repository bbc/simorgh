/* eslint-disable jsx-a11y/anchor-has-content */
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import React, { PropsWithChildren, useContext } from 'react';
import pick from 'ramda/src/pick';
import Lazyload from 'react-lazyload';

import { RequestContext } from '#contexts/RequestContext';
import useClickTrackerHandler from '#hooks/useClickTrackerHandler';
import makeRelativeUrlPath from '#lib/utilities/makeRelativeUrlPath';
import ImageWithPlaceholder from '#containers/ImageWithPlaceholder';

import FrostedGlassPanel from './FrostedGlassPanel';
import withData from './withData';

import styles from './styles';

const PANEL_OFFSET = 250;

type FrostedGlassPromoProps = {
  image: {
    src: string;
    srcset: string;
    fallbackSrcset: string;
    primaryMimeType: string;
    fallbackMimeType: string;
    sizes: string;
    alt: string;
    ratio: number;
    width: number;
    height: number;
  };
  footer: React.ReactNode | null;
  url: string;
  eventTrackingData: object | null;
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
  const { isAmp } = useContext(RequestContext);
  const isCanonical = !isAmp;
  const relativeUrl = makeRelativeUrlPath(url);

  const clickTracker = useClickTrackerHandler({
    ...(eventTrackingData || {}),
    url: relativeUrl,
  });

  const onClick = eventTrackingData ? clickTracker : () => null;

  const promoText = (
    <React.Fragment>
      <h3 css={styles.header}>
        <a
          css={theme => [
            styles.anchor,
            {
              color: isAmp ? theme.palette.BLACK : theme.palette.WHITE,

              '&:visited': {
                color: isAmp ? theme.palette.METAL : theme.palette.GREY_3,
              },
            },
          ]}
          href={relativeUrl}
          onClick={onClick}
        >
          {children}
        </a>
      </h3>
      {footer}
    </React.Fragment>
  );

  // The ClickableArea component is an anchor ("a") element
  // Anchors cannot be self-closing under the HTML spec
  /* eslint-disable react/self-closing-comp */
  return (
    <div css={styles.componentWrapper} data-testid={`frosted-promo-${index}`}>
      <a
        css={styles.clickableArea}
        href={relativeUrl}
        onClick={onClick}
        aria-hidden="true"
        tabIndex={-1}
      />
      <ImageWithPlaceholder
        lazyLoad
        darkPlaceholder={isCanonical}
        {...pick(
          [
            'src',
            'srcset',
            'fallbackSrcset',
            'primaryMimeType',
            'fallbackMimeType',
            'sizes',
            'alt',
            'ratio',
            'width',
            'height',
          ],
          image,
        )}
      />
      <Lazyload
        css={{ height: '100%' }}
        offset={PANEL_OFFSET}
        once
        placeholder={
          // Placeholder always gets rendered on AMP
          <div
            css={theme => [
              styles.lazyloadPlaceholder,
              {
                backgroundColor: isAmp
                  ? theme.palette.WHITE
                  : theme.palette.GREY_8,
              },
            ]}
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
const propsToPassThrough = ['minimumContrast', 'paletteSize', 'isAmp'];

export default withData(FrostedGlassPromo, propsToPassThrough);
