import React from 'react';
import { storiesOf } from '@storybook/react';
import { withServicesKnob } from '@bbc/psammead-storybook-helpers';
import { withKnobs } from '@storybook/addon-knobs';
import NavigationContainer from '.';
import { ServiceContextProvider } from '#contexts/ServiceContext';

const stories = storiesOf('Containers|Navigation', module)
  .addParameters({ chromatic: { disable: true } })
  .addDecorator(withKnobs)
  .addDecorator(withServicesKnob());

stories.add(`default`, ({ service, variant }) => (
  <ServiceContextProvider service={service} variant={variant}>
    <NavigationContainer />
  </ServiceContextProvider>
));
