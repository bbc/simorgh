import React from 'react';
import styled from '@emotion/styled';
import ImagePlaceholder from '@bbc/psammead-image-placeholder';
import { string, node } from 'prop-types';
import { GEL_SPACING } from '@bbc/gel-foundations/spacings';

const Img = styled.img`
  width: 100%;
  object-fit: cover;
`;

const Wrapper = styled.div`
  margin-bottom: ${GEL_SPACING};
  position: relative;
`;

const ChildWrapper = styled.div`
  position: absolute;
  bottom: 0;
`;

// TODO: srcsets and webp
const Image = props => {
  const { children, ...rest } = props;
  return (
    <Wrapper>
      <ImagePlaceholder ratio={56.25}>
        <Img {...rest} />
      </ImagePlaceholder>
      {children && <ChildWrapper>{children}</ChildWrapper>}
    </Wrapper>
  );
};

Image.propTypes = {
  alt: string.isRequired,
  children: node,
};

Image.defaultProps = {
  children: null,
};

export default Image;
