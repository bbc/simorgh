import React from 'react';
import { string } from 'prop-types';
import styled from 'styled-components';
import Caption from './Caption';

const renderCaption = caption =>
  caption ? <Caption>{caption}</Caption> : null;

const StyledFigure = styled.figure`
  padding-bottom: 16px;
  width: 100%;
`;

const Image = styled.img.attrs({
  src: ({ src }) => src,
  alt: ({ alt }) => alt,
})`
  width: 100%;
`;

const Figure = ({ src, alt, caption }) => (
  <StyledFigure>
    <Image src={src} alt={alt} />
    {renderCaption(caption)}
  </StyledFigure>
);

Figure.propTypes = {
  alt: string.isRequired,
  src: string.isRequired,
  caption: string,
};

Figure.defaultProps = {
  caption: null,
};

export default Figure;
