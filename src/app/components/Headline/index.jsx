import React from 'react';

const Headline = ({ model }) => {
  const { text } = model.blocks[0].model.blocks[0].model;

  return <h1>{text}</h1>;
};

export default Headline;
