import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { ToggleContext } from '#contexts/ToggleContext';
import ArticleMediaPlayerContainer from '.';
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
    pageType="article"
    pathname="/pathname"
  >
    <ServiceContextProvider service="news">
      <ToggleContext.Provider
        value={{ toggleState: defaultToggles, toggleDispatch: jest.fn() }}
      >
        <ArticleMediaPlayerContainer blocks={blocks} assetUri={assetUri} />
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
      assetUri="c123467890o"
    />,
  );
});
