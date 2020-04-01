import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { BrowserRouter } from 'react-router-dom';
import AmpDecorator from '../../../../.storybook/helpers/ampDecorator';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import CpsAssetMediaPlayerContainer from '.';
import videoBlock from './fixtures';
import WithTimeMachine from '#testHelpers/withTimeMachine';

const defaultToggles = {
  mediaPlayer: {
    enabled: true,
  },
};

const isAmp = (platform) => platform === 'AMP';

const platforms = ['Canonical', 'AMP'];

platforms.forEach((platform) => {
  const mapMediaPlayerStories = storiesOf(
    `Containers|MAP Media Player/${platform}`,
    module,
  );

  mapMediaPlayerStories
    .addDecorator((story) => <WithTimeMachine>{story()}</WithTimeMachine>)
    .addDecorator(withKnobs);

  if (isAmp(platform)) {
    mapMediaPlayerStories.addDecorator(AmpDecorator);
  }

  mapMediaPlayerStories.add('default', () => {
    return (
      <ToggleContextProvider
        value={{ toggleState: defaultToggles }}
        origin="https://www.bbc.com"
      >
        <ServiceContextProvider service="pidgin">
          <RequestContextProvider
            isAmp={isAmp(platform)}
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
});
