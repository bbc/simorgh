import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import { UserContextProvider } from '#contexts/UserContext';
import MostReadPage from '.';
import pidginMostReadData from '#data/pidgin/mostRead';

storiesOf('Pages|Most Read Page', module)
  .addDecorator(withKnobs)
  .add('Pidgin', () => (
    <ToggleContextProvider service="pidgin" origin="https://www.test.bbc.com">
      <ServiceContextProvider service="pidgin">
        <RequestContextProvider
          isAmp={false}
          pageType="mostRead"
          service="pidgin"
        >
          <UserContextProvider>
            <MostReadPage pageData={pidginMostReadData} />
          </UserContextProvider>
        </RequestContextProvider>
      </ServiceContextProvider>
    </ToggleContextProvider>
  ));
