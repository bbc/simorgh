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

const metadataProps = ({
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
}) => ({
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

const linkedDataProps = ({
  brandName,
  canonicalLink,
  firstPublished,
  lastUpdated,
  logoUrl,
  seoHeadline,
  type,
  about = undefined,
}) => ({
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
        metadataProps({
          isAmp: false,
          alternateLinks: [
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
          ampLink: 'https://www.bbc.com/news/articles/c0000000001o.amp',
          canonicalLink: 'https://www.bbc.com/news/articles/c0000000001o',
          description: 'Article summary.',
          dir: 'ltr',
          lang: 'en-gb',
          metaTags: [
            'Royal Wedding 2018',
            'Duchess of Sussex',
            'Queen Victoria',
          ],
          timeFirstPublished: '2018-01-01T12:01:00.000Z',
          timeLastPublished: '2018-01-01T13:00:00.000Z',
          title: 'Article Headline for SEO',
          serviceConfig: services.news,
          type: 'article',
          service: 'news',
          showArticleTags: true,
        }),
      );
      expect(Wrapper.find(LinkedData).props()).toEqual(
        linkedDataProps({
          brandName: 'BBC News',
          canonicalLink: 'https://www.bbc.com/news/articles/c0000000001o',
          firstPublished: '2018-01-01T12:01:00.000Z',
          lastUpdated: '2018-01-01T13:00:00.000Z',
          createdBy: 'News',
          logoUrl:
            'https://www.bbc.co.uk/news/special/2015/newsspec_10857/bbc_news_logo.png',
          seoHeadline: 'Article Headline for SEO',
          type: 'Article',
          about: [
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
        }),
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
        metadataProps({
          isAmp: true,
          alternateLinks: [
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
          ampLink: 'https://www.bbc.co.uk/news/articles/c0000000001o.amp',
          canonicalLink: 'https://www.bbc.com/news/articles/c0000000001o',
          description: 'Article summary.',
          dir: 'ltr',
          lang: 'en-gb',
          metaTags: [
            'Royal Wedding 2018',
            'Duchess of Sussex',
            'Queen Victoria',
          ],
          timeFirstPublished: '2018-01-01T12:01:00.000Z',
          timeLastPublished: '2018-01-01T13:00:00.000Z',
          title: 'Article Headline for SEO',
          serviceConfig: services.news,
          type: 'article',
          service: 'news',
          showArticleTags: true,
        }),
      );
      expect(Wrapper.find(LinkedData).props()).toEqual(
        linkedDataProps({
          brandName: 'BBC News',
          canonicalLink: 'https://www.bbc.com/news/articles/c0000000001o',
          firstPublished: '2018-01-01T12:01:00.000Z',
          lastUpdated: '2018-01-01T13:00:00.000Z',
          createdBy: 'News',
          logoUrl:
            'https://www.bbc.co.uk/news/special/2015/newsspec_10857/bbc_news_logo.png',
          seoHeadline: 'Article Headline for SEO',
          type: 'Article',
          about: [
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
        }),
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
        metadataProps({
          isAmp: false,
          alternateLinks: [],
          ampLink: 'https://www.bbc.com/persian/articles/c4vlle3q337o.amp',
          canonicalLink: 'https://www.bbc.com/persian/articles/c4vlle3q337o',
          description: 'خلاصه مقاله',
          dir: 'rtl',
          lang: 'fa',
          metaTags: [],
          timeFirstPublished: '2018-01-01T12:01:00.000Z',
          timeLastPublished: '2018-01-01T13:00:00.000Z',
          title: 'سرصفحه مقاله',
          serviceConfig: services.persian,
          type: 'article',
          service: 'persian',
          showArticleTags: true,
        }),
      );
      expect(Wrapper.find(LinkedData).props()).toEqual(
        linkedDataProps({
          brandName: 'BBC News فارسی',
          canonicalLink: 'https://www.bbc.com/persian/articles/c4vlle3q337o',
          firstPublished: '2018-01-01T12:01:00.000Z',
          lastUpdated: '2018-01-01T13:00:00.000Z',
          createdBy: 'Persian',
          logoUrl: 'https://news.files.bbci.co.uk/ws/img/logos/og/persian.png',
          seoHeadline: 'سرصفحه مقاله',
          type: 'Article',
        }),
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
        metadataProps({
          isAmp: true,
          alternateLinks: [],
          ampLink: 'https://www.bbc.co.uk/persian/articles/c4vlle3q337o.amp',
          canonicalLink: 'https://www.bbc.com/persian/articles/c4vlle3q337o',
          description: 'خلاصه مقاله',
          dir: 'rtl',
          lang: 'fa',
          metaTags: [],
          timeFirstPublished: '2018-01-01T12:01:00.000Z',
          timeLastPublished: '2018-01-01T13:00:00.000Z',
          title: 'سرصفحه مقاله',
          serviceConfig: services.persian,
          type: 'article',
          service: 'persian',
          showArticleTags: true,
        }),
      );
      expect(Wrapper.find(LinkedData).props()).toEqual(
        linkedDataProps({
          brandName: 'BBC News فارسی',
          canonicalLink: 'https://www.bbc.com/persian/articles/c4vlle3q337o',
          firstPublished: '2018-01-01T12:01:00.000Z',
          lastUpdated: '2018-01-01T13:00:00.000Z',
          createdBy: 'Persian',
          logoUrl: 'https://news.files.bbci.co.uk/ws/img/logos/og/persian.png',
          seoHeadline: 'سرصفحه مقاله',
          type: 'Article',
        }),
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
        metadataProps({
          isAmp: false,
          alternateLinks: [
            {
              href: 'https://www.bbc.com/igbo',
              hrefLang: 'ig',
            },
          ],
          ampLink: 'https://www.bbc.com/igbo.amp',
          canonicalLink: 'https://www.bbc.com/igbo',
          description:
            'BBC News Igbo na-agbasa akụkọ sị Naịjirịa, Afịrịka na mba ụwa niile... Ihe na-eme ugbua gbasara akụkọ, egwuregwu, ihe nkiri na ihe na-ewu ewu... BBC Nkeji.',
          dir: 'ltr',
          lang: 'ig',
          metaTags: [],
          timeFirstPublished: null,
          timeLastPublished: null,
          title: 'Ogbako',
          serviceConfig: services.igbo,
          type: 'website',
          service: 'igbo',
          showArticleTags: false,
        }),
      );
      expect(Wrapper.find(LinkedData).props()).toEqual(
        linkedDataProps({
          brandName: 'BBC News Ìgbò',
          canonicalLink: 'https://www.bbc.com/igbo',
          firstPublished: null,
          lastUpdated: null,
          createdBy: 'Igbo',
          logoUrl: 'https://news.files.bbci.co.uk/ws/img/logos/og/igbo.png',
          seoHeadline: 'Ogbako',
          type: 'WebPage',
        }),
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
      metadataProps({
        isAmp: false,
        alternateLinks: [],
        ampLink: 'https://www.bbc.com/korean/bbc_korean_radio/liveradio.amp',
        canonicalLink: 'https://www.bbc.com/korean/bbc_korean_radio/liveradio',
        description: '세계와 한반도 뉴스를 공정하고 객관적으로 전달해 드립니다',
        dir: 'ltr',
        lang: 'ko',
        metaTags: [],
        timeFirstPublished: null,
        timeLastPublished: null,
        title: 'BBC News 코리아 라디오',
        serviceConfig: services.korean,
        type: 'website',
        service: 'korean',
        showArticleTags: false,
      }),
    );
    expect(Wrapper.find(LinkedData).props()).toEqual(
      linkedDataProps({
        brandName: 'BBC News 코리아',
        canonicalLink: 'https://www.bbc.com/korean/bbc_korean_radio/liveradio',
        firstPublished: null,
        lastUpdated: null,
        createdBy: 'Korean',
        logoUrl: 'https://news.files.bbci.co.uk/ws/img/logos/og/korean.png',
        seoHeadline: 'BBC News 코리아 라디오',
        type: 'RadioChannel',
      }),
    );
  });
});
