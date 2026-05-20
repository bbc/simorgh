// biome-ignore-all lint/a11y/useAnchorContent: we want this
import type { ReactNode } from 'react';
import { type PropsWithChildren, use } from 'react';

import pick from 'ramda/src/pick';
import Lazyload from 'react-lazyload';

import { RequestContext } from '../../contexts/RequestContext';
import useClickTrackerHandler from '../../hooks/useClickTrackerHandler';
import makeRelativeUrlPath from '../../lib/utilities/makeRelativeUrlPath';
import type { EventTrackingBlock } from '../../models/types/eventTracking';
import IMAGE from '../Image';
import FrostedGlassPanel from './FrostedGlassPanel';
import styles from './styles';
import type { PromoProps } from './types';
import withData from './withData';

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

  const clickTracker = useClickTrackerHandler({
    ...(eventTrackingData || {}),
    url: relativeUrl,
  });

  const promoText = (
    <>
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
  return (
    <div css={styles.componentWrapper} data-testid={`frosted-promo-${index}`}>
      <a
        css={styles.clickableArea}
        href={relativeUrl}
        {...(eventTrackingData && clickTracker)}
        aria-hidden="true"
        tabIndex={-1}
      />
      <IMAGE
        darkPlaceholder={isCanonical}
        lazyLoad
        {...pick(
          [
            'src',
            'srcSet',
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
const propsToPassThrough: (keyof PromoProps | 'children')[] = [
  'minimumContrast',
  'paletteSize',
  'isAmp',
];

export default withData(FrostedGlassPromo, propsToPassThrough);
