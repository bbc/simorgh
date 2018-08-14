import React from 'react';
import { string } from 'prop-types';
import styled from 'styled-components';
import Caption from './Caption';
import { GEL_SPACING_DBL } from '../../lib/constants/styles';

const renderCaption = caption =>
  caption ? <Caption>{caption}</Caption> : null;

const StyledFigure = styled.figure`
  margin: 0;
  padding: 0 0 ${GEL_SPACING_DBL} 0;
  width: 100%;
`;

const Image = styled.img`
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
