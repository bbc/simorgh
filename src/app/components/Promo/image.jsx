import React from 'react';
import styled from '@emotion/styled';
import ImagePlaceholder from '@bbc/psammead-image-placeholder';
import { string } from 'prop-types';
import { GEL_SPACING } from '@bbc/gel-foundations/spacings';
import { GEL_GROUP_2_SCREEN_WIDTH_MIN } from '@bbc/gel-foundations/breakpoints';

const Img = styled.img`
  width: 100%;
  object-fit: cover;
`;

const Wrapper = styled.div`
  margin-bottom: ${GEL_SPACING};
  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    margin-bottom: 0;
  }
`;

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

Image.defaultProps = {};

export default Image;
