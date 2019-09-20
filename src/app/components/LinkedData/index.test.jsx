import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import LinkData from '.';

describe('LinkData', () => {
  const props = {
    isAmp: false,
    brandName: 'BBC News',
    canonicalLink: 'https://www.bbc.com/news/articles/c9rpqy7pmypo',
    lang: 'en-GB',
    seoHeadline: 'Royal wedding 2018: Bouquet laid on tomb of unknown warrior',
    type: 'Article',
    lastUpdated: '2019-02-26T11:25:10.555Z',
    firstPublished: '2018-10-10T16:19:31.344Z',
    noBylinesPolicy: 'https://www.bbc.com/news/help-41670342#authorexpertise',
    publishingPrinciples: 'https://www.bbc.com/news/help-41670342',
    logoUrl:
      'https://www.bbc.com/news/special/2015/newsspec_10857/bbc_news_logo.png',
  };

  const propsWithNoAbout = {
    isAmp: false,
    brandName: 'BBC News',
    canonicalLink: 'https://www.bbc.com/news/articles/c9rpqy7pmypo',
    lang: 'en-GB',
    seoHeadline: 'Royal wedding 2018: Bouquet laid on tomb of unknown warrior',
    type: 'Article',
    service: 'news',
    lastUpdated: '2019-02-26T11:25:10.555Z',
    firstPublished: '2018-10-10T16:19:31.344Z',
    noBylinesPolicy: 'https://www.bbc.com/news/help-41670342#authorexpertise',
    publishingPrinciples: 'https://www.bbc.com/news/help-41670342',
    logoUrl:
      'https://www.bbc.com/news/special/2015/newsspec_10857/bbc_news_logo.png',
  };

  const propsForFrontpage = {
    isAmp: false,
    brandName: 'BBC News',
    canonicalLink: 'https://www.bbc.com/igbo',
    lang: 'ig',
    seoHeadline: 'Ogbako',
    type: 'WebPage',
    service: 'igbo',
    lastUpdated: null,
    firstPublished: null,
    noBylinesPolicy: 'https://www.bbc.com/news/help-41670342#authorexpertise',
    publishingPrinciples: 'https://www.bbc.com/news/help-41670342',
    logoUrl: 'https://news.files.bbci.co.uk/ws/img/logos/og/igbo.png',
  };

  shouldMatchSnapshot(
    'should correctly render metadata for links',
    <LinkData {...props} />,
  );

  shouldMatchSnapshot(
    'should correctly include page specific metadata for links',
    <LinkData
      {...props}
      pageSpecific={{
        about: [
          {
            '@type': 'Person',
            alternateName: 'Meghan Markle',
            name: 'Duchess of Sussex',
            sameAs: ['http://dbpedia.org/resource/Meghan_Markle'],
          },
        ],
        author: {
          '@type': 'NewsMediaOrganization',
          logo: {
            '@type': 'ImageObject',
            height: 576,
            url:
              'https://www.bbc.com/news/special/2015/newsspec_10857/bbc_news_logo.png',
            width: 1024,
          },
          name: 'BBC News',
          noBylinesPolicy:
            'https://www.bbc.com/news/help-41670342#authorexpertise',
        },
        dateModified: '2019-02-26T11:25:10.555Z',
        datePublished: '2018-10-10T16:19:31.344Z',
        headline: 'Royal wedding 2018: Bouquet laid on tomb of unknown warrior',
      }}
    />,
  );

  shouldMatchSnapshot(
    'should correctly render metadata with no about tags for links',
    <LinkData {...propsWithNoAbout} />,
  );

  shouldMatchSnapshot(
    'should correctly render metadata for frontpages',
    <LinkData {...propsForFrontpage} />,
  );
});
