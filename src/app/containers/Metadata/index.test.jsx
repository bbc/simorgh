import React from 'react';
import { mount } from 'enzyme';
import MetadataContainer from './index';
import LinkedData from '../../components/LinkedData';
import Metadata from '../../components/Metadata';
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import { articleDataNews, articleDataPersian } from '../Article/fixtureData';
import services from '../../lib/config/services/index';
import { RequestContextProvider } from '../../contexts/RequestContext';
import frontPageData from '../../../../data/igbo/frontpage/index.json';
import liveRadioPageData from '../../../../data/korean/bbc_korean_radio/liveradio.json';

const Container = (service, bbcOrigin, platform, data, id, pageType) => {
  const serviceConfig = services[service];

  return (
    <ServiceContextProvider {...serviceConfig}>
      <RequestContextProvider
        bbcOrigin={bbcOrigin}
        id={id}
        isAmp={platform === 'amp'}
        pageType={pageType}
        service={service}
      >
        <MetadataContainer {...articleDataNews} {...data} />
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
  dir,
  lang,
  metaTags,
  timeFirstPublished,
  timeLastPublished,
  title,
  serviceConfig,
  type,
  service,
  showArticleTags,
) => ({
  isAmp,
  alternateLinks,
  ampLink,
  appleTouchIcon: `https://foo.com/static/${serviceConfig.service}/images/icons/icon-192x192.png`,
  articleAuthor: serviceConfig.articleAuthor || null,
  articleSection: null,
  brandName: serviceConfig.brandName,
  canonicalLink,
  defaultImage: serviceConfig.defaultImage,
  defaultImageAltText: serviceConfig.defaultImageAltText,
  description,
  dir,
  facebookAdmin: 100004154058350,
  facebookAppID: 1609039196070050,
  lang,
  locale: serviceConfig.locale,
  metaTags,
  themeColor: serviceConfig.themeColor,
  timeFirstPublished,
  timeLastPublished,
  title,
  twitterCreator: serviceConfig.twitterCreator,
  twitterSite: serviceConfig.twitterSite,
  type,
  service,
  showArticleTags,
  iconSizes: {
    'apple-touch-icon': [
      '72x72',
      '96x96',
      '128x128',
      '144x144',
      '152x152',
      '192x192',
      '384x384',
      '512x512',
    ],
    icon: ['72x72', '96x96', '192x192'],
  },
});

const linkedDataProps = (
  brandName,
  canonicalLink,
  firstPublished,
  lastUpdated,
  createdBy,
  logoUrl,
  seoHeadline,
  type,
  about = undefined,
) => ({
  brandName,
  canonicalLink,
  firstPublished,
  lastUpdated,
  logoUrl,
  noBylinesPolicy: 'https://www.bbc.com/news/help-41670342#authorexpertise',
  publishingPrinciples: 'https://www.bbc.com/news/help-41670342',
  seoHeadline,
  type,
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
          'article',
        ),
      );

      expect(
        Wrapper.containsMatchingElement(
          <MetadataContainer {...articleDataNews} />,
        ),
      ).toEqual(true);
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
          'ltr',
          'en-gb',
          ['Royal Wedding 2018', 'Duchess of Sussex', 'Queen Victoria'],
          '2018-01-01T12:01:00.000Z',
          '2018-01-01T13:00:00.000Z',
          'Article Headline for SEO',
          services.news,
          'article',
          'news',
          true,
        ),
      );
      expect(Wrapper.find(LinkedData).props()).toEqual(
        linkedDataProps(
          'BBC News',
          'https://www.bbc.com/news/articles/c0000000001o',
          '2018-01-01T12:01:00.000Z',
          '2018-01-01T13:00:00.000Z',
          'News',
          'https://www.bbc.co.uk/news/special/2015/newsspec_10857/bbc_news_logo.png',
          'Article Headline for SEO',
          'Article',
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
          'article',
        ),
      );

      expect(
        Wrapper.containsMatchingElement(
          <MetadataContainer {...articleDataNews} />,
        ),
      ).toEqual(true);
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
          'https://www.bbc.com/news/articles/c0000000001o',
          'Article summary.',
          'ltr',
          'en-gb',
          ['Royal Wedding 2018', 'Duchess of Sussex', 'Queen Victoria'],
          '2018-01-01T12:01:00.000Z',
          '2018-01-01T13:00:00.000Z',
          'Article Headline for SEO',
          services.news,
          'article',
          'news',
          true,
        ),
      );
      expect(Wrapper.find(LinkedData).props()).toEqual(
        linkedDataProps(
          'BBC News',
          'https://www.bbc.com/news/articles/c0000000001o',
          '2018-01-01T12:01:00.000Z',
          '2018-01-01T13:00:00.000Z',
          'News',
          'https://www.bbc.co.uk/news/special/2015/newsspec_10857/bbc_news_logo.png',
          'Article Headline for SEO',
          'Article',
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
          'article',
        ),
      );

      expect(
        Wrapper.containsMatchingElement(
          <MetadataContainer {...articleDataPersian} />,
        ),
      ).toEqual(true);
      expect(Wrapper.find(Metadata).props()).toEqual(
        metadataProps(
          false,
          [],
          'https://www.bbc.com/persian/articles/c4vlle3q337o.amp',
          'https://www.bbc.com/persian/articles/c4vlle3q337o',
          'خلاصه مقاله',
          'rtl',
          'fa',
          [],
          '2018-01-01T12:01:00.000Z',
          '2018-01-01T13:00:00.000Z',
          'سرصفحه مقاله',
          services.persian,
          'article',
          'persian',
          true,
        ),
      );
      expect(Wrapper.find(LinkedData).props()).toEqual(
        linkedDataProps(
          'BBC News فارسی',
          'https://www.bbc.com/persian/articles/c4vlle3q337o',
          '2018-01-01T12:01:00.000Z',
          '2018-01-01T13:00:00.000Z',
          'Persian',
          'https://news.files.bbci.co.uk/ws/img/logos/og/persian.png',
          'سرصفحه مقاله',
          'Article',
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
          'article',
        ),
      );

      expect(
        Wrapper.containsMatchingElement(
          <MetadataContainer {...articleDataPersian} />,
        ),
      ).toEqual(true);
      expect(Wrapper.find(Metadata).props()).toEqual(
        metadataProps(
          true,
          [],
          'https://www.bbc.co.uk/persian/articles/c4vlle3q337o.amp',
          'https://www.bbc.com/persian/articles/c4vlle3q337o',
          'خلاصه مقاله',
          'rtl',
          'fa',
          [],
          '2018-01-01T12:01:00.000Z',
          '2018-01-01T13:00:00.000Z',
          'سرصفحه مقاله',
          services.persian,
          'article',
          'persian',
          true,
        ),
      );
      expect(Wrapper.find(LinkedData).props()).toEqual(
        linkedDataProps(
          'BBC News فارسی',
          'https://www.bbc.com/persian/articles/c4vlle3q337o',
          '2018-01-01T12:01:00.000Z',
          '2018-01-01T13:00:00.000Z',
          'Persian',
          'https://news.files.bbci.co.uk/ws/img/logos/og/persian.png',
          'سرصفحه مقاله',
          'Article',
        ),
      );
    });

    it('should be correct for WS Frontpages', () => {
      const Wrapper = mount(
        Container(
          'igbo',
          dotComOrigin,
          'canonical',
          frontPageData,
          null,
          'frontPage',
        ),
      );

      expect(
        Wrapper.containsMatchingElement(
          <MetadataContainer {...frontPageData} />,
        ),
      ).toEqual(true);
      expect(Wrapper.find(Metadata).props()).toEqual(
        metadataProps(
          false,
          [
            {
              href: 'https://www.bbc.com/igbo',
              hrefLang: 'ig',
            },
          ],
          'https://www.bbc.com/igbo.amp',
          'https://www.bbc.com/igbo',
          'BBC News Igbo na-agbasa akụkọ sị Naịjirịa, Afịrịka na mba ụwa niile... Ihe na-eme ugbua gbasara akụkọ, egwuregwu, ihe nkiri na ihe na-ewu ewu... BBC Nkeji.',
          'ltr',
          'ig',
          [],
          null,
          null,
          'Ogbako',
          services.igbo,
          'website',
          'igbo',
          false,
        ),
      );
      expect(Wrapper.find(LinkedData).props()).toEqual(
        linkedDataProps(
          'BBC News Ìgbò',
          'https://www.bbc.com/igbo',
          null,
          null,
          'Igbo',
          'https://news.files.bbci.co.uk/ws/img/logos/og/igbo.png',
          'Ogbako',
          'WebPage',
        ),
      );
    });
  });

  it('should be correct for WS Media liveradio', () => {
    const Wrapper = mount(
      Container(
        'korean',
        dotComOrigin,
        'canonical',
        liveRadioPageData,
        null,
        'media',
      ),
    );

    expect(
      Wrapper.containsMatchingElement(
        <MetadataContainer {...liveRadioPageData} />,
      ),
    ).toEqual(true);
    expect(Wrapper.find(Metadata).props()).toEqual(
      metadataProps(
        false,
        [],
        'https://www.bbc.com/korean/bbc_korean_radio/liveradio.amp',
        'https://www.bbc.com/korean/bbc_korean_radio/liveradio',
        '세계와 한반도 뉴스를 공정하고 객관적으로 전달해 드립니다',
        'ltr',
        'ko-KO',
        [],
        null,
        null,
        'BBC News 코리아 라디오',
        services.korean,
        'website',
        'korean',
        false,
      ),
    );
    expect(Wrapper.find(LinkedData).props()).toEqual(
      linkedDataProps(
        'BBC News 코리아',
        'https://www.bbc.com/korean/bbc_korean_radio/liveradio',
        null,
        null,
        'Korean',
        'https://news.files.bbci.co.uk/ws/img/logos/og/korean.png',
        'BBC News 코리아 라디오',
        'RadioChannel',
      ),
    );
  });
});
