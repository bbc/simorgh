import React from 'react';
import styled from '@emotion/styled';
import { node, number, string } from 'prop-types';

import { GEL_SPACING_DBL } from '#psammead/gel-foundations/src/spacings';
import useImageColour from '#hooks/useImageColour';
import { GREY_8 } from '../../../components/ThemeProvider/palette';

const BLUR_RADIUS = 15;
const FALLBACK_COLOUR = GREY_8;

const Wrapper = styled.div`
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const scaleAmount = 1 + BLUR_RADIUS / 100;
const scaleX = `scaleX(${scaleAmount})`;
const scaleY = `scaleY(${-1 * scaleAmount})`;

const Background = styled.div`
  display: none;
  @supports (filter: blur(${BLUR_RADIUS}px)) {
    display: block;
    z-index: 1;
    position: absolute;
    bottom: 0;
    top: -${BLUR_RADIUS}px;
    left: 0;
    right: 0;
    background-color: ${FALLBACK_COLOUR};
    background-repeat: no-repeat;
    background-size: cover;
    background-position: bottom;
    transform: ${scaleX} ${scaleY};
    filter: blur(${BLUR_RADIUS}px);
  }
`;

const Children = styled.div`
  position: relative;
  z-index: 3;
  padding-bottom: ${GEL_SPACING_DBL};
  transition: background 0.5s ease-in-out;
  background: rgb(${({ colour }) => `${colour.join(',')}`});
  height: 100%;

  ${({ isLoading, colour }) =>
    !isLoading &&
    `
      @supports (filter: blur(${BLUR_RADIUS}px)) {
        background: rgba(${`${colour.join(',')}, 0.62`});
      }
    `}
`;

const FrostedGlassPanel = ({
  image,
  children,
  minimumContrast,
  paletteSize,
}) => {
  const { isLoading, colour } = useImageColour(image, {
    fallbackColour: FALLBACK_COLOUR,
    minimumContrast,
    contrastColour: '#ffffff',
    paletteSize,
  });

  const backgroundImageStyle = {
    backgroundImage: `url('${image}')`,
  };

  return (
    <Wrapper>
      <Children colour={colour.rgb} isLoading={isLoading}>
        {children}
      </Children>
      <Background style={backgroundImageStyle} />
    </Wrapper>
  );
};

FrostedGlassPanel.propTypes = {
  image: string.isRequired,
  children: node.isRequired,
  minimumContrast: number,
  paletteSize: number,
};

FrostedGlassPanel.defaultProps = {
  minimumContrast: 8,
  paletteSize: 10,
};

export default FrostedGlassPanel;
