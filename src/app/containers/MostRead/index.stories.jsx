import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { withServicesKnob } from '@bbc/psammead-storybook-helpers';
import MostReadContainer from '.';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { ToggleContext } from '#contexts/ToggleContext';

const staticMostReadURL = (service, variant) =>
  variant !== 'default'
    ? `/data/${service}/mostRead/${variant}.json`
    : `/data/${service}/mostRead/index.json`;

const getToggleState = enabled => ({
  local: { mostRead: { enabled } },
});

const renderMostReadContainer = (service, variant) => (
  <ToggleContext.Provider value={{ toggleState: getToggleState(true) }}>
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
          endpointOverride={staticMostReadURL(service, variant)}
        />
      </ServiceContextProvider>
    </RequestContextProvider>
  </ToggleContext.Provider>
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
