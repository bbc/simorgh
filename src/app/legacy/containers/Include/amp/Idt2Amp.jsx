import React from 'react';
import { AmpImg } from '#psammead/psammead-image/src';
import { GridItemMedium } from '#legacy/components/Grid';

const Idt2Amp = ({ imageBlock }) =>
  imageBlock ? (
    <GridItemMedium>
      <AmpImg {...imageBlock} />
    </GridItemMedium>
  ) : null;

export default Idt2Amp;
