import React from 'react';
import { any, arrayOf, shape } from 'prop-types';
import Headline from '../Headline';
import Text from '../Text';

const render = ({ blocks }) =>
  blocks.map(block => {
    const { type, blockId } = block;

    let Element = Text;
    if (type === 'headline') {
      Element = Headline;
    }

    return (
      <Element {...block.model} key={blockId} />
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
