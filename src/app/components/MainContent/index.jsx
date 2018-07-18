import React from 'react';
import { arrayOf, shape } from 'prop-types';
import headline from '../../containers/Headline';
import text from '../../containers/Text';
import headlineBlockPropTypes from '../../models/propTypes/headline';
import textBlockPropTypes from '../../models/propTypes/text';
import blocksWithTypes from '../../models/propTypes/general';

// Inlined as this is a temporary component
const BlockString = props => {
  const stringProps = JSON.stringify(props);
  return <p>{stringProps}</p>;
};

const Blocks = {
  headline,
  text,
};

const render = blocks =>
  blocks.map(block => {
    const { type, blockId, model } = block;

    const Block = Blocks[type] || BlockString;

    return <Block key={blockId} {...model} />;
  });

const MainContent = ({ blocks }) => {
  const renderedContent = render(blocks);
  return <div>{renderedContent}</div>;
};

MainContent.propTypes = blocksWithTypes([
  headlineBlockPropTypes,
  textBlockPropTypes,
]);

export default MainContent;
