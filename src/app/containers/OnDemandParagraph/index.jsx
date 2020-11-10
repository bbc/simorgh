import React, { useContext } from 'react';
import styled from 'styled-components';
import { string, bool } from 'prop-types';
import { GEL_SPACING } from '@bbc/gel-foundations/spacings';
import { GEL_GROUP_3_SCREEN_WIDTH_MAX } from '@bbc/gel-foundations/breakpoints';
import ParagraphComponent from '@bbc/psammead-paragraph';
import { ServiceContext } from '#contexts/ServiceContext';

const StyledParagraphComponent = styled(ParagraphComponent)`
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
