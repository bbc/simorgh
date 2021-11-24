import React from 'react';
import styled from '@emotion/styled';
import useImageColour from '../../hooks/useImageColour';

const BLUR_RADIUS = 10;
const CHAMELEON_GREY_8 = '#202224';

const Wrapper = styled.div`
  position: relative;
  overflow: hidden;
`;

const buildTransform = () => {
  const scaleAmount = 1 + BLUR_RADIUS / 100;
  const scaleX = `scaleX(${scaleAmount})`;
  const scaleY = `scaleY(${-1 * scaleAmount})`;

  return `transform: ${scaleX} ${scaleY}`;
};

const buildFilter = () => `filter: blur(${BLUR_RADIUS}px)`;

const Background = styled.div`
  display: none;
  @supports (${buildFilter()}) {
    display: block;
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

const Children = styled.div`
  position: relative;
  z-index: 3;
`;

const FrostedGlassPromo = ({ image, children }) => {
  const { colour } = useImageColour(image, {
    fallbackColour: CHAMELEON_GREY_8,
    minimumContrast: 7,
    contrastColour: '#ffffff',
  });

  return (
    <Wrapper>
      <Background src={image} />
      <Overlay colour={colour.rgb} />
      <Children>{children}</Children>
    </Wrapper>
  );
};

export default FrostedGlassPromo;
