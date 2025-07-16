/* eslint-disable jsx-a11y/anchor-has-content */
import React, { PropsWithChildren, use } from 'react';
import pick from 'ramda/src/pick';
import Lazyload from 'react-lazyload';

import IMAGE from '../Image';
import makeRelativeUrlPath from '../../lib/utilities/makeRelativeUrlPath';
import useClickTrackerHandler from '../../hooks/useClickTrackerHandler';
import { RequestContext } from '../../contexts/RequestContext';

import FrostedGlassPanel from './FrostedGlassPanel';
import withData from './withData';

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
  footer: React.ReactNode | null;
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
    <React.Fragment>
      <h3 className="m-0">
        <a
          className={`
            font-gel-serif-regular
            text-[0.9375rem] group-2:text-[1rem]
            font-normal
            leading-[1.33] group-2:leading-[1.25]
            inline-block
            no-underline
            my-[0.875rem] mx-4 group-2:mx-8
            focus:underline
            ${isAmp ? 'text-gel-black visited:text-gel-metal' : 'text-white visited:text-gel-grey-3'}
          `}
          href={relativeUrl}
          {...(eventTrackingData && clickTracker)}
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
    <div 
      className="
        relative
        w-full
        flex
        flex-col
        h-full
        no-underline
        hover:[&_a]:underline
        visited:[&_a]:text-gel-grey-3
      " 
      data-testid={`frosted-promo-${index}`}
    >
      <a
        className="
          absolute
          top-0
          bottom-0
          left-0
          right-0
          z-[5]
        "
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
        className="h-full"
        offset={PANEL_OFFSET}
        once
        placeholder={
          // Placeholder always gets rendered on AMP
          <div
            className={`
              min-h-[100px]
              pb-8
              ${isAmp ? 'bg-white' : 'bg-gel-grey-8'}
            `}
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
