import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import { BrowserRouter } from 'react-router-dom';
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
  /* eslint-enable react/prop-types */
}) => (
  <RequestContextProvider
    isAmp={platform === 'amp'}
    service="news"
    statusCode={200}
    platform={platform}
    id="c1234567890"
    pageType="article"
    pathname="/pathname"
  >
    <ServiceContextProvider service="news">
      <ToggleContext.Provider
        value={{ toggleState: defaultToggles, toggleDispatch: jest.fn() }}
      >
        <BrowserRouter>
          <ArticleMediaPlayerContainer blocks={blocks} />
        </BrowserRouter>
      </ToggleContext.Provider>
    </ServiceContextProvider>
  </RequestContextProvider>
);

describe('MediaPlayer', () => {
  shouldMatchSnapshot(
    'Calls the canonical media player, with a placeholder',
    <GenerateMediaPlayer
      platform="canonical"
      blocks={[validAresMediaVideoBlock]}
    />,
  );

  shouldMatchSnapshot(
    'Calls the amp media player',
    <GenerateMediaPlayer platform="amp" blocks={[validAresMediaVideoBlock]} />,
  );
});
