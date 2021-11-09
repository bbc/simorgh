import React, { useContext } from 'react';
import styled from '@emotion/styled';

import {
  getSansBold,
  getSansRegular,
  getSerifBold,
  getSerifRegular,
} from '@bbc/psammead-styles/font-styles';
import {
  getBodyCopy,
  getBrevier,
  getGreatPrimer,
  getDoublePica,
} from '@bbc/gel-foundations/typography';
import { ServiceContext } from '#contexts/ServiceContext';

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
  z-index: 3;
  ${({ service }) => service && getSerifRegular(service)}
  font-size: 1rem;
  line-height: 1.5;
  position: relative;
  padding: 0.5rem 1rem 0 1rem;
  color: white;
  ${({ textShadow }) =>
    textShadow && `filter: drop-shadow(0 0 1px rgba(0, 0, 0, 1));`}
`;

const Meta = styled.div`
  z-index: 3;
  ${({ service }) => service && getSansRegular(service)}
  font-size: 0.8rem;
  color: white;
  position: relative;
  padding: 1rem 1rem 1rem 1rem;
  ${({ textShadow }) =>
    textShadow && `filter: drop-shadow(0 0 1px rgba(0, 0, 0, 1));`}
`;

const buildTransform = (blurRadius, flipImage) => {
  const shouldScaleX = blurRadius;
  const shouldScaleY = blurRadius || flipImage;
  if (!shouldScaleX && !shouldScaleY) return '';

  const uniformScaleAmount = 1 + blurRadius / 100;

  const scaleYDirection = flipImage ? -1 : 1;
  const scaleYValue = blurRadius ? uniformScaleAmount : 1;
  const scaleY = shouldScaleY ? `scaleY(${scaleYDirection * scaleYValue})` : '';

  const scaleX = shouldScaleX ? `scaleX(${uniformScaleAmount})` : '';
  return `transform: ${scaleX} ${scaleY};`;
};

const buildFilter = blurRadius => {
  if (!blurRadius) return '';
  return `filter: blur(${blurRadius}px);`;
};

const Background = styled.div`
  z-index: 1;
  position: absolute;
  bottom: 0;
  top: ${({ blurRadius }) => (blurRadius ? `-${blurRadius}px` : '0')};
  left: 0;
  right: 0;
  background: url('${({ src }) => src}');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: bottom;
  ${({ blurRadius, flipImage }) => buildTransform(blurRadius, flipImage)}
  ${({ blurRadius }) => buildFilter(blurRadius)}
`;

const Overlay = styled.div`
  z-index: 2;
  position: absolute;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(
    ${({ colour, opacity }) => `${colour.join(',')}, ${opacity}`}
  );
`;

import withImageAnalyser from './withImageAnalyser';

const FancyPromo = ({
  image,
  palette,
  children,
  blurRadius,
  flipImage,
  meta,
  textShadow,
  backgroundColour = 'DarkVibrant',
  backgroundOpacity,
}) => {
  const { script, service } = useContext(ServiceContext);
  console.log(
    'backgroundColour',
    backgroundColour,
    'backgroundOpacity',
    backgroundOpacity,
    palette[backgroundColour],
  );
  return (
    <Wrapper>
      <Top src={image} />
      <Bottom>
        <Overlay
          colour={palette[backgroundColour].rgb}
          opacity={backgroundOpacity / 100}
        />
        <Background src={image} blurRadius={blurRadius} flipImage={flipImage} />
        <Typo script={script} service={service} textShadow={textShadow}>
          {children}
        </Typo>
        <Meta script={script} service={service} textShadow={textShadow}>
          {meta}
        </Meta>
      </Bottom>
    </Wrapper>
  );
};

export default withImageAnalyser(FancyPromo);
