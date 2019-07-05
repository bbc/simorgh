import React from 'react';
import { storiesOf } from '@storybook/react';
import * as svgs from '@bbc/psammead-assets/svgs';
import { inputProvider } from '@bbc/psammead-storybook-helpers';
import { withKnobs } from '@storybook/addon-knobs';
import HeaderContainer from '.';
import { RequestContextProvider } from '../../contexts/RequestContext';
import services from '../../lib/config/services';
import { ServiceContextProvider } from '../../contexts/ServiceContext';

storiesOf('Header Container', module)
  .addDecorator(withKnobs)
  .add(
    'default',
    inputProvider(
      null,
      ({ service }) => {
        const serviceContextStub = {
          product: 'BBC News',
          service,
          brandSVG: svgs[service],
        };
        return (
          <ServiceContextProvider service={service} value={serviceContextStub}>
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
