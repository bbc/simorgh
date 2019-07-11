import React from 'react';
import styled from 'styled-components';
import { string, bool } from 'prop-types';

const Canonical = ({ id, portrait }) => {
  const position = portrait ? 'position: absolute;' : '';

  const PortraitParent = styled.div`
    padding-bottom: 178.78%;
    position: relative;
  `;

  const MediaPlayerContainer = styled.div`
    height: 100%;
    width: 100%;
    ${position}
  `;

  if (portrait) {
    return (
      <PortraitParent>
        <MediaPlayerContainer id={id} key={id} />
      </PortraitParent>
    );
  }

  return <MediaPlayerContainer id={id} key={id} />;
};

Canonical.propTypes = {
  id: string.isRequired,
  portrait: bool.isRequired,
};

export default Canonical;
