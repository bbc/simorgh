import React, { ReactNode } from 'react';
import Helmet from 'react-helmet';
import assocPath from 'ramda/src/assocPath';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ARTICLE_PAGE } from '#app/routes/utils/pageTypes';
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import { render } from '../react-testing-library-with-providers';
import { Services } from '../../models/types/global';
import LinkedData from '.';

interface LinkedDataWithContext {
  children: ReactNode;
  service?: Services;
}

const getLinkedDataOutput = () => {
  const [output] = Helmet.peek().scriptTags.map(({ innerHTML }) =>
    JSON.parse(innerHTML),
  );

  return output;
};

const Context = ({ children, service }: LinkedDataWithContext) => (
  <ServiceContextProvider service={service || 'news'}>
    <RequestContextProvider
      bbcOrigin="https://www.test.bbc.com"
      id="c0000000000o"
      isAmp={false}
      isApp={false}
      pageType={ARTICLE_PAGE}
      pathname="/pathname"
      service="news"
      statusCode={200}
    >
      {children}
    </RequestContextProvider>
  </ServiceContextProvider>
);

describe('LinkedData', () => {
  const propsForArticle = {
    showAuthor: true,
    type: 'Article',
    seoTitle: 'Royal wedding 2018: Bouquet laid on tomb of unknown warrior',
    headline: 'Article Headline for SEO',
    datePublished: '2018-01-01T12:01:00.000Z',
    dateModified: '2018-01-01T13:00:00.000Z',
    about: [
      {
        '@type': 'Thing',
        name: 'Royal Wedding 2018',
        sameAs: ['http://dbpedia.org/resource/Queen_Victoria'],
      },
      { '@type': 'Person', name: 'Duchess of Sussex' },
    ],
    bylineLinkedData: undefined,
  };

  const propsForRadio = {
    type: 'RadioChannel',
    seoTitle: 'BBC News Radio',
  };

  const propsForHomepage = {
    type: 'WebPage',
    seoTitle: 'Home - BBC News',
  };

  const propsForPGL = {
    showAuthor: true,
    type: 'Article',
    seoTitle: 'PGL Headline for SEO',
    headline: 'PGL Headline for Magnificent Gallery',
    datePublished: '2018-01-01T12:01:00.000Z',
    dateModified: '2018-01-01T13:00:00.000Z',
    description: 'Some photos in a gallery',
    about: [
      {
        '@type': 'Thing',
        name: 'Tag 1',
        sameAs: ['http://dbpedia.org/resource/Queen_Victoria'],
      },
      { '@type': 'Person', name: 'A Person' },
    ],
  };

  const propsForOndemandRadio = {
    seoTitle: 'Ondemand Radio Headline',
    type: 'WebPage',
    entities: [
      {
        '@type': 'AudioObject',
        name: 'ماښامنۍ خپرونه',
        description: 'د بي بي سي ورلډ سروس څخه پروګرام کول',
        duration: 'PT29M30S',
        embedURL:
          'https://test.bbc.com/ws/av-embeds/media/korean/externalId/id/ko',
        thumbnailUrl:
          'https://ichef.bbci.co.uk/images/ic/1024x576/p063j1dv.jpg',
        uploadDate: '2020-04-23T15:30:00.000Z',
      },
    ],
  };

  it('should correctly render linked data for Ondemand Radio page', () => {
    render(
      <Context>
        <LinkedData {...propsForOndemandRadio} />
      </Context>,
    );

    expect(getLinkedDataOutput()).toMatchSnapshot();
  });

  it('should correctly render linked data for Photo Gallery page', () => {
    render(
      <Context>
        <LinkedData {...propsForPGL} />
      </Context>,
    );

    expect(getLinkedDataOutput()).toMatchSnapshot();
  });

  it('should correctly render linked data for articles', () => {
    render(
      <Context>
        <LinkedData {...propsForArticle} />
      </Context>,
    );

    expect(getLinkedDataOutput()).toMatchSnapshot();
  });

  it('should correctly render linked data for articles with byline', () => {
    render(
      <Context>
        <LinkedData {...propsForArticle} />
      </Context>,
    );

    expect(getLinkedDataOutput()).toMatchSnapshot();
  });

  it('should correctly render linked data for radio pages', () => {
    render(
      <Context>
        <LinkedData {...propsForRadio} />
      </Context>,
    );

    expect(getLinkedDataOutput()).toMatchSnapshot();
  });

  it('should correctly render linked data for home pages', () => {
    render(
      <Context>
        <LinkedData {...propsForHomepage} />
      </Context>,
    );

    expect(getLinkedDataOutput()).toMatchSnapshot();
  });

  it('should correctly render linked data for article pages for service with no trust project markup', () => {
    render(
      <Context service="scotland">
        <LinkedData {...propsForArticle} />
      </Context>,
    );

    expect(getLinkedDataOutput()).toMatchSnapshot();
  });

  it('should correctly render publisherLogo for news', () => {
    render(
      <Context>
        <LinkedData {...propsForArticle} />
      </Context>,
    );

    expect(getLinkedDataOutput()).toMatchSnapshot();
  });

  it('should correctly render publisherLogo for sport', () => {
    render(
      <Context service="sport">
        <LinkedData {...propsForArticle} />
      </Context>,
    );

    expect(getLinkedDataOutput()).toMatchSnapshot();
  });

  it('should correctly render publisherLogo for non-news services', () => {
    render(
      <Context service="mundo">
        <LinkedData {...propsForArticle} />
      </Context>,
    );

    expect(getLinkedDataOutput()).toMatchSnapshot();
  });

  describe('showAuthor', () => {
    const articleProps = assocPath(['showAuthor'], false, propsForArticle);

    it('should exclude author from article when false', () => {
      render(
        <Context>
          <LinkedData {...articleProps} />
        </Context>,
      );

      expect(getLinkedDataOutput()).toMatchSnapshot();
    });
  });

  describe('bylineLinkedData', () => {
    const bylineLinkedData = {
      authorName: 'John',
      jobRole: 'Journalist',
      twitterText: 'BBC News',
      twitterLink: 'https://twitter.com/BBCNews',
      authorImage: 'https://ichef.bbci.co.uk/images/ic/1024x576/p063j1dv.jpg',
      location: 'London',
      authorTopicUrl: 'https://www.bbc.co.uk/news/topics/cg2gmrxlde0t',
    };

    const articleProps = assocPath(
      ['bylineLinkedData'],
      bylineLinkedData,
      propsForArticle,
    );

    it('should change author contents and locationCreated when byline is present', () => {
      render(
        <Context>
          <LinkedData {...articleProps} />
        </Context>,
      );

      expect(getLinkedDataOutput()).toMatchSnapshot();
    });
  });
});
