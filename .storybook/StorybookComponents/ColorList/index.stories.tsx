import React from 'react';
import { LEGACY } from '../../../docs/User-Experience/colours';
import ColorList from './';

export default {
  title: 'storybook components/ColorCard',
  component: ColorList,
};

export const colorCardWhite = () => <ColorList Colors={LEGACY} />;
