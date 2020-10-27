import React from 'react';
import { string, shape, number } from 'prop-types';
import { AmpImg } from '@bbc/psammead-image';
import { GridItemConstrainedMedium } from '#app/components/Grid';

const Idt2Amp = ({ imageBlock }) =>
  imageBlock ? (
    <GridItemConstrainedMedium>
      <AmpImg {...imageBlock} />
    </GridItemConstrainedMedium>
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
