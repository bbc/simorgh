import React from 'react';
import { RequestContextProvider } from '#contexts/RequestContext';
import { HOME_PAGE } from '#app/routes/utils/pageTypes';
import {
  topStoriesBlocks,
  mostReadBlocks,
} from '../../components/ScrollablePromo/helpers/fixtureData';
import AmpDecorator from '../../../../../.storybook/helpers/ampDecorator';
import Navigation from '.';

const Component = ({ isAmp = false, service, propsForOJExperiment = null }) => (
  <RequestContextProvider
    isAmp={isAmp}
    service={service}
    pageType={HOME_PAGE}
    pathname="/pathname"
  >
    <Navigation propsForOJExperiment={propsForOJExperiment} />
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
  const propsForOJExperiment = {
    blocks: topStoriesBlocks,
    experimentVariant: 'A',
  };
  return (
    <Component service={service} propsForOJExperiment={propsForOJExperiment} />
  );
};

export const CanonicalWithOJTopBarExperimentMostRead = (_, { service }) => {
  const propsForOJExperiment = {
    blocks: mostReadBlocks,
    experimentVariant: 'B',
  };
  return (
    <Component service={service} propsForOJExperiment={propsForOJExperiment} />
  );
};
