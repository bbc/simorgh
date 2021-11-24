import React, { useContext } from 'react';
import styled from '@emotion/styled';

import {
  getSansRegular,
  getSerifRegular,
} from '@bbc/psammead-styles/font-styles';

import { GEL_GROUP_2_SCREEN_WIDTH_MIN } from '@bbc/gel-foundations/breakpoints';

import { GEL_SPACING, GEL_SPACING_DBL } from '@bbc/gel-foundations/spacings';

import { ServiceContext } from '#contexts/ServiceContext';
import useImageColour from '../../hooks/useImageColour';

const BLUR_RADIUS = 10;
const CHAMELEON_GREY_8 = '#202224';

const Wrapper = styled.div`
  display: inline-block;
  width: 300px;
`;

const Top = styled.img`
  width: 100%;
  display: block;
`;

const Bottom = styled.div`
  position: relative;
  overflow: hidden;
`;

const Typo = styled.div`
  ${({ service }) => service && getSerifRegular(service)}
  color: white;
  z-index: 3;
  position: relative;

  font-size: 0.9375rem;
  line-height: 1.33;
  padding: 0.625rem ${GEL_SPACING} 0 ${GEL_SPACING};
  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    font-size: 1rem;
    line-height: 1.25;
    padding: 0.875rem ${GEL_SPACING_DBL} 0 ${GEL_SPACING_DBL};
  }
`;

const Meta = styled.div`
  ${({ service }) => service && getSansRegular(service)}
  color: white;
  z-index: 3;
  position: relative;

  font-size: 0.8125rem;
  padding: 0.625rem ${GEL_SPACING} ${GEL_SPACING_DBL} ${GEL_SPACING};
  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    font-size: 0.875rem;
    padding: 0.625rem ${GEL_SPACING_DBL} ${GEL_SPACING_DBL} ${GEL_SPACING_DBL};
  }
`;

const buildTransform = () => {
  const uniformScaleAmount = 1 + BLUR_RADIUS / 100;
  const scaleY = `scaleY(${-1 * uniformScaleAmount})`;
  const scaleX = `scaleX(${uniformScaleAmount})`;

  return `transform: ${scaleX} ${scaleY}`;
};

const buildFilter = () => {
  return `filter: blur(${BLUR_RADIUS}px)`;
};

const Background = styled.div`
  @supports (${buildFilter()}) {
    z-index: 1;
    position: absolute;
    bottom: 0;
    top: -${BLUR_RADIUS}px;
    left: 0;
    right: 0;
    background: url('${({ src }) => src}');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: bottom;
    ${() => buildTransform()};
    ${() => buildFilter()};
  }
`;

const Overlay = styled.div`
  z-index: 2;
  position: absolute;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
  background: rgb(${({ colour }) => `${colour.join(',')}`});
  @supports (${buildFilter()}) {
    background: rgba(${({ colour }) => `${colour.join(',')}, 0.62`});
  }
`;

const FrostedGlassPromo = ({ image, children, meta }) => {
  const { script, service } = useContext(ServiceContext);
  const { colour } = useImageColour(image, {
    fallbackColour: CHAMELEON_GREY_8,
    minimumContrast: 7,
    contrastColour: '#ffffff',
  });

  return (
    <Wrapper>
      <Top src={image} />
      <Bottom>
        <Overlay colour={colour.rgb} />
        <Background src={image} />
        <Typo script={script} service={service}>
          {children}
        </Typo>
        <Meta script={script} service={service}>
          {meta}
        </Meta>
      </Bottom>
    </Wrapper>
  );
};

export default FrostedGlassPromo;
