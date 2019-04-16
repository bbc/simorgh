import React from 'react';
import { mount } from 'enzyme';
import MetadataContainer from './index';
import LinkedData from '../../components/LinkedData';
import Metadata from '../../components/Metadata';
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import { articleDataNews, articleDataPersian } from '../Article/fixtureData';
import services from '../../lib/config/services/index';
import { RequestContextProvider } from '../../contexts/RequestContext';

const Container = (service, bbcOrigin, platform, data) => {
  const serviceConfig = services[service];
  return (
    <ServiceContextProvider {...serviceConfig}>
      <RequestContextProvider bbcOrigin={bbcOrigin} platform={platform}>
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
  canonicalLink,
  createdBy,
  logoUrl,
  optimoId,
  seoHeadline,
) => ({
  canonicalLink,
  firstPublished: '2018-01-01T12:01:00.000Z',
  lastUpdated: '2018-01-01T13:00:00.000Z',
  logoUrl,
  noBylinesPolicy: 'https://www.bbc.com/news/help-41670342#authorexpertise',
  optimoId,
  publishingPrinciples: 'https://www.bbc.com/news/help-41670342',
  seoHeadline,
  service: createdBy,
  type: 'article',
});

const dotComOrigin = 'https://www.bbc.com';
const dotCoDotUKOrigin = 'https://www.bbc.co.uk';

process.env.SIMORGH_PUBLIC_STATIC_ASSETS_ORIGIN = 'https://foo.com';
process.env.SIMORGH_PUBLIC_STATIC_ASSETS_PATH = '/static';

describe('Metadata Container', () => {
  describe('LinkedData and Metadata components called with correct props', () => {
    it('should be correct for Canonical News & international origin', () => {
      const Wrapper = mount(
        Container('news', dotComOrigin, 'canonical', articleDataNews),
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
          ['Royal Wedding 2018', 'Queen Victoria'],
          'Article Headline for SEO',
          services.news,
        ),
      );
      expect(Wrapper.find(LinkedData).props()).toEqual(
        linkedDataProps(
          'https://www.bbc.com/news/articles/c0000000001o',
          'News',
          'https://www.bbc.co.uk/news/special/2015/newsspec_10857/bbc_news_logo.png',
          'c0000000001o',
          'Article Headline for SEO',
        ),
      );
    });

    it('should be correct for AMP News & UK origin', () => {
      const Wrapper = mount(
        Container('news', dotCoDotUKOrigin, 'amp', articleDataNews),
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
          ['Royal Wedding 2018', 'Queen Victoria'],
          'Article Headline for SEO',
          services.news,
        ),
      );
      expect(Wrapper.find(LinkedData).props()).toEqual(
        linkedDataProps(
          'https://www.bbc.co.uk/news/articles/c0000000001o',
          'News',
          'https://www.bbc.co.uk/news/special/2015/newsspec_10857/bbc_news_logo.png',
          'c0000000001o',
          'Article Headline for SEO',
        ),
      );
    });

    it('should be correct for Persian News & international origin', () => {
      const Wrapper = mount(
        Container('persian', dotComOrigin, 'canonical', articleDataPersian),
      );

      expect(Wrapper.containsMatchingElement(<MetadataContainer />)).toEqual(
        true,
      );
      expect(Wrapper.find(Metadata).props()).toEqual(
        metadataProps(
          false,
          [],
          'https://www.bbc.com/persian/articles/cyddjz5058wo.amp',
          'https://www.bbc.com/persian/articles/cyddjz5058wo',
          'خلاصه مقاله',
          'fa',
          [],
          'سرصفحه مقاله',
          services.persian,
        ),
      );
      expect(Wrapper.find(LinkedData).props()).toEqual(
        linkedDataProps(
          'https://www.bbc.com/persian/articles/cyddjz5058wo',
          'Persian',
          'https://news.files.bbci.co.uk/ws/img/logos/og/persian.png',
          'cyddjz5058wo',
          'سرصفحه مقاله',
        ),
      );
    });

    it('should be correct for Persian News & UK origin', () => {
      const Wrapper = mount(
        Container('persian', dotCoDotUKOrigin, 'amp', articleDataPersian),
      );

      expect(Wrapper.containsMatchingElement(<MetadataContainer />)).toEqual(
        true,
      );
      expect(Wrapper.find(Metadata).props()).toEqual(
        metadataProps(
          true,
          [],
          'https://www.bbc.co.uk/persian/articles/cyddjz5058wo.amp',
          'https://www.bbc.co.uk/persian/articles/cyddjz5058wo',
          'خلاصه مقاله',
          'fa',
          [],
          'سرصفحه مقاله',
          services.persian,
        ),
      );
      expect(Wrapper.find(LinkedData).props()).toEqual(
        linkedDataProps(
          'https://www.bbc.co.uk/persian/articles/cyddjz5058wo',
          'Persian',
          'https://news.files.bbci.co.uk/ws/img/logos/og/persian.png',
          'cyddjz5058wo',
          'سرصفحه مقاله',
        ),
      );
    });
  });
});
