import React from 'react';
import { string, shape, number } from 'prop-types';
import { AmpImg } from '#psammead/psammead-image/src';
import { GridItemMedium } from '#components/Grid';

const Idt2Amp = ({ imageBlock }) =>
  imageBlock ? (
    <GridItemMedium>
      <AmpImg {...imageBlock} />
    </GridItemMedium>
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
