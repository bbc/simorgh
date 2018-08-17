import React from 'react';
import { string, element, shape } from 'prop-types';
import styled from 'styled-components';
import { GEL_SPACING_DBL } from '../../lib/constants/styles';

const StyledFigure = styled.figure`
  margin: 0;
  padding-bottom: ${GEL_SPACING_DBL};
  width: 100%;
`;

const Image = styled.img`
  display: block;
  width: 100%;
`;

const Figure = ({ src, alt, children }) => (
  <StyledFigure>
    <Image src={src} alt={alt} />
    {children}
  </StyledFigure>
);

Figure.propTypes = {
  alt: string.isRequired,
  src: string.isRequired,
  children: shape({ element }),
};

Figure.defaultProps = {
  children: null,
};

export default Figure;
