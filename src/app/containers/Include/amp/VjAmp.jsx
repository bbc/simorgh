import React from 'react';
import styled from 'styled-components';
import { shape, string } from 'prop-types';
import EmbedError from '@bbc/psammead-embed-error';
import { GridItemConstrainedMedium } from '#lib/styledGrid';

const IncludeGrid = styled(GridItemConstrainedMedium)`
  display: grid;
`;

const VjAmp = ({ ampMetadata, classification }) => {
  if (classification === 'vj-amp-not-supported') {
    return (
      <EmbedError
        message="Sorry, we can’t display this part of the story on this lightweight mobile page."
        link={{
          text: 'View the full version of the page to see all the content.',
          href: 'https://www.bbc.co.uk/',
        }}
        fillViewport
      />
    );
  }
  const { imageWidth, imageHeight, image, src } = ampMetadata;
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
  }),
  classification: string,
};

VjAmp.defaultProps = {
  ampMetadata: shape({
    imageWidth: null,
    imageHeight: null,
    image: null,
    src: null,
  }),
  classification: null,
};

export default VjAmp;
