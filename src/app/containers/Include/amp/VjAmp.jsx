import React from 'react';
import styled from 'styled-components';
import { shape, string } from 'prop-types';
import { GridItemConstrainedMedium } from '#lib/styledGrid';

const IncludeGrid = styled(GridItemConstrainedMedium)`
  display: grid;
`;

const VjAmp = ({
  ampMetadata: { ampImageWidth, ampImageHeight, ampImage, ampSrc },
}) => {
  return (
    <IncludeGrid>
      <amp-iframe
        width={ampImageWidth}
        height={ampImageHeight}
        layout="responsive"
        sandbox="allow-scripts allow-same-origin allow-top-navigation-by-user-activation allow-forms"
        resizable
        src={ampSrc}
      >
        <div overflow="visible" />
        <amp-img
          width={ampImageWidth}
          height={ampImageHeight}
          layout="fill"
          placeholder
          src={ampImage}
        />
      </amp-iframe>
    </IncludeGrid>
  );
};

VjAmp.propTypes = {
  ampMetadata: shape({
    ampImageWidth: string,
    ampImageHeight: string,
    ampImage: string,
    ampSrc: string,
  }).isRequired,
};

export default VjAmp;
