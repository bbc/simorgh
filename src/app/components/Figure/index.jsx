import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { string, node } from 'prop-types';
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

const Figure = ({ image, caption }) => (
  <StyledFigure>
    <LazyLoadImage src={image.src} alt={image.alt} />
    {renderCaption(caption)}
  </StyledFigure>
);

Figure.propTypes = {
  image: node,
  caption: string,
};

Figure.defaultProps = {
  image: null,
  caption: null,
};

export default Figure;
