import React from 'react';
import styled from '@emotion/styled';
import { GEL_SPACING } from '#psammead/gel-foundations/src/spacings';
import { GEL_GROUP_3_SCREEN_WIDTH_MAX } from '#psammead/gel-foundations/src/breakpoints';
import ParagraphComponent from '#psammead/psammead-paragraph/src';

const StyledParagraphComponent = styled(ParagraphComponent)`
  padding-bottom: 16px;
  color: ${({ theme }) => !theme.isDarkUi && theme.palette.METAL};
  @media (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
    padding-bottom: ${GEL_SPACING};
  }
`;

const OnDemandParagraphContainer = ({ idAttr = null, text, testid = '' }) => {
  if (!text) return null;

  return (
    <StyledParagraphComponent
      id={idAttr}
      {...(testid && { 'data-testid': testid })}
    >
      {text}
    </StyledParagraphComponent>
  );
};

export default OnDemandParagraphContainer;
