import React from 'react';
import { LEGACY } from '../../../docs/User-Experience/colours';
import ColorList from '.';
import metadata from './metadata.json';

export default {
  title: 'components/ColorList',
  component: ColorList,
  parameters: {
    metadata,
  },
};

export const colorCardWhite = () => <ColorList Colors={LEGACY} />;
