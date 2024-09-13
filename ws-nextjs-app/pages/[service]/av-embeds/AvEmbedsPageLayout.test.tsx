import React from 'react';
import { Helmet } from 'react-helmet';
import {
  act,
  render,
} from '#app/components/react-testing-library-with-providers';
import serbianCyrCps from '#data/serbian/av-embeds/cyr/srbija-68707945.json';
import { MediaBlock } from '#app/components/MediaLoader/types';
import AvEmbedsPage from './AvEmbedsPageLayout';

// @ts-expect-error Mocking require to prevent race condition.
window.require = jest.fn();

describe('AV Embeds Page', () => {
  it('should render the AV Embeds page', async () => {
    const { getByTestId } = await act(async () => {
      return render(
        <AvEmbedsPage
          pageData={{
            mediaBlock: serbianCyrCps.data.avEmbed.content.model
              .blocks as unknown as MediaBlock[],
            metadata: {
              language: serbianCyrCps.data.avEmbed.metadata.language,
              type: 'avEmbeds',
            },
          }}
        />,
      );
    });

    expect(getByTestId('avembeds-mediaplayer')).toBeInTheDocument();
  });

  it('should render meta tags on AV Embeds page', async () => {
    await act(async () => {
      return render(
        <AvEmbedsPage
          pageData={{
            mediaBlock: serbianCyrCps.data.avEmbed.content.model
              .blocks as unknown as MediaBlock[],
            metadata: {
              language: serbianCyrCps.data.avEmbed.metadata.language,
              type: 'avEmbeds',
            },
          }}
        />,
        {
          id: 'serbian/cyr/srbija-68707945',
          service: 'serbian',
          variant: 'cyr',
        },
      );
    });

    const helmetMetaTags = Helmet.peek()?.metaTags;

    expect(helmetMetaTags).toEqual([
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, user-scalable=1',
      },
      { charset: 'utf-8' },
      { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge,chrome=1' },
      { property: 'og:type', content: 'video' },
      { property: 'og:site_name', content: 'BBC News' },
      { property: 'og:locale', content: 'sr-Cyrl' },
      {
        property: 'article:author',
        content: 'https://www.facebook.com/bbcnews',
      },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: '@bbcnews' },
      { name: 'twitter:creator', content: '@bbcnews' },
      { name: 'twitter:domain', content: 'www.bbc.com' },
      { name: 'apple-mobile-web-app-title', content: 'BBC News' },
      { name: 'application-name', content: 'BBC News' },
      { name: 'msapplication-TileImage', content: 'BBC News' },
      { name: 'msapplication-TileColor', content: '#bb1919' },
      { name: 'mobile-web-app-capable', content: 'yes' },
    ]);
  });
});
