import React from 'react';
import { RequestContextProvider } from '#contexts/RequestContext';
import { FRONT_PAGE } from '#app/routes/utils/pageTypes';
import AmpDecorator from '../../../../../.storybook/helpers/ampDecorator';
import Navigation from '.';
import withServicesDecorator from '../../../utilities/withServicesDecorator';

// eslint-disable-next-line react/prop-types
const Component = ({ isAmp = false, service }) => (
  <RequestContextProvider
    isAmp={isAmp}
    service={service}
    pageType={FRONT_PAGE}
    pathname="/pathname"
  >
    <Navigation />
  </RequestContextProvider>
);

export default {
  title: 'Containers/Navigation',
  Component,
  parameters: { chromatic: { disable: true } },
  decorators: [withServicesDecorator],
};

export const Canonical = (_, globalArgs) => <Component {...globalArgs} />;
export const Amp = (_, globalArgs) => <Component isAmp {...globalArgs} />;
Amp.decorators = [AmpDecorator];
