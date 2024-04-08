import React from 'react';
import { addons } from '@storybook/manager-api';
import SidebarLabel from '.';

const ADDON_ID = 'bbc/component-health-sidebar';

addons.register(ADDON_ID, () => {
  addons.setConfig({
    sidebar: {
      renderLabel: item => {
        return <SidebarLabel item={item} />;
      },
    },
  });
});
