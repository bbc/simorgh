import React, { useContext } from 'react';
import styled from '@emotion/styled';
import { string, bool } from 'prop-types';
import { GEL_SPACING } from '#psammead/gel-foundations/src/spacings';
import { GEL_GROUP_3_SCREEN_WIDTH_MAX } from '#psammead/gel-foundations/src/breakpoints';
import ParagraphComponent from '#psammead/psammead-paragraph/src';
import { C_METAL } from '#psammead/psammead-styles/src/colours';
import { ServiceContext } from '../../../contexts/ServiceContext';

const StyledParagraphComponent = styled(ParagraphComponent)`
  padding-bottom: 16px;
  ${({ darkMode }) => !darkMode && `color: ${C_METAL};`}
  @media (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
    padding-bottom: ${GEL_SPACING};
  }
`;

const OnDemandParagraphContainer = ({ idAttr, text, darkMode }) => {
  const { script, service } = useContext(ServiceContext);

  if (!text) return null;

  return (
    <StyledParagraphComponent
      script={script}
      service={service}
      id={idAttr}
      darkMode={darkMode}
    >
      {text}
    </StyledParagraphComponent>
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
