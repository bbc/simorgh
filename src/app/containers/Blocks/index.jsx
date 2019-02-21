import React from 'react';
import styled from 'styled-components';
import { C_LUNAR } from '@bbc/psammead-styles/colours';
import { FF_NEWS_SANS_REG } from '@bbc/psammead-styles/fonts';
import { objectOf, arrayOf, func, shape, string, any } from 'prop-types';
import nanoid from 'nanoid';

// Inlined as this is a temporary component
const BlockString = props => {
  const stringProps = JSON.stringify(props);
  return <p>{stringProps}</p>;
};

const UnrecognisedContent = styled.div`
  font-family: ${FF_NEWS_SANS_REG};
  background: ${C_LUNAR};
  padding-top: 1rem;
  padding-left: 0.5rem;
`;

const Blocks = ({ blocks, componentsToRender }) =>
  blocks.map(block => {
    const { type, model } = block;
    const subblocks = block.model.blocks;

    if (Object.keys(componentsToRender).includes(type)) {
      const Block = componentsToRender[type] || BlockString;

      if (type === 'caption') {
        return <Block key={nanoid()} type={type} block={block} />;
      }

      return <Block key={nanoid()} type={type} {...model} />;
    }

    if (subblocks === undefined) {
      return null;
    }

    return (
      <Blocks blocks={subblocks} componentsToRender={componentsToRender} /> // I'm not 100% sure this would be tail recursive, so may be increasing memory usage
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
