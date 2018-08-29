import React from 'react';
import { string } from 'prop-types';
import styled from 'styled-components';

const StyledImage = styled.img`
  display: block;
  width: 100%;
`;

const Image = ({ src, alt }) => <StyledImage alt={alt} src={src} />;

Image.propTypes = {
  alt: string.isRequired,
  src: string.isRequired,
};

export default Image;
