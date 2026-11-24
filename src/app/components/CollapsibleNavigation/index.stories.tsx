import { ToggleContextProvider } from '#app/contexts/ToggleContext';
import ThemeProvider from '#app/components/ThemeProvider';
import { ServiceContextProvider } from '#app/contexts/ServiceContext';
import CollapsibleNavigation from './index';
import type { CollapsibleNavigationSection } from './types';
import metadata from './metadata.json';
import readme from './README.md';
import { service as wsConfig } from '#app/lib/config/services/ws';

const Component = ({
  navigationSections,
}: {
  navigationSections: CollapsibleNavigationSection[];
}) => {
  return (
    <ToggleContextProvider>
      <ThemeProvider service="ws">
        <ServiceContextProvider service="ws">
          <CollapsibleNavigation navigationSections={navigationSections} />
        </ServiceContextProvider>
      </ThemeProvider>
    </ToggleContextProvider>
  );
};

export default {
  Component,
  title: 'Components/Collapsible Navigation',
  parameters: {
    metadata,
    docs: { readme },
  },
};

export const Example = () => (
  <Component navigationSections={wsConfig.default.collapsibleNavigation as CollapsibleNavigationSection[]} />
);
