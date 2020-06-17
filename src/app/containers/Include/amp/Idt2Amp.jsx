import React from 'react';
import { string, shape, number } from 'prop-types';
import styled from 'styled-components';
import { AmpImg } from '@bbc/psammead-image';
import { GridItemConstrainedMedium } from '#lib/styledGrid';

const IncludeGrid = styled(GridItemConstrainedMedium)`
  display: grid;
`;

const Idt2Amp = ({ imageBlock }) =>
  imageBlock ? (
    <IncludeGrid>
      <AmpImg {...imageBlock} />
    </IncludeGrid>
  ) : null;

Idt2Amp.propTypes = {
  imageBlock: shape({
    src: string,
    srcset: string,
    height: number,
    width: number,
    alt: string,
    layout: string,
  }).isRequired,
};

export default Idt2Amp;
