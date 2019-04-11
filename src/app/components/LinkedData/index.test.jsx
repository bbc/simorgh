import React from 'react';
import { shouldShallowMatchSnapshot } from '../../helpers/tests/testHelpers';
import LinkData from '.';

describe('LinkData', () => {
  const props = {
    isAmp: false,
    lang: 'en-GB',
    seoHeadline: 'Royal wedding 2018: Bouquet laid on tomb of unknown warrior',
    type: 'article',
    optimoId: 'c9rpqy7pmypo',
    service: 'news',
    lastUpdated: '2019-02-26T11:25:10.555Z',
    firstPublished: '2018-10-10T16:19:31.344Z',
    noBylinesPolicy: 'https://www.bbc.com/news/help-41670342#authorexpertise',
    publishingPrinciples: 'https://www.bbc.com/news/help-41670342',
    logoUrl:
      'https://www.bbc.com/news/special/2015/newsspec_10857/bbc_news_logo.png',
    about: [
      {
        '@type': 'Person',
        name: 'Duchess of Sussex',
        alternateName: 'Meghan Markle',
        sameAs: 'http://dbpedia.org/resource/Meghan_Markle',
      },
    ],
  };

  const propsWithNoAbout = {
    isAmp: false,
    lang: 'en-GB',
    seoHeadline: 'Royal wedding 2018: Bouquet laid on tomb of unknown warrior',
    type: 'article',
    optimoId: 'c9rpqy7pmypo',
    service: 'news',
    lastUpdated: '2019-02-26T11:25:10.555Z',
    firstPublished: '2018-10-10T16:19:31.344Z',
    noBylinesPolicy: 'https://www.bbc.com/news/help-41670342#authorexpertise',
    publishingPrinciples: 'https://www.bbc.com/news/help-41670342',
    logoUrl:
      'https://www.bbc.com/news/special/2015/newsspec_10857/bbc_news_logo.png',
  };

  shouldShallowMatchSnapshot(
    'should correctly render metadata for links',
    <LinkData {...props} />,
  );

  shouldShallowMatchSnapshot(
    'should correctly render metadata with no about tags for links',
    <LinkData {...propsWithNoAbout} />,
  );
});
