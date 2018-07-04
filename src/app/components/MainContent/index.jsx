import React from 'react';
import { mainContentPropTypes } from '../../helpers/proptypes';
import headline from '../Headline';
import text from '../Text';

// Inlined as this is a temporary component
const BlockString = props => {
  const stringProps = JSON.stringify(props);
  return (
    <p>
      {stringProps}
    </p>
  );
};

const Blocks = {
  headline,
  text,
};

const render = (blocks) =>
  blocks.map(block => {
    const { type, blockId, model } = block;

    const Block = Blocks[type] || BlockString;

    return (
      <Block key={blockId} {...model} />
    );
  });

const MainContent = ({ blocks }) => {
  const renderedContent = render(blocks);
  return (
    <div>
      {renderedContent}
    </div>
  );
};

MainContent.propTypes = mainContentPropTypes;

export default MainContent;
