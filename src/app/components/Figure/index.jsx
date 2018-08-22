import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { string } from 'prop-types';
import styled from 'styled-components';
import Caption from './Caption';
import { GEL_SPACING_DBL } from '../../lib/constants/styles';

const renderCaption = caption =>
  caption ? <Caption>{caption}</Caption> : null;

const StyledFigure = styled.figure`
  margin: 0;
  padding-bottom: ${GEL_SPACING_DBL};
  width: 100%;
`;

const Figure = ({ src, alt, caption }) => (
  <StyledFigure>
    <LazyLoadImage src={src} alt={alt}>
      {renderCaption(caption)}
    </LazyLoadImage>
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
