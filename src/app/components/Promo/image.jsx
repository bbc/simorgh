import React from 'react';
import styled from '@emotion/styled';
import ImagePlaceholder from '@bbc/psammead-image-placeholder';
import { string } from 'prop-types';
import { GEL_SPACING } from '@bbc/gel-foundations/spacings';

const Img = styled.img`
  width: 100%;
  object-fit: cover;
`;

const Wrapper = styled.div`
  margin-bottom: ${GEL_SPACING};
`;

// TODO: media indicators, srcsets and webp
const Image = props => {
  return (
    <Wrapper>
      <ImagePlaceholder ratio={56.25}>
        <Img {...props} />
      </ImagePlaceholder>
    </Wrapper>
  );
};

Image.propTypes = {
  alt: string.isRequired,
};

export default Image;
