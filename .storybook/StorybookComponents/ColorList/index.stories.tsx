import React from 'react';
import { LEGACY } from '../../../docs/User-Experience/colours';
import ColorList from '.';
import metadata from './metadata.json';
import md from './README.md';

export default {
  title: 'components/ColorList',
  component: ColorList,
  parameters: {
    metadata,
    docs: {
      component: {
        title: 'Color List',
      },
      page: md,
    },
  },
};

export const colorCardWhite = () => <ColorList Colors={LEGACY} />;
