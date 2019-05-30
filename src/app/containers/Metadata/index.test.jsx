import React from 'react';
import { mount } from 'enzyme';
import MetadataContainer from './index';
import LinkedData from '../../components/LinkedData';
import Metadata from '../../components/Metadata';
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import { articleDataNews, articleDataPersian } from '../Article/fixtureData';
import services from '../../lib/config/services/index';
import { RequestContextProvider } from '../../contexts/RequestContext';

const Container = (service, bbcOrigin, platform, data, id) => {
  const serviceConfig = services[service];
  return (
    <ServiceContextProvider {...serviceConfig}>
      <RequestContextProvider
        platform={platform}
        id={id}
        isUK
        origin={bbcOrigin}
        statsDestination="NEWS_PS_TEST"
        statsPageIdentifier={`${service}.articles.${id}.page`}
      >
        <MetadataContainer {...data} />
      </RequestContextProvider>
    </ServiceContextProvider>
  );
};

const metadataProps = (
  isAmp,
  alternateLinks,
  ampLink,
  canonicalLink,
  description,
  lang,
  metaTags,
  title,
  serviceConfig,
) => ({
  isAmp,
  alternateLinks,
  ampLink,
  appleTouchIcon: `https://foo.com/static/${
    serviceConfig.service
  }/images/icons/icon-192x192.png`,
  articleAuthor: serviceConfig.articleAuthor,
  articleSection: null,
  brandName: serviceConfig.brandName,
  canonicalLink,
  defaultImage: serviceConfig.defaultImage,
  defaultImageAltText: serviceConfig.defaultImageAltText,
  description,
  facebookAdmin: 100004154058350,
  facebookAppID: 1609039196070050,
  lang,
  locale: serviceConfig.locale,
  metaTags,
  themeColor: serviceConfig.themeColor,
  timeFirstPublished: '2018-01-01T12:01:00.000Z',
  timeLastPublished: '2018-01-01T13:00:00.000Z',
  title,
  twitterCreator: serviceConfig.twitterCreator,
  twitterSite: serviceConfig.twitterSite,
  type: 'article',
});

const linkedDataProps = (
  brandName,
  canonicalLink,
  createdBy,
  logoUrl,
  seoHeadline,
  about = undefined,
) => ({
  brandName,
  canonicalLink,
  firstPublished: '2018-01-01T12:01:00.000Z',
  lastUpdated: '2018-01-01T13:00:00.000Z',
  logoUrl,
  noBylinesPolicy: 'https://www.bbc.com/news/help-41670342#authorexpertise',
  publishingPrinciples: 'https://www.bbc.com/news/help-41670342',
  seoHeadline,
  type: 'article',
  about,
});

const dotComOrigin = 'https://www.bbc.com';
const dotCoDotUKOrigin = 'https://www.bbc.co.uk';

process.env.SIMORGH_PUBLIC_STATIC_ASSETS_ORIGIN = 'https://foo.com';
process.env.SIMORGH_PUBLIC_STATIC_ASSETS_PATH = '/static';

describe('Metadata Container', () => {
  describe('LinkedData and Metadata components called with correct props', () => {
    it('should be correct for Canonical News & international origin', () => {
      const Wrapper = mount(
        Container(
          'news',
          dotComOrigin,
          'canonical',
          articleDataNews,
          'c0000000001o',
        ),
      );

      expect(Wrapper.containsMatchingElement(<MetadataContainer />)).toEqual(
        true,
      );
      expect(Wrapper.find(Metadata).props()).toEqual(
        metadataProps(
          false,
          [
            {
              href: 'https://www.bbc.com/news/articles/c0000000001o',
              hrefLang: 'x-default',
            },
            {
              href: 'https://www.bbc.com/news/articles/c0000000001o',
              hrefLang: 'en',
            },
            {
              href: 'https://www.bbc.co.uk/news/articles/c0000000001o',
              hrefLang: 'en-gb',
            },
          ],
          'https://www.bbc.com/news/articles/c0000000001o.amp',
          'https://www.bbc.com/news/articles/c0000000001o',
          'Article summary.',
          'en-gb',
          ['Royal Wedding 2018', 'Duchess of Sussex', 'Queen Victoria'],
          'Article Headline for SEO',
          services.news,
        ),
      );
      expect(Wrapper.find(LinkedData).props()).toEqual(
        linkedDataProps(
          'BBC News',
          'https://www.bbc.com/news/articles/c0000000001o',
          'News',
          'https://www.bbc.co.uk/news/special/2015/newsspec_10857/bbc_news_logo.png',
          'Article Headline for SEO',
          [
            {
              '@type': 'Thing',
              name: 'Royal Wedding 2018',
              sameAs: ['http://dbpedia.org/resource/Queen_Victoria'],
            },
            {
              '@type': 'Person',
              name: 'Duchess of Sussex',
            },
          ],
        ),
      );
    });

    it('should be correct for AMP News & UK origin', () => {
      const Wrapper = mount(
        Container(
          'news',
          dotCoDotUKOrigin,
          'amp',
          articleDataNews,
          'c0000000001o',
        ),
      );

      expect(Wrapper.containsMatchingElement(<MetadataContainer />)).toEqual(
        true,
      );
      expect(Wrapper.find(Metadata).props()).toEqual(
        metadataProps(
          true,
          [
            {
              href: 'https://www.bbc.com/news/articles/c0000000001o.amp',
              hrefLang: 'x-default',
            },
            {
              href: 'https://www.bbc.com/news/articles/c0000000001o.amp',
              hrefLang: 'en',
            },
            {
              href: 'https://www.bbc.co.uk/news/articles/c0000000001o.amp',
              hrefLang: 'en-gb',
            },
          ],
          'https://www.bbc.co.uk/news/articles/c0000000001o.amp',
          'https://www.bbc.co.uk/news/articles/c0000000001o',
          'Article summary.',
          'en-gb',
          ['Royal Wedding 2018', 'Duchess of Sussex', 'Queen Victoria'],
          'Article Headline for SEO',
          services.news,
        ),
      );
      expect(Wrapper.find(LinkedData).props()).toEqual(
        linkedDataProps(
          'BBC News',
          'https://www.bbc.co.uk/news/articles/c0000000001o',
          'News',
          'https://www.bbc.co.uk/news/special/2015/newsspec_10857/bbc_news_logo.png',
          'Article Headline for SEO',
          [
            {
              '@type': 'Thing',
              name: 'Royal Wedding 2018',
              sameAs: ['http://dbpedia.org/resource/Queen_Victoria'],
            },
            {
              '@type': 'Person',
              name: 'Duchess of Sussex',
            },
          ],
        ),
      );
    });

    it('should be correct for Persian News & international origin', () => {
      const Wrapper = mount(
        Container(
          'persian',
          dotComOrigin,
          'canonical',
          articleDataPersian,
          'c4vlle3q337o',
        ),
      );

      expect(Wrapper.containsMatchingElement(<MetadataContainer />)).toEqual(
        true,
      );
      expect(Wrapper.find(Metadata).props()).toEqual(
        metadataProps(
          false,
          [],
          'https://www.bbc.com/persian/articles/c4vlle3q337o.amp',
          'https://www.bbc.com/persian/articles/c4vlle3q337o',
          'خلاصه مقاله',
          'fa',
          [],
          'سرصفحه مقاله',
          services.persian,
        ),
      );
      expect(Wrapper.find(LinkedData).props()).toEqual(
        linkedDataProps(
          'BBC News فارسی',
          'https://www.bbc.com/persian/articles/c4vlle3q337o',
          'Persian',
          'https://news.files.bbci.co.uk/ws/img/logos/og/persian.png',
          'سرصفحه مقاله',
        ),
      );
    });

    it('should be correct for Persian News & UK origin', () => {
      const Wrapper = mount(
        Container(
          'persian',
          dotCoDotUKOrigin,
          'amp',
          articleDataPersian,
          'c4vlle3q337o',
        ),
      );

      expect(Wrapper.containsMatchingElement(<MetadataContainer />)).toEqual(
        true,
      );
      expect(Wrapper.find(Metadata).props()).toEqual(
        metadataProps(
          true,
          [],
          'https://www.bbc.co.uk/persian/articles/c4vlle3q337o.amp',
          'https://www.bbc.co.uk/persian/articles/c4vlle3q337o',
          'خلاصه مقاله',
          'fa',
          [],
          'سرصفحه مقاله',
          services.persian,
        ),
      );
      expect(Wrapper.find(LinkedData).props()).toEqual(
        linkedDataProps(
          'BBC News فارسی',
          'https://www.bbc.co.uk/persian/articles/c4vlle3q337o',
          'Persian',
          'https://news.files.bbci.co.uk/ws/img/logos/og/persian.png',
          'سرصفحه مقاله',
        ),
      );
    });
  });
});
