import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { withServicesKnob } from '@bbc/psammead-storybook-helpers';
import MostReadContainer from '.';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ServiceContextProvider } from '#contexts/ServiceContext';

const staticMostReadURL = (service, variant) =>
  variant !== 'default'
    ? `/data/${service}/mostRead/${variant}.json`
    : `/data/${service}/mostRead/index.json`;

const renderMostReadContainer = (service, variant) => (
  <RequestContextProvider
    bbcOrigin={`/${service}/articles/c0000000000o`}
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
        endpointOverride={staticMostReadURL(service, variant)}
      />
    </ServiceContextProvider>
  </RequestContextProvider>
);

const stories = storiesOf('Containers|MostRead', module)
  .addDecorator(withKnobs)
  .addDecorator(withServicesKnob())
  .addParameters({
    chromatic: { disable: true },
  });

stories.add('Canonical Most Read', ({ service, variant }) => {
  return renderMostReadContainer(service, variant);
});
