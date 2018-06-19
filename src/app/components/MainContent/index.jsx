import React from 'react';
import propTypes from 'prop-types';
import renderBlocks from '../../optimo/renderBlocks';

const MainContent = ({ model }) => {
  const renderedContent = renderBlocks(model.blocks);
  return <div>{renderedContent}</div>;
};

MainContent.propTypes = {
  model: propTypes.shape({
    blocks: propTypes.arrayOf(propTypes.any),
  }).isRequired,
};

export default MainContent;
