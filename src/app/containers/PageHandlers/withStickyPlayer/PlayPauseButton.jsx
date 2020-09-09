import React from 'react';
import styled from 'styled-components';

const PlayerButtonWrapper = styled.div`
  position: relative;
  width: 38px;
  height: 38px;
  border: solid 2px #fff;
  border-radius: 50%;
  transition: 0.2s ease-in-out all;
  &:hover {
    transform: scale(1.1);
    background: #b80000;
    border-color: #b80000;
    #play {
      border-left-color: #fff;
      transition: 0.2s ease-in-out all;
    }
    #pause {
      border-color: #fff;
      transition: 0.2s ease-in-out all;
    }
  }
`;

const PlayerButton = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PlayIcon = styled.div`
  width: 0;
  height: 0;
  border-top: 7px solid transparent;
  border-bottom: 7px solid transparent;
  border-left: 12px solid #fff;
  position: relative;
  left: 2px;
`;

const PauseIcon = styled.div`
  width: 9px;
  height: 12px;
  border: solid 3px #fff;
  border-top: 0px;
  border-bottom: 0px;
`;

export default ({ isPlaying }) => {
  return (
    <div>
      <PlayerButtonWrapper>
        <PlayerButton>
          {isPlaying ? <PauseIcon id="pause" /> : <PlayIcon id="play" />}
        </PlayerButton>
      </PlayerButtonWrapper>
    </div>
  );
};
