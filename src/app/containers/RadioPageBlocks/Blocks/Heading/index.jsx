import React, { useContext } from 'react';
import { string } from 'prop-types';
import { C_EBON } from '@bbc/psammead-styles/colours';
import styled from 'styled-components';
import { Headline } from '@bbc/psammead-headings';
import { ServiceContext } from '#contexts/ServiceContext';

const StyledHeadline = styled(Headline)`
  color: ${C_EBON};
`;

const HeadingContainer = ({ idAttr, text }) => {
  const { script, service } = useContext(ServiceContext);

  if (!text) return null;

  return (
    <StyledHeadline script={script} service={service} id={idAttr} tabIndex="-1">
      {text}
    </StyledHeadline>
  );
};

HeadingContainer.propTypes = {
  idAttr: string,
  text: string.isRequired,
};

HeadingContainer.defaultProps = {
  idAttr: null,
};

export default HeadingContainer;
