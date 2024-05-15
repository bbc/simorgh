import React from 'react';
import { RequestContextProvider } from '#contexts/RequestContext';
import { FRONT_PAGE } from '#app/routes/utils/pageTypes';
import AmpDecorator from '../../../../../.storybook/helpers/ampDecorator';
import Navigation from '.';

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
};

export const Canonical = (_, globalArgs) => <Component {...globalArgs} />;
export const Amp = (_, globalArgs) => <Component isAmp {...globalArgs} />;
Amp.decorators = [AmpDecorator];
