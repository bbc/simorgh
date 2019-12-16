import React from 'react';
import { storiesOf } from '@storybook/react';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import Ad from '.';
import AmpDecorator from '../../../../.storybook/helpers/ampDecorator';

storiesOf('Ads', module)
  .addDecorator(AmpDecorator)
  .add('Ad', () => (
    <ToggleContextProvider>
      <ServiceContextProvider service="news">
        <RequestContextProvider
          isAmp
          id="123"
          pageType="article"
          service="news"
          platform="amp"
        >
          <Ad />
        </RequestContextProvider>
      </ServiceContextProvider>
    </ToggleContextProvider>
  ));
