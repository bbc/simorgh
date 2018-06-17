import React from 'react';

const Text = ({ model }) => {
  const { blocks } = model;

  blocks.map(({ model: blockModel }) => <p>{blockModel.text}</p>);
};

export default Text;
