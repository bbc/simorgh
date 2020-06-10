import React from 'react';
import { string } from 'prop-types';
import styled from 'styled-components';
import { AmpImg } from '@bbc/psammead-image';
import { GridItemConstrainedMedium } from '#lib/styledGrid';

const IncludeGrid = styled(GridItemConstrainedMedium)`
  display: grid;
`;

const AmpIncludeContainer = ({ type, imageBlock }) => {
  const supportedTypes = ['idt2'];

  if (!imageBlock || !supportedTypes.includes(type)) return null;

  return (
    <IncludeGrid>
      <AmpImg fallback={false} {...imageBlock} />
    </IncludeGrid>
  );
};

AmpIncludeContainer.propTypes = {
  type: string.isRequired,
};

export default AmpIncludeContainer;
