import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from '#components/react-testing-library-with-providers';
import { validLivePageVideoWithCaptionBlock } from '#legacy/containers/MediaPlayer/fixtureData';
import { LIVE_PAGE } from '#routes/utils/pageTypes';
import LivePageMediaPlayer from '.';
import { MediaBlock } from '../MediaLoader/types';

const GenerateMediaPlayer = ({ blocks }: { blocks: MediaBlock[] }) => (
  <BrowserRouter>
    <LivePageMediaPlayer blocks={blocks} className="MediaPlayer" />
  </BrowserRouter>
);

describe('LegacyLiveMediaPlayer', () => {
  it('Calls the canonical media player, with a placeholder', () => {
    const { container } = render(
      <GenerateMediaPlayer
        blocks={validLivePageVideoWithCaptionBlock as MediaBlock[]}
      />,
      {
        id: 'c7p765ynk9qt',
        service: 'pidgin',
        pageType: LIVE_PAGE,
        pathname: '/pidgin/live/c7p765ynk9qt',
        statusCode: 200,
      },
    );
    expect(container).toMatchSnapshot();
  });

  it('Calls the amp media player', () => {
    const { container } = render(
      <GenerateMediaPlayer
        blocks={validLivePageVideoWithCaptionBlock as MediaBlock[]}
      />,
      {
        isAmp: true,
        id: 'c7p765ynk9qt',
        service: 'pidgin',
        pageType: LIVE_PAGE,
        pathname: '/pidgin/live/c7p765ynk9qt',
        statusCode: 200,
      },
    );
    expect(container).toMatchSnapshot();
  });
});
