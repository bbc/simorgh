import {
  getHeadline,
  getFirstPublished,
  getLastPublished,
  getAboutTags,
  getArticleSection,
  getMentions,
  getLang,
  buildLinkedData,
} from './utils';
import { articleDataNews } from '../Article/fixtureData';

describe('ArticleMain utils', () => {
  it('getHeadline › it should return the correct value', () => {
    const actual = getHeadline(articleDataNews);
    const expected = 'Article Headline for SEO';

    expect(actual).toEqual(expected);
  });

  it('getFirstPublished › it should return the correct value', () => {
    const actual = getFirstPublished(articleDataNews);
    const expected = '2018-01-01T12:01:00.000Z';

    expect(actual).toEqual(expected);
  });

  it('getLastPublished › it should return the correct value', () => {
    const actual = getLastPublished(articleDataNews);
    const expected = '2018-01-01T13:00:00.000Z';

    expect(actual).toEqual(expected);
  });

  it('getAboutTags › it should return the correct value', () => {
    const actual = getAboutTags(articleDataNews);
    const expected = [
      {
        curationType: ['vivo-stream'],
        thingId: '2351f2b2-ce36-4f44-996d-c3c4f7f90eaa',
        thingLabel: 'Royal Wedding 2018',
        thingSameAs: [
          'http://dbpedia.org/resource/Queen_Victoria',
          'http://rdf.freebase.com/ns/m.0cw10',
        ],
        thingType: ['Thing', 'Event'],
        thingUri:
          'http://www.bbc.co.uk/things/2351f2b2-ce36-4f44-996d-c3c4f7f90eaa#id',
        topicId: 'cpwpy79d6dxt',
        topicName: 'Royal Wedding 2018',
      },
      {
        curationType: ['vivo-stream'],
        thingId: '803eaeb9-c0c3-4f1b-9a66-90efac3df2dc',
        thingLabel: 'Duchess of Sussex',
        thingSameAs: [],
        thingType: ['Person'],
        thingUri:
          'http://www.bbc.co.uk/things/803eaeb9-c0c3-4f1b-9a66-90efac3df2dc#id',
        topicId: 'cg3mq45zq4xt',
        topicName: 'Duchess of Sussex',
      },
    ];

    expect(actual).toEqual(expected);
  });

  it('getArticleSection › it should return the correct value', () => {
    const actual = getArticleSection(articleDataNews);
    const expected = null; // TODO

    expect(actual).toEqual(expected);
  });

  it('getMentions › it should return the correct value', () => {
    const actual = getMentions(articleDataNews);
    const expected = [
      {
        thingId: '1efbf3e5-b330-49a1-b531-b507ab027c96',
        thingLabel: 'Queen Victoria',
        thingType: ['Person', 'Thing'],
        thingUri:
          'http://www.bbc.co.uk/things/1efbf3e5-b330-49a1-b531-b507ab027c96#id',
      },
    ];

    expect(actual).toEqual(expected);
  });

  it('getLang › it should return the correct value', () => {
    const actual = getLang(articleDataNews);
    const expected = 'en-gb';

    expect(actual).toEqual(expected);
  });

  it('buildLinkedData › it should return the correct value', () => {
    const actual = buildLinkedData({
      headline: 'Article Headline for SEO',
      firstPublished: '2018-01-01T12:01:00.000Z',
      lastPublished: '2018-01-01T13:00:00.000Z',
      about: [
        {
          '@type': 'Thing',
          name: 'Royal Wedding 2018',
          sameAs: ['http://dbpedia.org/resource/Queen_Victoria'],
        },
        { '@type': 'Person', name: 'Duchess of Sussex' },
      ],
      brandName: 'BBC News',
      noBylinesPolicy: 'https://www.bbc.com/news/help-41670342#authorexpertise',
      defaultImage:
        'https://www.bbc.co.uk/news/special/2015/newsspec_10857/bbc_news_logo.png',
    });
    const expected = {
      about: [
        {
          '@type': 'Thing',
          name: 'Royal Wedding 2018',
          sameAs: ['http://dbpedia.org/resource/Queen_Victoria'],
        },
        { '@type': 'Person', name: 'Duchess of Sussex' },
      ],
      author: {
        '@type': 'NewsMediaOrganization',
        logo: {
          '@type': 'ImageObject',
          height: 576,
          url:
            'https://www.bbc.co.uk/news/special/2015/newsspec_10857/bbc_news_logo.png',
          width: 1024,
        },
        name: 'BBC News',
        noBylinesPolicy:
          'https://www.bbc.com/news/help-41670342#authorexpertise',
      },
      dateModified: '2018-01-01T13:00:00.000Z',
      datePublished: '2018-01-01T12:01:00.000Z',
      headline: 'Article Headline for SEO',
    };

    expect(actual).toEqual(expected);
  });
});
