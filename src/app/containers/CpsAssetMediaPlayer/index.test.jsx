import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import {
  shouldMatchSnapshot,
  isNull,
  suppressPropWarnings,
} from '@bbc/psammead-test-helpers';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { ToggleContext } from '#contexts/ToggleContext';
import CpsAssetMediaPlayerContainer from '.';
import { defaultToggles } from '../MediaPlayer/fixtureData';
import videoBlock from './fixtures';

const GenerateMediaPlayer = ({
  /* eslint-disable react/prop-types */
  platform,
  blocks,
  assetUri,
  /* eslint-enable react/prop-types */
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
        <BrowserRouter>
          <CpsAssetMediaPlayerContainer blocks={blocks} assetUri={assetUri} />
        </BrowserRouter>
      </ToggleContext.Provider>
    </ServiceContextProvider>
  </RequestContextProvider>
);

describe('MediaPlayer', () => {
  shouldMatchSnapshot(
    'render the canonical player without a placeholder',
    <GenerateMediaPlayer
      platform="canonical"
      blocks={[videoBlock]}
      assetUri="/pidgin/123456789"
    />,
  );

  shouldMatchSnapshot(
    'render the amp player',
    <GenerateMediaPlayer
      platform="amp"
      blocks={[videoBlock]}
      assetUri="/pidgin/123456789"
    />,
  );

  shouldMatchSnapshot(
    'render canonical legacy media player',
    <GenerateMediaPlayer
      platform="canonical"
      blocks={[videoBlock]}
      assetUri="/russian/multimedia/2016/05/160505_v_diving_record"
      isLegacyMedia
    />,
  );

  shouldMatchSnapshot(
    'render amp legacy media player',
    <GenerateMediaPlayer
      platform="amp"
      blocks={[videoBlock]}
      assetUri="/russian/multimedia/2016/05/160505_v_diving_record"
      isLegacyMedia
    />,
  );

  suppressPropWarnings(['assetUri']);
  isNull(
    'is Null when assetUri is not provided',
    <GenerateMediaPlayer platform="canonical" blocks={[videoBlock]} />,
  );
});
