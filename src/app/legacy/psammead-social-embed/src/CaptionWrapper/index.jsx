import React from 'react';
import { node, string } from 'prop-types';
import styled from '@emotion/styled';
import { C_WHITE } from '#legacy/psammead-styles/src/colours';
import { getSansRegular } from '#legacy/psammead-styles/src/font-styles';
import { GEL_BREVIER } from '#legacy/gel-foundations/src/typography';
import { GEL_SPACING } from '#legacy/gel-foundations/src/spacings';
import { visuallyHiddenStyle } from '../utilities';

const C_BLACK = '#000000';

const Figure = styled.figure`
  background-color: ${C_BLACK};
  margin: 0;
`;

const FigCaption = styled.figcaption`
  ${({ service }) => getSansRegular(service)}
  ${GEL_BREVIER}
  color: ${C_WHITE};
  padding: ${GEL_SPACING};

  > span {
    ${visuallyHiddenStyle}
  }
`;

const CaptionWrapper = ({
  children,
  service,
  textPrefixVisuallyHidden,
  text,
}) => (
  <Figure>
    {children}
    <FigCaption service={service}>
      {textPrefixVisuallyHidden && <span>{textPrefixVisuallyHidden}</span>}
      {text}
    </FigCaption>
  </Figure>
);

CaptionWrapper.defaultProps = {
  textPrefixVisuallyHidden: null,
};

CaptionWrapper.propTypes = {
  children: node.isRequired,
  service: string.isRequired,
  textPrefixVisuallyHidden: string,
  text: string.isRequired,
};

export default CaptionWrapper;
