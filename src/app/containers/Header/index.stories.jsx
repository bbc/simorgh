import React from 'react';
import { storiesOf } from '@storybook/react';
import { withServicesKnob } from '@bbc/psammead-storybook-helpers';
import { withKnobs } from '@storybook/addon-knobs';
import HeaderContainer from '.';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';

storiesOf('Containers|Header', module)
  .addParameters({ chromatic: { disable: true } })
  .addDecorator(withKnobs)
  .addDecorator(withServicesKnob())
  .add('default', ({ service, variant }) => {
    return (
      <ToggleContextProvider service="mundo">
        <ServiceContextProvider service={service} variant={variant}>
          <RequestContextProvider
            isAmp={false}
            pageType="frontPage"
            service={service}
            bbcOrigin="https://www.test.bbc.com"
          >
            <HeaderContainer />
          </RequestContextProvider>
        </ServiceContextProvider>
      </ToggleContextProvider>
    );
  });
