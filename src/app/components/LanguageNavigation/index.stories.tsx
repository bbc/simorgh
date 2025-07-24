import React from 'react';
import CollapsibleNavigation from './index';
import CollapsibleNavigationSections from './constants';

export default {
  title: 'Components/CollapsibleNavigation',
  component: CollapsibleNavigation,
};

export const Default = () => (
  <CollapsibleNavigation
    CollapsibleNavigationSections={CollapsibleNavigationSections}
  />
);
