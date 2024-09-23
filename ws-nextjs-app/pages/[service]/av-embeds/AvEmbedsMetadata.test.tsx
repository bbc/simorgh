import React from 'react';
import {
  render,
  waitFor,
} from '../../../../src/app/components/react-testing-library-with-providers';
import serbianCyrCps from '../../../../data/serbian/av-embeds/cyr/srbija-68707945.json';
import AvEmbedsMetadata from './AvEmbedsMetadata';
import { AV_EMBEDS } from '../../../../src/app/routes/utils/pageTypes';
import { MediaBlock } from '../../../../src/app/components/MediaLoader/types';

const avEmbedsMetadataProps = {
  pageData: {
    mediaBlock: serbianCyrCps.data.avEmbed.content.model
      .blocks as unknown as MediaBlock[],
    metadata: {
      caption:
        serbianCyrCps.data.avEmbed.content.model.blocks[0].model.blocks[2].model
          .caption,
      headline: serbianCyrCps.data.avEmbed.promo.headlines.seoHeadline,
      imageUrl:
        serbianCyrCps.data.avEmbed.content.model.blocks[0].model.blocks[0].model
          .imageUrl,
      language: serbianCyrCps.data.avEmbed.metadata.language,
      promoSummary:
        serbianCyrCps.data.avEmbed.promo.summary.blocks[0].model.blocks[0].model
          .text,
      type: AV_EMBEDS,
    },
  },
};

describe('AV Embeds Page', () => {
  it('should render the viewport meta tag', async () => {
    render(<AvEmbedsMetadata {...avEmbedsMetadataProps} />);

    await waitFor(() => {
      const actual = document
        .querySelector('head > meta[name="viewport"]')
        ?.getAttribute('content');

      expect(actual).toEqual(
        'width=device-width, initial-scale=1, user-scalable=1',
      );
    });
  });

  it('should render the charset meta tag', async () => {
    render(<AvEmbedsMetadata {...avEmbedsMetadataProps} />);

    await waitFor(() => {
      const actual = document
        .querySelector('head > meta[charset]')
        ?.getAttribute('charset');

      expect(actual).toEqual('utf-8');
    });
  });

  it('should render the http-equiv meta tag', async () => {
    render(<AvEmbedsMetadata {...avEmbedsMetadataProps} />);

    await waitFor(() => {
      const actual = document
        .querySelector('head > meta[http-equiv="X-UA-Compatible"]')
        ?.getAttribute('content');

      expect(actual).toEqual('IE=edge,chrome=1');
    });
  });

  it('should render the description meta tag', async () => {
    render(<AvEmbedsMetadata {...avEmbedsMetadataProps} />);

    await waitFor(() => {
      const actual = document
        .querySelector('head > meta[name="description"]')
        ?.getAttribute('content');

      expect(actual).toEqual(
        'Услуга личног пратиоца у Србији доступна је деци са потешкоћама у развоју током школовања од 2015. године, али према последњим доступним подацима, трећина градова и општина нема довољно новца за ову врсту социјалне подршке.',
      );
    });
  });

  it('should render the iChef preconnect link tag', async () => {
    render(<AvEmbedsMetadata {...avEmbedsMetadataProps} />);

    await waitFor(() => {
      const actual = document
        .querySelector('head > link[rel="preconnect"]')
        ?.getAttribute('href');

      expect(actual).toEqual('//ichef.bbci.co.uk');
    });
  });

  it('should render the dns-prefetch link tags for the target domains', async () => {
    render(<AvEmbedsMetadata {...avEmbedsMetadataProps} />);

    const expected = [
      '//static.bbci.co.uk',
      '//static.bbc.co.uk',
      '//nav.files.bbci.co.uk',
    ];

    await waitFor(() => {
      const actual = Array.from(
        document.querySelectorAll('head > link[rel="dns-prefetch"]'),
      ).map(tag => tag.getAttribute('href'));

      expect(actual).toEqual(expected);
    });
  });

  it('should render the OG meta tags', async () => {
    render(<AvEmbedsMetadata {...avEmbedsMetadataProps} />);

    const expected = [
      {
        content:
          'Здравље: Лични пратиоци деце са потешкоћама у развоју, „као члан породице"',
        property: 'og:title',
      },
      { content: 'video', property: 'og:type' },
      {
        content:
          'Услуга личног пратиоца у Србији доступна је деци са потешкоћама у развоју током школовања од 2015. године, али према последњим доступним подацима, трећина градова и општина нема довољно новца за ову врсту социјалне подршке.',
        property: 'og:description',
      },
      { content: 'BBC News', property: 'og:site_name' },
      { content: 'sr-Cyrl', property: 'og:locale' },
      {
        content: 'ichef.bbci.co.uk/images/ic/$recipe/p0cfmfsv.jpg',
        property: 'og:image',
      },
      {
        content:
          'Србија и особе са инвалидитетом: Како је Стефан слухом заслужио дипломе и освојио медаље',
        property: 'og:image:alt',
      },
    ];

    await waitFor(() => {
      const actual = Array.from(
        document.querySelectorAll('head > meta[property^="og:"]'),
      ).map(tag => ({
        property: tag.getAttribute('property'),
        content: tag.getAttribute('content'),
      }));

      expect(actual).toEqual(expected);
    });
  });

  it('should render the article:author meta tag', async () => {
    render(<AvEmbedsMetadata {...avEmbedsMetadataProps} />);

    await waitFor(() => {
      const actual = document
        .querySelector('head > meta[property="article:author"]')
        ?.getAttribute('content');

      expect(actual).toEqual('https://www.facebook.com/bbcnews');
    });
  });

  it('should render the twitter meta tags', async () => {
    render(<AvEmbedsMetadata {...avEmbedsMetadataProps} />);

    const expected = [
      { content: 'summary_large_image', name: 'twitter:card' },
      { content: '@bbcnews', name: 'twitter:site' },
      {
        content:
          'Здравље: Лични пратиоци деце са потешкоћама у развоју, „као члан породице"',
        name: 'twitter:title',
      },
      {
        content:
          'Услуга личног пратиоца у Србији доступна је деци са потешкоћама у развоју током школовања од 2015. године, али према последњим доступним подацима, трећина градова и општина нема довољно новца за ову врсту социјалне подршке.',
        name: 'twitter:description',
      },
      { content: '@bbcnews', name: 'twitter:creator' },
      {
        content: 'ichef.bbci.co.uk/images/ic/$recipe/p0cfmfsv.jpg',
        name: 'twitter:image:src',
      },
      {
        content:
          'Србија и особе са инвалидитетом: Како је Стефан слухом заслужио дипломе и освојио медаље',
        name: 'twitter:image:alt',
      },
      { content: 'www.bbc.com', name: 'twitter:domain' },
    ];

    await waitFor(() => {
      const actual = Array.from(
        document.querySelectorAll('head > meta[name^="twitter"]'),
      ).map(tag => ({
        name: tag.getAttribute('name'),
        content: tag.getAttribute('content'),
      }));

      expect(actual).toEqual(expected);
    });
  });

  it('should render the apple-mobile-web-app-title meta tag', async () => {
    render(<AvEmbedsMetadata {...avEmbedsMetadataProps} />);

    await waitFor(() => {
      const actual = document
        .querySelector('head > meta[name="apple-mobile-web-app-title"]')
        ?.getAttribute('content');

      expect(actual).toEqual('BBC News');
    });
  });

  it('should render the application-name meta tag', async () => {
    render(<AvEmbedsMetadata {...avEmbedsMetadataProps} />);

    await waitFor(() => {
      const actual = document
        .querySelector('head > meta[name="application-name"]')
        ?.getAttribute('content');

      expect(actual).toEqual('BBC News');
    });
  });

  it('should render the msapplication-TileImage meta tag', async () => {
    render(<AvEmbedsMetadata {...avEmbedsMetadataProps} />);

    await waitFor(() => {
      const actual = document
        .querySelector('head > meta[name="msapplication-TileImage"]')
        ?.getAttribute('content');

      expect(actual).toEqual('BBC News');
    });
  });

  it('should render the msapplication-TileColor meta tag', async () => {
    render(<AvEmbedsMetadata {...avEmbedsMetadataProps} />);

    await waitFor(() => {
      const actual = document
        .querySelector('head > meta[name="msapplication-TileColor"]')
        ?.getAttribute('content');

      expect(actual).toEqual('#bb1919');
    });
  });

  it('should render the mobile-web-app-capable meta tag', async () => {
    render(<AvEmbedsMetadata {...avEmbedsMetadataProps} />);

    await waitFor(() => {
      const actual = document
        .querySelector('head > meta[name="mobile-web-app-capable"]')
        ?.getAttribute('content');

      expect(actual).toEqual('yes');
    });
  });

  describe('missing metadata', () => {
    it('should not render the og:image meta tag', async () => {
      const pageDataWithMissingPromo = { ...avEmbedsMetadataProps };

      delete pageDataWithMissingPromo.pageData.metadata.imageUrl;

      render(<AvEmbedsMetadata {...pageDataWithMissingPromo} />);

      await waitFor(() => {
        const actual = document.querySelector(
          'head > meta[property="og:image"]',
        );

        expect(actual).toBeNull();
      });
    });
  });
});
