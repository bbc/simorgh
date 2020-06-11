import React from 'react';
import { string, shape, number } from 'prop-types';
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
  imageBlock: shape({
    src: string,
    srcset: string,
    height: number,
    width: number,
    altText: string,
    layout: string,
  }).isRequired,
};

const componentsToRender = {
  // add amp support for other include types here
  idt2: props => <Idt2Container {...props} />,
};

const AmpIncludeContainer = props => {
  const { type } = props;
  return componentsToRender[type] ? componentsToRender[type](props) : null;
};

AmpIncludeContainer.propTypes = {
  type: string.isRequired,
};

export default AmpIncludeContainer;
