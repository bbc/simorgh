import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { LIVE_PAGE } from '#app/routes/utils/pageTypes';
import { render } from '../../../components/react-testing-library-with-providers';
import LivePageMediaPlayer from '.';
import { validLivePageVideoWithCaptionBlock } from '../MediaPlayer/fixtureData';

const GenerateMediaPlayer = ({
  /* eslint-disable react/prop-types */
  blocks,
  /* eslint-enable react/prop-types */
}) => (
  <BrowserRouter>
    <LivePageMediaPlayer blocks={blocks} />
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
