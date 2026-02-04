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

type StoryComponentProps = {
  isAmp?: boolean;
  service: Services;
  propsForTopBarOJComponent?: PropsForTopBarOJComponent | null;
};

const Component = ({
  isAmp = false,
  service,
  propsForTopBarOJComponent,
}: StoryComponentProps) => (
  <RequestContextProvider
    isAmp={isAmp}
    service={service}
    pageType={HOME_PAGE}
    pathname="/pathname"
  >
    <Navigation
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
