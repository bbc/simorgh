import React from 'react';
import { storiesOf } from '@storybook/react';
import { withServicesKnob } from '@bbc/psammead-storybook-helpers';
import { withKnobs } from '@storybook/addon-knobs';
import Navigation from '.';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import AmpDecorator from '../../../../.storybook/helpers/ampDecorator';

storiesOf('Containers|Navigation/Canonical', module)
  .addParameters({ chromatic: { disable: true } })
  .addDecorator(withKnobs)
  .addDecorator(withServicesKnob())
  .add(`default`, ({ service, variant }) => (
    <ServiceContextProvider service={service} variant={variant}>
      <Navigation />
    </ServiceContextProvider>
  ));

storiesOf('Containers|Navigation/AMP', module)
  .addParameters({ chromatic: { disable: true } })
  .addDecorator(withKnobs)
  .addDecorator(withServicesKnob())
  .addDecorator(AmpDecorator)
  .add(`default`, ({ service, variant }) => (
    <RequestContextProvider
      isAmp
      service={service}
      pageType="frontPage"
      pathname="/pathname"
    >
      <ServiceContextProvider service={service} variant={variant}>
        <Navigation />
      </ServiceContextProvider>
    </RequestContextProvider>
  ));
