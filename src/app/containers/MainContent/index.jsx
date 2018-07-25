import React from 'react';
import headline from '../Headings';
import text from '../Text';
import video from '../Video';
import mainContentModelPropTypes from '../../models/propTypes/mainContent';
import MainContent from '../../components/MainContent';

// Inlined as this is a temporary component
const BlockString = props => {
  const stringProps = JSON.stringify(props);
  return <p>{stringProps}</p>;
};

const Blocks = {
  headline,
  text,
  video,
};

const render = blocks =>
  blocks.map(block => {
    const { type, blockId, model } = block;

    const Block = Blocks[type] || BlockString;

    return <Block key={blockId} type={type} {...model} />;
  });

const MainContentContainer = ({ blocks }) => {
  const renderedContent = render(blocks);
  return <MainContent>{renderedContent}</MainContent>;
};

MainContentContainer.propTypes = mainContentModelPropTypes;

export default MainContentContainer;
