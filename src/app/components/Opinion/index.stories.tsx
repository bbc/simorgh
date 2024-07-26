import React from 'react';
import Component from '.';
import FixutreData from './fixtureData';
import { OpinionBlocks } from './types';

export default {
  title: 'Components/Opinion',
  component: Component,
  argTypes: {
    blocks: {
      options: { default: FixutreData.model.blocks as OpinionBlocks[] },
      control: { type: 'select' },
    },
  },
};

export const DefaultComponent = () => (
  <Component blocks={FixutreData.model.blocks as OpinionBlocks[]} />
);
