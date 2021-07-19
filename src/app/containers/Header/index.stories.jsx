import React from 'react';
import { withServicesKnob } from '@bbc/psammead-storybook-helpers';
import { withKnobs } from '@storybook/addon-knobs';
import HeaderContainer from '.';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import { FRONT_PAGE } from '#app/routes/utils/pageTypes';

// eslint-disable-next-line react/prop-types
const Component = ({ service, variant }) => {
  return (
    <ToggleContextProvider>
      <ServiceContextProvider service={service} variant={variant}>
        <RequestContextProvider
          isAmp={false}
          pageType={FRONT_PAGE}
          service={service}
          bbcOrigin="https://www.test.bbc.com"
        >
          <HeaderContainer />
        </RequestContextProvider>
      </ServiceContextProvider>
    </ToggleContextProvider>
  );
};

export default {
  title: 'Containers/Header',
  Component,
  parameters: {
    chromatic: { disable: true },
  },
  decorators: [withKnobs, withServicesKnob()],
};

export const Header = props => <Component {...props} />;
