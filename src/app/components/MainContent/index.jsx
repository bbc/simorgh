import React from 'react';
import { shape, PropTypes } from 'prop-types';
import headline from '../Headline';
import text from '../Text';

// Inlined as this is a temporary component
const BlockString = props => {
  const stringProps = JSON.stringify(props);
  return <p>{stringProps}</p>;
};

const Blocks = {
  headline,
  text,
};

const render = ({ blocks }) =>
  blocks.map(block => {
    const { type, blockId, model } = block;

    const Block = Blocks[type] || BlockString;

    return <Block key={blockId} {...model} />;
  });

const MainContent = ({ data }) => {
  const renderedContent = render(data);
  return <div>{renderedContent}</div>;
};

MainContent.propTypes = {
  data: shape({
    model: shape({
      blocks: shape({
        headline: PropTypes.object.isRequired,
        subheading: PropTypes.object.isRequired,
        text: PropTypes.object.isRequired,
        image: PropTypes.object.isRequired,
        video: PropTypes.object.isRequired,
      }),
    }),
  }).isRequired,
};

export default MainContent;
