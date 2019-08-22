import React from 'react';
import { storiesOf } from '@storybook/react';
import { inputProvider } from '@bbc/psammead-storybook-helpers';
import { withKnobs } from '@storybook/addon-knobs';
import HeaderContainer from '.';
import { RequestContextProvider } from '../../contexts/RequestContext';
import services from '../../lib/config/services';
import { ServiceContextProvider } from '../../contexts/ServiceContext';

storiesOf('Containers|Header', module)
  .addDecorator(withKnobs)
  .add(
    'default',
    inputProvider(
      null,
      ({ service }) => {
        return (
          <ServiceContextProvider service={service}>
            <RequestContextProvider
              pageType="frontPage"
              isAmp={false}
              service={service}
            >
              <HeaderContainer />
            </RequestContextProvider>
          </ServiceContextProvider>
        );
      },
      Object.keys(services),
    ),
  );
