import React from 'react';
import styled from 'styled-components';
import { string } from 'prop-types';

const Canonical = ({ id, widthAndHeight }) => {
  const MediaPlayerContainer = styled.div`
    ${widthAndHeight}
  `;

  return <MediaPlayerContainer id={id} key={id} />;
};

Canonical.propTypes = {
  id: string.isRequired,
  widthAndHeight: string.isRequired,
};

export default Canonical;
