import React from 'react';
import { LEGACY } from '../../../docs/User-Experience/colours';
import ColorList from '.';
import metadata from './metadata.json';
import readme from './README.md';

export default {
  title: 'components/ColorList',
  component: ColorList,
  parameters: {
    metadata,
    docs: { readme },
  },
};

export const colorCardWhite = () => <ColorList Colors={LEGACY} />;
