import React, { useContext } from 'react';
import { string } from 'prop-types';
import { C_EBON } from '@bbc/psammead-styles/colours';
import styled from 'styled-components';
import ParagraphComponent from '@bbc/psammead-paragraph';
import { ServiceContext } from '#contexts/ServiceContext';

const StyledParagraphComponent = styled(ParagraphComponent)`
  color: ${C_EBON};
`;

const ParagraphContainer = ({ idAttr, text }) => {
  const { script, service } = useContext(ServiceContext);

  if (!text) return null;

  return (
    <StyledParagraphComponent script={script} service={service} id={idAttr}>
      {text}
    </StyledParagraphComponent>
  );
};

ParagraphContainer.propTypes = {
  idAttr: string,
  text: string.isRequired,
};

ParagraphContainer.defaultProps = {
  idAttr: null,
};

export default ParagraphContainer;
