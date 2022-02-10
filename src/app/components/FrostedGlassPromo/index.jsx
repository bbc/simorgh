import React, { useContext } from 'react';
import { shape, node, string, number } from 'prop-types';
import styled from '@emotion/styled';
import pick from 'ramda/src/pick';

import { getSerifRegular } from '@bbc/psammead-styles/font-styles';
import { GEL_GROUP_2_SCREEN_WIDTH_MIN } from '@bbc/gel-foundations/breakpoints';
import {
  GEL_SPACING,
  GEL_SPACING_HLF_TRPL,
  GEL_SPACING_DBL,
} from '@bbc/gel-foundations/spacings';

import useClickTrackerHandler from '#hooks/useClickTrackerHandler';
import { ServiceContext } from '#contexts/ServiceContext';
import FrostedGlassPanel from './FrostedGlassPanel';

import ImageWithPlaceholder from '../../containers/ImageWithPlaceholder';

import withData from './withData';

const Wrapper = styled.div`
  display: inline-block;
  position: relative;
  width: 100%;
  max-width: 400px;
  text-decoration: none;
  &:hover {
    a {
      text-decoration: underline;
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
  color: white;
  font-size: 0.9375rem;
  line-height: 1.33;
  margin: 0.625rem ${GEL_SPACING} 0 ${GEL_SPACING};
  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    font-size: 1rem;
    line-height: 1.25;
    margin: ${GEL_SPACING_HLF_TRPL} ${GEL_SPACING_DBL} 0 ${GEL_SPACING_DBL};
  }
  &:focus {
    text-decoration: underline;
  }
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

  const clickTracker = useClickTrackerHandler({
    ...(eventTrackingData || {}),
    url,
  });

  const onClick = eventTrackingData ? clickTracker : () => {};

  // The ClickableArea component is an anchor ("a") element
  // Anchors cannot be self-closing under the HTML spec
  /* eslint-disable react/self-closing-comp */
  return (
    <Wrapper data-testid={`frosted-promo-${index}`}>
      <ClickableArea
        href={url}
        onClick={onClick}
        aria-hidden="true"
        tabIndex="-1"
      ></ClickableArea>
      <ImageWithPlaceholder
        darkMode
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
      <FrostedGlassPanel
        image={image.smallSrc || image.src}
        minimumContrast={minimumContrast}
        paletteSize={paletteSize}
      >
        <H3>
          <A script={script} service={service} href={url} onClick={onClick}>
            {children}
          </A>
        </H3>
        {footer}
      </FrostedGlassPanel>
    </Wrapper>
  );
};

// This component can receive promo data in a range of different formats
// It uses a withData HoC to convert the prop to a standardised schema
// This array is the list of props that should just be passed straight through
// to the component, without requiring any preprocessing
const propsToPassThrough = ['minimumContrast', 'paletteSize'];

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
