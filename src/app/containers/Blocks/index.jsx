import React from 'react';
import { objectOf, arrayOf, func, shape, string, any } from 'prop-types';
import nanoid from 'nanoid';
import styled from 'styled-components';
import {
  layoutGridItem,
  layoutGridItemFullWidth,
  layoutGridWrapper,
} from '../../lib/layoutGrid';
import { C_WHITE } from '../../lib/constants/styles';

export const StyledHeadlineWrapper = styled.div`
  ${layoutGridWrapper};
  background-color: ${C_WHITE};
`;

const GridItemFullWidth = styled.div`
  ${layoutGridItemFullWidth};
`;

const GridItem = styled.div`
  ${layoutGridItem};
`;

// Inlined as this is a temporary component
const BlockString = props => {
  const stringProps = JSON.stringify(props);
  return <p>{stringProps}</p>;
};

const Blocks = ({ blocks, componentsToRender }) =>
  blocks.map((block, index) => {
    const { type, model } = block;

    const { type: typeOfPreviousBlock } = blocks[index - 1] || {};

    const Block = componentsToRender[type] || BlockString;

    if (type === 'headline') {
      return (
        <GridItemFullWidth>
          <StyledHeadlineWrapper>
            <GridItem>
              <Block
                key={nanoid()}
                type={type}
                typeOfPreviousBlock={typeOfPreviousBlock}
                {...model}
              />
            </GridItem>
          </StyledHeadlineWrapper>
        </GridItemFullWidth>
      );
    }

    // HACK make second images full bleed & headline
    if (type === 'image' && index === 3) {
      return (
        <GridItemFullWidth>
          <Block
            key={nanoid()}
            type={type}
            typeOfPreviousBlock={typeOfPreviousBlock}
            {...model}
          />
        </GridItemFullWidth>
      );
    }

    // top level blocks are in componentsToRender should be handled better than this
    if (['headline', 'subheadline', 'text', 'image'].includes(type)) {
      return (
        <GridItem>
          <Block
            key={nanoid()}
            type={type}
            typeOfPreviousBlock={typeOfPreviousBlock}
            {...model}
          />
        </GridItem>
      );
    }

    return (
      <Block
        key={nanoid()}
        type={type}
        typeOfPreviousBlock={typeOfPreviousBlock}
        {...model}
      />
    );
  });

Blocks.propTypes = {
  blocks: arrayOf(
    shape({
      type: string.isRequired,
      model: objectOf(any).isRequired,
    }),
  ).isRequired,
  componentsToRender: objectOf(func).isRequired,
};

export default Blocks;
