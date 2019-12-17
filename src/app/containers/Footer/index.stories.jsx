import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { withServicesKnob } from '@bbc/psammead-storybook-helpers';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import Footer from '.';

storiesOf('Containers|Footer', module)
  .addParameters({ chromatic: { disable: true } })
  .addDecorator(withKnobs)
  .addDecorator(withServicesKnob())
  .add('default', ({ service }) => {
    return (
      <ServiceContextProvider service={service}>
        <Footer />
      </ServiceContextProvider>
    );
  });
