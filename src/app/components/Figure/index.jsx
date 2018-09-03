import React from 'react';
import { string } from 'prop-types';
import styled from 'styled-components';
import LazyLoad from 'react-lazyload';
import Caption from './Caption';
import VisuallyHiddenText from '../VisuallyHiddenText';
import { GEL_SPACING_DBL } from '../../lib/constants/styles';

const copyrightOffscreenText = 'Copyright';

const renderCopyright = copyright => {
  const copyrightText = `${copyrightOffscreenText} ${copyright}`;
  return copyright !== 'BBC' ? (
    <VisuallyHiddenText>{copyrightText}</VisuallyHiddenText>
  ) : null;
};

const renderCaption = caption =>
  caption ? <Caption>{caption}</Caption> : null;

const StyledFigure = styled.figure`
  margin: 0;
  padding-bottom: ${GEL_SPACING_DBL};
  width: 100%;
`;

const Image = styled.img`
  display: block;
  width: 100%;
`;

const Figure = ({ src, alt, copyrightHolder, caption }) => (
  <StyledFigure>
    <LazyLoad height={200}>
      <Image src={src} alt={alt} />
      {renderCopyright(copyrightHolder)}
      {renderCaption(caption)}
    </LazyLoad>
  </StyledFigure>
);

Figure.propTypes = {
  alt: string.isRequired,
  src: string.isRequired,
  copyrightHolder: string.isRequired,
  caption: string,
};

Figure.defaultProps = {
  caption: null,
};

export default Figure;
