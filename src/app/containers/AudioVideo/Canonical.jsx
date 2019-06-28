import React from 'react';
import styled from 'styled-components';
import { string } from 'prop-types';

const Canonical = ({ id }) => {
  const MediaPlayerContainer = styled.div`
    height: 26em;
    width: 100%;
  `;

  return (
    <>
      <MediaPlayerContainer id={id} key={id} />
    </>
  );
};

Canonical.propTypes = {
  id: string.isRequired,
};

export default Canonical;
