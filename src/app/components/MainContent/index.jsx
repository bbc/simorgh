import React from 'react';
import { any, arrayOf, shape } from 'prop-types';
import TextContainer from '../Containers/TextContainer';
import text from '../Text';

// Inlined as this is a temporary component
const BlockString = props => {
  const stringProps = JSON.stringify(props);
  return <p>{stringProps}</p>;
};

const Blocks = {
  headline: TextContainer,
  text,
};

const render = ({ blocks }) =>
  blocks.map(block => {
    const { type, blockId, model } = block;

    const Block = Blocks[type] || BlockString;
    // An if function for now until I apply the container to the text
    // component
    if (type === 'headline') {
      return <Block key={blockId} {...block} />;
    }

    return <Block key={blockId} {...model} />;
  });

const MainContent = ({ data }) => {
  const renderedContent = render(data);
  return <div>{renderedContent}</div>;
};

MainContent.propTypes = {
  data: shape({
    model: shape({
      blocks: arrayOf(any),
    }),
  }).isRequired,
};

export default MainContent;
