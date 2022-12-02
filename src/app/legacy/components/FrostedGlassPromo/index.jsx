import React, { useContext } from 'react';
import { shape, node, string, number } from 'prop-types';
import styled from '@emotion/styled';
import pick from 'ramda/src/pick';
import Lazyload from 'react-lazyload';

import { RequestContext } from '#contexts/RequestContext';
import useClickTrackerHandler from '#hooks/useClickTrackerHandler';
import { getSerifRegular } from '#psammead/psammead-styles/src/font-styles';
import { GEL_GROUP_2_SCREEN_WIDTH_MIN } from '#psammead/gel-foundations/src/breakpoints';
import {
  GEL_SPACING,
  GEL_SPACING_DBL,
} from '#psammead/gel-foundations/src/spacings';
import {
  C_WHITE,
  C_GREY_8,
  C_METAL,
} from '#psammead/psammead-styles/src/colours';
import makeRelativeUrlPath from '#lib/utilities/makeRelativeUrlPath';
import ImageWithPlaceholder from '#containers/ImageWithPlaceholder';
import { ServiceContext } from '../../../contexts/ServiceContext';

import FrostedGlassPanel from './FrostedGlassPanel';

import withData from './withData';

const PANEL_OFFSET = 250;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;
  text-decoration: none;
  &:hover {
    a {
      text-decoration: underline;
    }
  }
  &:visited {
    a {
      color: #e6e8ea;
    }
  }
`;

// This is an unfocusable element, hidden from screenreaders
// This is to allow mouse users to click anywhere on the promo
// But for keyboard and AT users, and scenarios where there is no CSS,
// only the link inside the H3 should be interactive
const ClickableArea = styled.a`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 5;
`;

const H3 = styled.h3`
  margin: 0;
`;

const A = styled.a`
  display: inline-block;
  ${({ service }) => service && getSerifRegular(service)}
  text-decoration: none;
  color: ${({ isAmp }) => (isAmp ? 'black' : 'white')};
  font-size: 0.9375rem;
  line-height: 1.33;
  margin: 0.875rem ${GEL_SPACING} 0 ${GEL_SPACING};
  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    font-size: 1rem;
    line-height: 1.25;
    margin: 0.875rem ${GEL_SPACING_DBL} 0 ${GEL_SPACING_DBL};
  }
  &:visited {
    color: ${({ isAmp }) => (isAmp ? C_METAL : '#e6e8ea')};
  }
  &:focus {
    text-decoration: underline;
  }
`;

const LazyloadPlaceholder = styled.div`
  background-color: ${({ isAmp }) => (isAmp ? C_WHITE : C_GREY_8)};
  min-height: 100px;
  padding-bottom: ${GEL_SPACING_DBL};
`;

const LazyloadWrapper = styled(Lazyload)`
  height: 100%;
`;

const FrostedGlassPromo = ({
  image,
  children,
  footer,
  url,
  eventTrackingData,
  index,
  minimumContrast,
  paletteSize,
}) => {
  const { script, service } = useContext(ServiceContext);
  const { isAmp } = useContext(RequestContext);
  const isCanonical = !isAmp;
  const relativeUrl = makeRelativeUrlPath(url);

  const clickTracker = useClickTrackerHandler({
    ...(eventTrackingData || {}),
    url: relativeUrl,
  });

  const onClick = eventTrackingData ? clickTracker : () => {};

  const promoText = (
    <>
      <H3>
        <A
          script={script}
          service={service}
          href={relativeUrl}
          onClick={onClick}
          isAmp={isAmp}
        >
          {children}
        </A>
      </H3>
      {footer}
    </>
  );

  // The ClickableArea component is an anchor ("a") element
  // Anchors cannot be self-closing under the HTML spec
  /* eslint-disable react/self-closing-comp */
  return (
    <Wrapper data-testid={`frosted-promo-${index}`}>
      <ClickableArea
        href={relativeUrl}
        onClick={onClick}
        aria-hidden="true"
        tabIndex="-1"
      ></ClickableArea>
      <ImageWithPlaceholder
        lazyLoad
        darkMode={isCanonical}
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
      <LazyloadWrapper
        offset={PANEL_OFFSET}
        once
        placeholder={
          // Placeholder always gets rendered on AMP
          <LazyloadPlaceholder
            data-testid="frosted-glass-lazyload-placeholder"
            isAmp={isAmp}
          >
            {promoText}
          </LazyloadPlaceholder>
        }
      >
        <FrostedGlassPanel
          image={image.src}
          minimumContrast={minimumContrast}
          paletteSize={paletteSize}
        >
          {promoText}
        </FrostedGlassPanel>
      </LazyloadWrapper>
    </Wrapper>
  );
};

// This component can receive promo data in a range of different formats
// It uses a withData HoC to convert the prop to a standardised schema
// This array is the list of props that should just be passed straight through
// to the component, without requiring any preprocessing
const propsToPassThrough = ['minimumContrast', 'paletteSize', 'isAmp'];

FrostedGlassPromo.propTypes = {
  children: node.isRequired,
  url: string.isRequired,
  footer: node,
  eventTrackingData: shape({}),
  index: number,
  minimumContrast: number,
  paletteSize: number,
  image: shape({
    src: string.isRequired,
    alt: string.isRequired,
    ratio: number.isRequired,
    width: number.isRequired,
    height: number.isRequired,
    smallSrc: string,
    srcset: string,
    sizes: string,
  }).isRequired,
};

FrostedGlassPromo.defaultProps = {
  footer: null,
  eventTrackingData: null,
  index: 0,
  minimumContrast: 8,
  paletteSize: 10,
};

export default withData(FrostedGlassPromo, propsToPassThrough);
