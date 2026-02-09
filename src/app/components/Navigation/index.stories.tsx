import { RequestContextProvider } from '#contexts/RequestContext';
import { HOME_PAGE } from '#app/routes/utils/pageTypes';
import {
  topStoriesBlocks,
  mostReadBlocks,
} from '../ArticleLinksBlock/helpers/fixtureData';
import AmpDecorator from '../../../../.storybook/helpers/ampDecorator/index.jsx';
import Navigation from '.';

import type { Services } from '#models/types/global';
import type { PropsForTopBarOJComponent } from './types';

const mockScript = {}; // Replace with a realistic script object if needed
const mockDir = 'ltr'; // or 'rtl' depending on the service
const mockScrollableListItems = (
  <ul>
    <li>Mock Item</li>
  </ul>
);
const mockDropdownListItems = (
  <ul>
    <li>Mock Dropdown</li>
  </ul>
);
const mockMenuAnnouncedText = 'Menu';
const mockService = 'arabic';

type StoryComponentProps = {
  isAmp?: boolean;
  service: Services;
  propsForTopBarOJComponent?: PropsForTopBarOJComponent | null;
};

const Component = ({
  isAmp = false,
  service = mockService,
  propsForTopBarOJComponent,
}: StoryComponentProps) => (
  <RequestContextProvider
    isAmp={isAmp}
    service={service}
    pageType={HOME_PAGE}
    pathname="/pathname"
  >
    <Navigation
      script={mockScript}
      service={service}
      dir={mockDir}
      scrollableListItems={mockScrollableListItems}
      dropdownListItems={mockDropdownListItems}
      menuAnnouncedText={mockMenuAnnouncedText}
      propsForTopBarOJComponent={propsForTopBarOJComponent ?? undefined}
    />
  </RequestContextProvider>
);

export default {
  title: 'Containers/Navigation',
  Component,
  parameters: { chromatic: { disable: true } },
};

export const Canonical = (_, { service }) => <Component service={service} />;
export const Amp = (_, { service }) => <Component isAmp service={service} />;
Amp.decorators = [AmpDecorator];

export const CanonicalWithOJTopBarExperimentTopStories = (_, { service }) => {
  const propsForTopBarOJComponent = {
    blocks: topStoriesBlocks,
    experimentVariant: 'A',
  };
  return (
    <Component
      service={service}
      propsForTopBarOJComponent={propsForTopBarOJComponent}
    />
  );
};

export const CanonicalWithOJTopBarExperimentMostRead = (_, { service }) => {
  const propsForTopBarOJComponent = {
    blocks: mostReadBlocks,
    experimentVariant: 'B',
  };
  return (
    <Component
      service={service}
      propsForTopBarOJComponent={propsForTopBarOJComponent}
    />
  );
};
