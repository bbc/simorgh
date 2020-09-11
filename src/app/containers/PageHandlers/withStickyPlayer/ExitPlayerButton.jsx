import React, { useContext } from 'react';
import styled from 'styled-components';
import { GEL_SPACING_DBL, GEL_SPACING } from '@bbc/gel-foundations/spacings';
import { navigationIcons } from '@bbc/psammead-assets/svgs';
import { getSansRegular } from '@bbc/psammead-styles/font-styles';
import { getBrevier } from '@bbc/gel-foundations/typography';
import { ServiceContext } from '../../../contexts/ServiceContext';
import { MediaPlayerContext } from '../../../contexts/MediaPlayerContext';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: solid 1px #888;
  padding: 0.75rem ${GEL_SPACING};
`;

const ExitText = styled.span`
  padding-left: ${GEL_SPACING_DBL};
  color: #f2f2f2;
  ${({ script }) => getBrevier(script)}
  ${({ service }) => service && getSansRegular(service)};
`;

const IconWrapper = styled.span`
  display: inline-block;
  position: relative;
  width: 13.2px;
  height: 13.2px;
  cursor: pointer;
`;
const Icon = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -22px;
  margin-top: -22px;
`;

export default () => {
  const { script, service } = useContext(ServiceContext);
  const { setIsPlaying, setShowMediaPlayer } = useContext(MediaPlayerContext);
  const handleClick = () => {
    setIsPlaying(false);
    setShowMediaPlayer(false);
  };
  return (
    <Wrapper>
      <IconWrapper onClick={handleClick}>
        <Icon>{navigationIcons.cross}</Icon>
      </IconWrapper>
      <ExitText script={script} service={service} darkMode>
        Exit mini player
      </ExitText>
    </Wrapper>
  );
};
