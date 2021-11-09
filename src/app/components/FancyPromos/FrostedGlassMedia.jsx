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
import PlayButton from '@bbc/psammead-play-button';
import { mediaIcons } from '@bbc/psammead-assets/svgs';
import { ServiceContext } from '#contexts/ServiceContext';

const Wrapper = styled.div`
  font-family: sans-serif;
  color: white;
  background: ${({ background }) => background};
  backdrop-filter: blur(${({ blurRadius }) => blurRadius}px);
  display: inline-block;
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 0.5rem 1rem;
  z-index: 3;
  svg {
    color: white;
  }
`;

const Duration = styled.span`
  position: relative;
  top: 2px;
  font-weight: bold;
`;

const FrostedGlassMedia = ({
  duration = '03:40',
  background,
  backgroundOpacity,
  blurRadius,
}) => {
  const { script, service } = useContext(ServiceContext);
  console.log(
    'background',
    `rgba(${background.join(',')}, ${backgroundOpacity})`,
  );

  return (
    <Wrapper
      background={`rgba(${background.join(',')}, ${backgroundOpacity})`}
      blurRadius={blurRadius}
    >
      {mediaIcons.video}
      <Duration>{duration}</Duration>
    </Wrapper>
  );
};

export default FrostedGlassMedia;
