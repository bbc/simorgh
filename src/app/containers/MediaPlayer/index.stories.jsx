import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line
import { withKnobs } from '@storybook/addon-knobs';
import { dirDecorator } from '@bbc/psammead-storybook-helpers';
import AmpDecorator from '../../../../.storybook/helpers/ampDecorator';
import MediaPlayerContainer from '.';
import { validVideoWithCaptionBlock } from './fixtureData';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { ToggleContext } from '#contexts/ToggleContext';

const defaultToggles = {
  test: {
    mediaPlayer: {
      enabled: true,
    },
  },
};

storiesOf('Containers|Media Player/Canonical', module)
  .addParameters({ chromatic: { disable: true } })
  .addDecorator(withKnobs)
  .addDecorator(dirDecorator)
  .add('default', ({ service }) => {
    return (
      <RequestContextProvider
        isAmp={false}
        service={service}
        platform="canonical"
        id="c3wmq4d1y3wo"
        pageType="article"
        bbcOrigin="https://www.test.bbc.com"
      >
        <ServiceContextProvider service="news">
          <ToggleContext.Provider value={{ toggleState: defaultToggles }}>
            <MediaPlayerContainer blocks={validVideoWithCaptionBlock} />
          </ToggleContext.Provider>
        </ServiceContextProvider>
      </RequestContextProvider>
    );
  });

storiesOf('Containers|Media Player/AMP', module)
  .addParameters({ chromatic: { disable: true } })
  .addDecorator(withKnobs)
  .addDecorator(dirDecorator)
  .addDecorator(AmpDecorator)
  .add('default', ({ service }) => {
    return (
      <RequestContextProvider
        isAmp
        service={service}
        platform="amp"
        id="c3wmq4d1y3wo"
        pageType="article"
        bbcOrigin="https://www.test.bbc.com"
      >
        <ServiceContextProvider service="news">
          <ToggleContext.Provider value={{ toggleState: defaultToggles }}>
            <MediaPlayerContainer blocks={validVideoWithCaptionBlock} />
          </ToggleContext.Provider>
        </ServiceContextProvider>
      </RequestContextProvider>
    );
  });
