import React from 'react';
import styled from '@emotion/styled';
import { GEL_SPACING } from '#psammead/gel-foundations/src/spacings';
import { GEL_GROUP_3_SCREEN_WIDTH_MAX } from '#psammead/gel-foundations/src/breakpoints';
import Paragraph from '../../../components/Paragraph';

const StyledParagraph = styled(Paragraph)`
  padding-bottom: 16px;
  color: ${({ theme }) =>
    theme.isDarkUi ? theme.palette.GREY_2 : theme.palette.SHADOW};
  @media (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
    padding-bottom: ${GEL_SPACING};
  }
`;

const OnDemandParagraphContainer = ({ idAttr = null, text, testid = '' }) => {

  if (!text) return null;

  return (
    <StyledParagraph id={idAttr} darkMode={darkMode}>
      {text}
    </StyledParagraph>
  );
};

export default OnDemandParagraphContainer;
