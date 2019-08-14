import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line
import { withKnobs } from '@storybook/addon-knobs';
import { dirDecorator } from '@bbc/psammead-storybook-helpers';
import AmpDecorator from '../../../../.storybook/helpers/ampDecorator';
import MediaPlayerContainer from '.';
import { validVideoFixture } from './helpers/fixtures';
import { RequestContextProvider } from '../../contexts/RequestContext';
import { ToggleContext } from '../../contexts/ToggleContext';

const defaultToggles = {
  test: {
    mediaPlayer: {
      enabled: true,
    },
  },
};

storiesOf('Containers|Media Player/Canonical', module)
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
        bbcOrigin="test.foo"
      >
        <ToggleContext.Provider value={{ toggleState: defaultToggles }}>
          <MediaPlayerContainer blocks={validVideoFixture} />
        </ToggleContext.Provider>
      </RequestContextProvider>
    );
  });

storiesOf('Containers|Media Player/AMP', module)
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
        bbcOrigin="test.foo"
      >
        <ToggleContext.Provider value={{ toggleState: defaultToggles }}>
          <MediaPlayerContainer blocks={validVideoFixture} />
        </ToggleContext.Provider>
      </RequestContextProvider>
    );
  });
