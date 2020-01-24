import React from 'react';
import { storiesOf } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import AmpDecorator from '../../../../.storybook/helpers/ampDecorator';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import CPSMap from '.';
import pageData from './fixtureData';

const defaultToggles = {
  test: {
    mediaPlayer: {
      enabled: true,
    },
  },
};

storiesOf('Pages|Media Asset Page/Canonical', module).add('pidgin', () => (
  <ToggleContextProvider value={{ toggleState: defaultToggles }}>
    <BrowserRouter>
      <CPSMap
        pageType="MAP"
        isAmp={false}
        pathname="/pathname"
        status={200}
        pageData={pageData}
        service="pidgin"
      />
    </BrowserRouter>
  </ToggleContextProvider>
));

storiesOf('Pages|Media Asset Page/AMP', module).add('pidgin', () => (
  <ToggleContextProvider value={{ toggleState: defaultToggles }}>
    <BrowserRouter>
      <CPSMap
        pageType="MAP"
        isAmp
        pathname="/pathname"
        status={200}
        pageData={pageData}
        service="pidgin"
      />
    </BrowserRouter>
  </ToggleContextProvider>
));
