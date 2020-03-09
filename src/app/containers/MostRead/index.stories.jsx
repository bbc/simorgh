import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import {
  withServicesKnob,
  buildRTLSubstories,
} from '@bbc/psammead-storybook-helpers';
import MostReadContainer from '.';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';

const staticMostReadURL = (service, variant) =>
  variant !== 'default'
    ? `./data/${service}/mostRead/${variant}.json`
    : `./data/${service}/mostRead/index.json`;

const renderMostReadContainer = (service, variant, maxTwoColumns) => (
  <ToggleContextProvider service={service}>
    <RequestContextProvider
      bbcOrigin={`http://localhost/${service}/articles/c0000000000o`}
      id="c0000000000o"
      isAmp={false}
      pageType="article"
      service={service}
      statusCode={200}
      pathname={`/${service}`}
      variant={variant}
    >
      <ServiceContextProvider service={service} variant={variant}>
        <MostReadContainer
          mostReadEndpointOverride={staticMostReadURL(service, variant)}
          maxTwoColumns={maxTwoColumns}
        />
      </ServiceContextProvider>
    </RequestContextProvider>
  </ToggleContextProvider>
);

const MOST_READ_STORIES = 'Containers|MostRead/Canonical';
const stories = storiesOf(MOST_READ_STORIES, module)
  .addDecorator(withKnobs)
  .addDecorator(withServicesKnob({ defaultService: 'pidgin' }))
  .addParameters({
    chromatic: { disable: true },
  });

stories.add('Front Page (2 Columns)', ({ service, variant }) => {
  return renderMostReadContainer(service, variant, true);
});

stories.add('Article Page (5 Columns)', ({ service, variant }) => {
  return renderMostReadContainer(service, variant, false);
});

buildRTLSubstories(MOST_READ_STORIES);
