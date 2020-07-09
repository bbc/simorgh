import React from 'react';
import styled from 'styled-components';
import { shape, string } from 'prop-types';
import { GridItemConstrainedMedium } from '#lib/styledGrid';

const IncludeGrid = styled(GridItemConstrainedMedium)`
  display: grid;
`;

const VjAmp = ({ ampMetadata: { imageWidth, imageHeight, image, src } }) => {
  return (
    <IncludeGrid>
      <amp-iframe
        width={imageWidth}
        height={imageHeight}
        layout="responsive"
        sandbox="allow-scripts allow-same-origin allow-top-navigation-by-user-activation allow-forms"
        src={src}
      >
        <amp-img layout="fill" src={image} placeholder />
      </amp-iframe>
    </IncludeGrid>
  );
};

VjAmp.propTypes = {
  ampMetadata: shape({
    imageWidth: string,
    imageHeight: string,
    image: string,
    src: string,
  }).isRequired,
};

export default VjAmp;
