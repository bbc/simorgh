import React from 'react';
import headings from '../Headings';
import text from '../Text';
import image from '../Image';
import mainContentModelPropTypes from '../../models/propTypes/mainContent';
import MainContent from '../../components/MainContent';

// Inlined as this is a temporary component
const BlockString = props => {
  const stringProps = JSON.stringify(props);
  return <p>{stringProps}</p>;
};

const Blocks = {
  headline: headings,
  subheading: headings,
  text,
  image,
};

const render = blocks =>
  blocks.map((block, index) => {
    const { type, blockId, model } = block;

    const { type: typeOfPreviousBlock } = blocks[index - 1] || {};

    const Block = Blocks[type] || BlockString;

    return (
      <Block
        key={blockId}
        type={type}
        typeOfPreviousBlock={typeOfPreviousBlock}
        {...model}
      />
    );
  });

const MainContentContainer = ({ blocks }) => {
  const renderedContent = render(blocks);
  return <MainContent>{renderedContent}</MainContent>;
};

MainContentContainer.propTypes = mainContentModelPropTypes;

export default MainContentContainer;
