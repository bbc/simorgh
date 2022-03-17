import React from 'react';
import { node, string } from 'prop-types';
import styled from '@emotion/styled';
import { C_WHITE } from '@bbc/psammead-styles/colours';
import { getSansRegular } from '@bbc/psammead-styles/font-styles';
import { GEL_BREVIER } from '@bbc/gel-foundations/typography';
import { GEL_SPACING } from '@bbc/gel-foundations/spacings';
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
