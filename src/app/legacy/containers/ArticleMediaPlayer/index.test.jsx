import React from 'react';
import { ARTICLE_PAGE } from '#app/routes/utils/pageTypes';
import { render } from '../../../components/react-testing-library-with-providers';
import ArticleMediaPlayerContainer from '.';
import { validAresMediaVideoBlock } from '../MediaPlayer/fixtureData';

const blocks = [validAresMediaVideoBlock];

describe('MediaPlayer', () => {
  it('Calls the canonical media player, with a placeholder', () => {
    const { container } = render(
      <ArticleMediaPlayerContainer blocks={blocks} />,
      {
        platform: 'canonical',
        service: 'news',
        statusCode: 200,
        id: 'c1234567890',
        pageType: ARTICLE_PAGE,
        pathname: '/pathname',
      },
    );
    expect(container).toMatchSnapshot();
  });

  it('Calls the amp media player', () => {
    const { container } = render(
      <ArticleMediaPlayerContainer blocks={blocks} />,
      {
        isAmp: true,
        platform: 'amp',
        service: 'news',
        statusCode: 200,
        id: 'c1234567890',
        pageType: ARTICLE_PAGE,
        pathname: '/pathname',
      },
    );
    expect(container).toMatchSnapshot();
  });
});
