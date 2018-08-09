import React from 'react';
import { string } from 'prop-types';
import styled from 'styled-components';
import Caption from './Caption';
import { GEL_SPACING_DBL } from '../../lib/constants/styles';

const renderCaption = caption => (caption ? <Caption text={caption} /> : null);

const StyledFigure = styled.figure`
  margin: 0;
  padding-bottom: ${GEL_SPACING_DBL};
  width: 100%;
`;

const Image = styled.img`
  display: block;
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
