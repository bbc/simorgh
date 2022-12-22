import React from 'react';
import { addons } from '@storybook/addons';
import SidebarLabel from './SidebarLabel';

addons.setConfig({
  sidebar: {
    renderLabel: item => {
      return <SidebarLabel item={item} />;
    },
  },
});
