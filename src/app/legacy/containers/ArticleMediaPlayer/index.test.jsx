import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ARTICLE_PAGE } from '#app/routes/utils/pageTypes';
import { render } from '../../../components/react-testing-library-with-providers';
import { ServiceContextProvider } from '../../../contexts/ServiceContext';
import ArticleMediaPlayerContainer from '.';
import { validAresMediaVideoBlock } from '../MediaPlayer/fixtureData';

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
    pageType={ARTICLE_PAGE}
    pathname="/pathname"
  >
    <ServiceContextProvider service="news">
      <BrowserRouter>
        <ArticleMediaPlayerContainer blocks={blocks} />
      </BrowserRouter>
    </ServiceContextProvider>
  </RequestContextProvider>
);

describe('MediaPlayer', () => {
  it('Calls the canonical media player, with a placeholder', () => {
    const { container } = render(
      <GenerateMediaPlayer
        platform="canonical"
        blocks={[validAresMediaVideoBlock]}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('Calls the amp media player', () => {
    const { container } = render(
      <GenerateMediaPlayer
        platform="amp"
        blocks={[validAresMediaVideoBlock]}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
