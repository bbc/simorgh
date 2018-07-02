import React from 'react';
import { any, arrayOf, shape } from 'prop-types';
import headline from '../Headline';
import text from '../Text';

const Blocks = {
  headline,
  text,
};

const BlockString = props => {
  const stringProps = JSON.stringify(props);
  return (
    <p>
      {stringProps}
    </p>
  );
};

const render = ({ blocks }) =>
  blocks.map(block => {
    const { type, blockId, model } = block;

    const Block = Blocks[type] || BlockString;

    return (
      <Block key={blockId} {...model}  />
    );
  });

const MainContent = ({ data }) => {
  const renderedContent = render(data);
  return (
    <div>
      {renderedContent}
    </div>
  );
};

MainContent.propTypes = {
  data: shape({
    model: shape({
      blocks: arrayOf(any),
    }),
  }).isRequired,
};

export default MainContent;
