import React from 'react';
import styled from '@emotion/styled';
import { string, bool } from 'prop-types';
import { GEL_SPACING } from '#psammead/gel-foundations/src/spacings';
import { GEL_GROUP_3_SCREEN_WIDTH_MAX } from '#psammead/gel-foundations/src/breakpoints';
import { C_LUNAR, C_METAL } from '#psammead/psammead-styles/src/colours';
import Paragraph from '../../../components/Paragraph';

const StyledParagraph = styled(Paragraph)`
  padding-bottom: 16px;
  color: ${({ darkMode }) => (darkMode ? C_LUNAR : C_METAL)};
  @media (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
    padding-bottom: ${GEL_SPACING};
  }
`;

const OnDemandParagraphContainer = ({ idAttr, text, darkMode }) => {
  if (!text) return null;

  return (
    <StyledParagraph id={idAttr} darkMode={darkMode}>
      {text}
    </StyledParagraph>
  );
};

OnDemandParagraphContainer.propTypes = {
  idAttr: string,
  text: string.isRequired,
  darkMode: bool,
};

OnDemandParagraphContainer.defaultProps = {
  idAttr: null,
  darkMode: false,
};

export default OnDemandParagraphContainer;
