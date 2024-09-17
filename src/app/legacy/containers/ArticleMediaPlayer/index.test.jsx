import React from 'react';
import {
  ARTICLE_PAGE,
  MEDIA_ARTICLE_PAGE,
  MEDIA_ASSET_PAGE,
} from '#routes/utils/pageTypes';
import {
  render,
  screen,
} from '#components/react-testing-library-with-providers';
import ArticleMediaPlayerContainer from '.';
import { validAresMediaVideoBlock } from '../MediaPlayer/fixtureData';

const blocks = [validAresMediaVideoBlock];

const renderMediaPlayer = ({ platform, pageType }) =>
  render(<ArticleMediaPlayerContainer blocks={blocks} />, {
    isAmp: platform === 'amp',
    platform,
    service: 'news',
    statusCode: 200,
    id: 'c1234567890',
    pageType,
    pathname: '/pathname',
  });

describe('MediaPlayer', () => {
  it('Calls the canonical media player, with a placeholder', () => {
    const { container } = renderMediaPlayer({
      platform: 'canonical',
      pageType: ARTICLE_PAGE,
    });
    expect(container).toMatchSnapshot();
  });

  it('Calls the amp media player', () => {
    const { container } = renderMediaPlayer({
      platform: 'amp',
      pageType: ARTICLE_PAGE,
    });
    expect(container).toMatchSnapshot();
  });

  it('Should not render a placeholder for canonical MediaArticle pages', () => {
    renderMediaPlayer({
      platform: 'canonical',
      pageType: MEDIA_ARTICLE_PAGE,
    });

    const mediaPlayerIframe = screen.getByTitle(/media player/i);

    expect(mediaPlayerIframe).toBeInTheDocument();
  });

  it('Should not render a placeholder for canonical MediaAsset pages', () => {
    renderMediaPlayer({
      platform: 'canonical',
      pageType: MEDIA_ASSET_PAGE,
    });

    const mediaPlayerIframe = screen.getByTitle(/media player/i);

    expect(mediaPlayerIframe).toBeInTheDocument();
  });
});
