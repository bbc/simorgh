import React from 'react';
import { any, arrayOf, shape } from 'prop-types';
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

  const obj1 = {
    a: 1,
    b: 2,
    c: 3,
  };

  const obj2 = Object.assign({ c: 4, d: 5 }, obj1);
  console.log(obj2.c);

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
