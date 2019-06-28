import React from 'react';
import styled from 'styled-components';
import { string } from 'prop-types';

const Canonical = ({ id, width, height }) => {
  const MediaPlayerContainer = styled.div`
    height: ${height};
    width: ${width};
  `;

  return (
    <>
      <MediaPlayerContainer id={id} key={id} />
    </>
  );
};

Canonical.propTypes = {
  id: string.isRequired,
  width: string.isRequired,
  height: string.isRequired,
};

export default Canonical;
