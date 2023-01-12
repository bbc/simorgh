import React from 'react';
import { node, string } from 'prop-types';
import styled from '@emotion/styled';
import { C_GREY_6 } from '#psammead/psammead-styles/src/colours';
import { getSansRegular } from '#psammead/psammead-styles/src/font-styles';
import { GEL_BREVIER } from '#psammead/gel-foundations/src/typography';
import { GEL_SPACING } from '#psammead/gel-foundations/src/spacings';
import { visuallyHiddenStyle } from '../utilities';

const Figure = styled.figure`
  margin: 0;
  background-color: transparent;
`;

const FigCaption = styled.figcaption`
  ${({ service }) => getSansRegular(service)}
  ${GEL_BREVIER}
  color: ${C_GREY_6};
  padding: ${GEL_SPACING} 0;

  > span {
    ${visuallyHiddenStyle}
  }
`;

const CaptionWrapper = ({
  children,
  service,
  textPrefixVisuallyHidden,
  text,
  additionalText,
}) => {
  return (
    <Figure>
      {children}
      <FigCaption service={service}>
        {textPrefixVisuallyHidden && <span>{textPrefixVisuallyHidden}</span>}
        {`${text}${additionalText ? ` ${additionalText}` : ''}`}
      </FigCaption>
    </Figure>
  );
};

CaptionWrapper.defaultProps = {
  textPrefixVisuallyHidden: null,
  additionalText: null,
};

CaptionWrapper.propTypes = {
  children: node.isRequired,
  service: string.isRequired,
  textPrefixVisuallyHidden: string,
  text: string.isRequired,
  additionalText: string,
};

export default CaptionWrapper;
