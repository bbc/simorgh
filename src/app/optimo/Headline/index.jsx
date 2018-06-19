import React from 'react';
import renderBlocks from '../renderBlocks';
import BlockContext from '../BlockContext';
import StyledHeadline from '../../components/Headline';

const Headline = ({ blocks }) => (
  <BlockContext.Provider value={{ BaseTextComponent: StyledHeadline }}>
    {renderBlocks(blocks)}
  </BlockContext.Provider>
);

export default Headline;
