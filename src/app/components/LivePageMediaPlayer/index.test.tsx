import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from '../react-testing-library-with-providers';
import LivePageMediaPlayer from '.';
import { validLivePageVideoWithCaptionBlock } from '../../legacy/containers/MediaPlayer/fixtureData';
import { LIVE_PAGE } from '../../routes/utils/pageTypes';

const GenerateMediaPlayer = ({ blocks }) => (
  <BrowserRouter>
    <LivePageMediaPlayer blocks={blocks} className="MediaPlayer" />
  </BrowserRouter>
);

describe('MediaPlayer', () => {
  it('Calls the canonical media player, with a placeholder', () => {
    const { container } = render(
      <GenerateMediaPlayer blocks={validLivePageVideoWithCaptionBlock} />,
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
      <GenerateMediaPlayer blocks={validLivePageVideoWithCaptionBlock} />,
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
