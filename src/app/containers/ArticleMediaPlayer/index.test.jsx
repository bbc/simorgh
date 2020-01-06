import React from 'react';
import renderWithRouter from '#testHelpers/renderWithRouter';
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
        <ArticleMediaPlayerContainer blocks={blocks} />
      </ToggleContext.Provider>
    </ServiceContextProvider>
  </RequestContextProvider>
);

describe('MediaPlayer', () => {
  beforeEach(() => {
    process.env.SIMORGH_EMBEDS_BASE_URL_TEST = 'https://embed-host.bbc.com';
  });

  it('Calls the canonical media player, with a placeholder', () => {
    const { asFragment } = renderWithRouter(
      <GenerateMediaPlayer
        platform="canonical"
        blocks={[validAresMediaVideoBlock]}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('Calls the amp media player', () => {
    const { asFragment } = renderWithRouter(
      <GenerateMediaPlayer
        platform="amp"
        blocks={[validAresMediaVideoBlock]}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
