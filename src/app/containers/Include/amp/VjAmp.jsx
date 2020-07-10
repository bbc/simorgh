import React from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { shape, string } from 'prop-types';
import { GridItemConstrainedMedium } from '#lib/styledGrid';

const AmpHead = () => (
  <Helmet>
    <script
      async
      custom-element="amp-iframe"
      src="https://cdn.ampproject.org/v0/amp-iframe-0.1.js"
    />
  </Helmet>
);

const IncludeGrid = styled(GridItemConstrainedMedium)`
  display: grid;
`;

const VjAmp = ({ ampMetadata: { imageWidth, imageHeight, image, src } }) => {
  return (
    <>
      <AmpHead />
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
    </>
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
