import React from 'react';
import headline from '../../containers/Headline';
import image from '../../containers/Image';
import text from '../../containers/Text';
import mainContentModelPropTypes from '../../models/propTypes/mainContent';

// Inlined as this is a temporary component
const BlockString = props => {
  const stringProps = JSON.stringify(props);
  return <p>{stringProps}</p>;
};

const Blocks = {
  headline,
  image,
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

MainContent.propTypes = mainContentModelPropTypes;

export default MainContent;
