import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { ToggleContext } from '#contexts/ToggleContext';
import CpsAssetMediaPlayerContainer from '.';
import {
  validAresMediaVideoBlock,
  defaultToggles,
} from '../MediaPlayer/fixtureData';

const GenerateMediaPlayer = ({
  /* eslint-disable react/prop-types */
  platform,
  blocks,
  assetUri,
  /* eslint-disable react/prop-types */
}) => (
  <RequestContextProvider
    isAmp={platform === 'amp'}
    service="news"
    statusCode={200}
    platform={platform}
    id="foo"
    pageType="MAP"
    pathname="/pathname"
  >
    <ServiceContextProvider service="news">
      <ToggleContext.Provider
        value={{ toggleState: defaultToggles, toggleDispatch: jest.fn() }}
      >
        <CpsAssetMediaPlayerContainer blocks={blocks} assetUri={assetUri} />
      </ToggleContext.Provider>
    </ServiceContextProvider>
  </RequestContextProvider>
);

describe('MediaPlayer', () => {
  shouldMatchSnapshot(
    'Calls the canonical placeholder when platform is canonical and showPlaceholder is true',
    <GenerateMediaPlayer
      platform="canonical"
      blocks={[validAresMediaVideoBlock]}
      assetUri="/pidgin/123456789"
    />,
  );
});
