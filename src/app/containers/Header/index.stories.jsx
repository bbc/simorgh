import React from 'react';
import { storiesOf } from '@storybook/react';
import { inputProvider } from '@bbc/psammead-storybook-helpers';
import { withKnobs } from '@storybook/addon-knobs';
import HeaderContainer from '.';
import { RequestContextProvider } from '#contexts/RequestContext';
import services from '#lib/config/services';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';

storiesOf('Containers|Header', module)
  .addDecorator(withKnobs)
  .add(
    'default',
    inputProvider(
      null,
      ({ service }) => {
        return (
          <ToggleContextProvider>
            <ServiceContextProvider service={service}>
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
      },
      Object.keys(services),
    ),
  );
