import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { BrowserRouter } from 'react-router-dom';
import AmpDecorator from '../../../../.storybook/helpers/ampDecorator';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import CpsAssetMediaPlayerContainer from '.';
import videoBlock from './fixtureData';

const defaultToggles = {
  test: {
    mediaPlayer: {
      enabled: true,
    },
  },
};

storiesOf('Containers|MAP Media Player/Canonical', module)
  .addParameters({ chromatic: { disable: true } })
  .addDecorator(withKnobs)
  .add('default', () => {
    return (
      <ToggleContextProvider value={{ toggleState: defaultToggles }}>
        <ServiceContextProvider service="pidgin">
          <RequestContextProvider
            isAmp={false}
            pageType="MAP"
            origin="https://www.bbc.com"
            service="pidgin"
            pathname="/pathname"
          >
            <BrowserRouter>
              <CpsAssetMediaPlayerContainer
                blocks={[videoBlock]}
                assetUri="/pidgin/23248703"
              />
            </BrowserRouter>
          </RequestContextProvider>
        </ServiceContextProvider>
      </ToggleContextProvider>
    );
  });

storiesOf('Containers|MAP Media Player/AMP', module)
  .addParameters({ chromatic: { disable: true } })
  .addDecorator(withKnobs)
  .addDecorator(AmpDecorator)
  .add('default', () => {
    return (
      <ToggleContextProvider value={{ toggleState: defaultToggles }}>
        <ServiceContextProvider service="pidgin">
          <RequestContextProvider
            isAmp
            pageType="MAP"
            origin="https://www.bbc.com"
            service="pidgin"
            pathname="/pathname"
          >
            <BrowserRouter>
              <CpsAssetMediaPlayerContainer
                blocks={[videoBlock]}
                assetUri="/pidgin/23248703"
              />
            </BrowserRouter>
          </RequestContextProvider>
        </ServiceContextProvider>
      </ToggleContextProvider>
    );
  });
