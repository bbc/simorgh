import React from 'react';
import { ToggleContextProvider } from '#app/contexts/ToggleContext';
import ThemeProvider from '#app/components/ThemeProvider';
import { ServiceContextProvider } from '#app/contexts/ServiceContext';
import CollapsibleNavigation from './index';
import type { CollapsibleNavigationSection } from './types';
import collapsibleNavigationSections from './constants';
import metadata from './metadata.json';
import readme from './README.md';

const Component = ({
  collapsibleNavigationSectionList,
}: {
  collapsibleNavigationSectionList: CollapsibleNavigationSection[];
}) => {
  return (
    <ToggleContextProvider>
      <ThemeProvider service="mundo">
        <ServiceContextProvider service="mundo">
          <CollapsibleNavigation
            navigationSections={collapsibleNavigationSectionList}
          />
        </ServiceContextProvider>
      </ThemeProvider>
    </ToggleContextProvider>
  );
};

export default {
  Component,
  title: 'Components/CollapsibleNavigation',
  parameters: {
    metadata,
    docs: { readme },
  },
};

export const Example = () => (
  <Component collapsibleNavigationSectionList={collapsibleNavigationSections} />
);
