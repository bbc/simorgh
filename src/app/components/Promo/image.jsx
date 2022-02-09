import React from 'react';
import styled from '@emotion/styled';
import ImagePlaceholder from '@bbc/psammead-image-placeholder';
import { string } from 'prop-types';

const Img = styled.img`
  width: 100%;
`;

const Image = props => {
  return (
    <ImagePlaceholder ratio={56.25}>
      <Img {...props} />
    </ImagePlaceholder>
  );
};

Image.propTypes = {
  alt: string.isRequired,
};

Image.defaultProps = {};

export default Image;
