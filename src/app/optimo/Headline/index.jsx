import React from 'react';
import renderBlocks from '../renderBlocks';
import BaseTextContext from '../BaseText/Context';
import StyledHeadline from '../../components/Headline';

const Headline = ({ blocks }) => (
  <BaseTextContext.Provider value={StyledHeadline}>
    {renderBlocks(blocks)}
  </BaseTextContext.Provider>
);

export default Headline;
