import React from 'react';
import styled from 'styled-components';
import { arrayOf, string } from 'prop-types';

const AudioVideo = ({ idArray, width, height }) => {
  const MediaPlayerContainer = styled.div`
    height: ${height};
    width: ${width};
  `;

  return (
    <>
      {idArray.map(id => (
        <MediaPlayerContainer id={id} />
      ))}
    </>
  );
};

AudioVideo.propTypes = {
  idArray: arrayOf(string).isRequired,
  width: string,
  height: string,
};

AudioVideo.defaultProps = {
  width: '100%',
  height: '26em',
};

export default AudioVideo;
