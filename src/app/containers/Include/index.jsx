import React from 'react';
import styled from 'styled-components';
import { GridItemConstrainedMedium } from '#lib/styledGrid';

const StyledIframe = styled.iframe`
  border: 0;
  left: 0;
  overflow: hidden;
  width: 100%;
`;

const Include = ({ href }) => {
  const includeUrl = `${href}`;
  return (
    <GridItemConstrainedMedium>
      <StyledIframe height="600px" src={includeUrl} />
    </GridItemConstrainedMedium>
  );
};

export default Include;
