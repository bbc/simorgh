import React from 'react';
import { withServicesKnob } from '#psammead/psammead-storybook-helpers/src';
import { withKnobs } from '@storybook/addon-knobs';
import { ServiceContextProvider } from '../../../contexts/ServiceContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import { FRONT_PAGE } from '#app/routes/utils/pageTypes';
import AmpDecorator from '../../../../../.storybook/helpers/ampDecorator';
import Navigation from '.';

// eslint-disable-next-line react/prop-types
const Component = ({ isAmp = false, service, variant }) => (
  <RequestContextProvider
    isAmp={isAmp}
    service={service}
    pageType={FRONT_PAGE}
    pathname="/pathname"
  >
    <ServiceContextProvider service={service} variant={variant}>
      <Navigation />
    </ServiceContextProvider>
  </RequestContextProvider>
);

export default {
  title: 'Containers/Navigation',
  Component,
  parameters: { chromatic: { disable: true } },
  decorators: [withKnobs, withServicesKnob()],
};

export const Canonical = Component;
export const Amp = props => <Component isAmp {...props} />;
Amp.decorators = [AmpDecorator];
