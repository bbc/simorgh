import React from 'react';
import { string, obj } from 'prop-types';
import styled from 'styled-components';
import { AmpImg } from '@bbc/psammead-image';
import { GridItemConstrainedMedium } from '#lib/styledGrid';

const IncludeGrid = styled(GridItemConstrainedMedium)`
  display: grid;
`;

const Idt2Container = ({ imageBlock }) => (
  <IncludeGrid>
    <AmpImg fallback={false} {...imageBlock} />
  </IncludeGrid>
);

Idt2Container.propTypes = {
  imageBlock: obj.isRequired,
};

const componentsToRender = {
  idt2: props => <Idt2Container {...props} />,
};

const AmpIncludeContainer = props => {
  const { type, imageBlock } = props;
  if (!imageBlock) return null;

  return componentsToRender[type](props);
};

AmpIncludeContainer.propTypes = {
  type: string.isRequired,
};

export default AmpIncludeContainer;
