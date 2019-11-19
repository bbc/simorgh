import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { withServicesKnob } from '@bbc/psammead-storybook-helpers';
import AMPMostReadContainer from './Amp';
import CanonicalMostReadContainer from './Canonical';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import AmpDecorator from '../../../../.storybook/helpers/ampDecorator';

const renderMostReadContainer = (container, service, isAmp) => (
  <RequestContextProvider
    bbcOrigin={`/${service}/articles/c0000000000o`}
    id="c0000000000o"
    isAmp={isAmp}
    pageType="article"
    service={service}
    statusCode={200}
    pathname={`/${service}`}
    variant={null}
  >
    <ServiceContextProvider service={service} variant={null}>
      {container}
    </ServiceContextProvider>
  </RequestContextProvider>
);

const stories = storiesOf('Containers|MostRead', module)
  .addDecorator(withKnobs)
  .addDecorator(withServicesKnob())
  .addParameters({
    chromatic: { disable: true },
  });

stories.add('Canonical Most Read', ({ service }) => {
  console.log('service', service);
  const container = <CanonicalMostReadContainer endpoint="/most_read.json" />;
  return renderMostReadContainer(container, service, false);
});

stories.addDecorator(AmpDecorator).add('Amp Most Read', ({ service }) => {
  console.log('service', service);
  const container = <AMPMostReadContainer endpoint="/most_read.json" />;
  return renderMostReadContainer(container, service, true);
});
