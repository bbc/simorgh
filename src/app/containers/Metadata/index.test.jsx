import React from 'react';
import { mount } from 'enzyme';
import MetadataContainer from './index';
import LinkedData from '../../components/LinkedData';
import Metadata from '../../components/Metadata';
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import { articleDataNews, articleDataPersian } from '../Article/fixtureData';
import services from '../../lib/config/services/index';
import { RequestContextProvider } from '../../contexts/RequestContext';

const Container = (service, origin, platform, data) => {
  const serviceConfig = services[service];
  return (
    <ServiceContextProvider {...serviceConfig}>
      <RequestContextProvider origin={origin} platform={platform}>
        <MetadataContainer {...data} />
      </RequestContextProvider>
    </ServiceContextProvider>
  );
};

const metadataProps = (
  isAmp,
  ampLink,
  canonicalLink,
  description,
  lang,
  metaTags,
  title,
  serviceConfig,
) => ({
  isAmp,
  ampLink,
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

const linkedDataProps = () => ({
  firstPublished: '2018-10-10T16:20:25.274Z',
  lastUpdated: '2018-10-10T16:20:25.274Z',
  logoUrl:
    'https://www.bbc.co.uk/news/special/2015/newsspec_10857/bbc_news_logo.png',
  noBylinesPolicy: 'https://www.bbc.com/news/help-41670342#authorexpertise',
  optimoId: 'cn7769kpk9mo',
  publishingPrinciples: 'https://www.bbc.com/news/help-41670342',
  seoHeadline: 'Royal wedding flowers given to Hackney hospice',
  service: 'News',
  type: 'article',
});

const dotComOrigin = 'https://www.bbc.com';
const dotCoDotUKOrigin = 'https://www.bbc.co.uk';

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
          'https://www.bbc.com/news/articles/c0000000001o.amp',
          'https://www.bbc.com/news/articles/c0000000001o',
          'Article summary.',
          'en-gb',
          ['Royal Wedding 2018', 'Queen Victoria'],
          'Article Headline for SEO',
          services.news,
        ),
      );
      expect(Wrapper.find(LinkedData).props()).toEqual(linkedDataProps);
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
          'https://www.bbc.co.uk/news/articles/c0000000001o.amp',
          'https://www.bbc.co.uk/news/articles/c0000000001o',
          'Article summary.',
          'en-gb',
          ['Royal Wedding 2018', 'Queen Victoria'],
          'Article Headline for SEO',
          services.news,
        ),
      );
      expect(Wrapper.find(LinkedData).props()).toEqual(linkedDataProps);
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
          'https://www.bbc.com/persian/articles/cyddjz5058wo.amp',
          'https://www.bbc.com/persian/articles/cyddjz5058wo',
          'خلاصه مقاله',
          'fa',
          [],
          'سرصفحه مقاله',
          services.persian,
        ),
      );
      expect(Wrapper.find(LinkedData).props()).toEqual(linkedDataProps);
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
          'https://www.bbc.co.uk/persian/articles/cyddjz5058wo.amp',
          'https://www.bbc.co.uk/persian/articles/cyddjz5058wo',
          'خلاصه مقاله',
          'fa',
          [],
          'سرصفحه مقاله',
          services.persian,
        ),
      );
      expect(Wrapper.find(LinkedData).props()).toEqual(linkedDataProps);
    });
  });
});
