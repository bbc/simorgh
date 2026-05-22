import { Helmet } from 'react-helmet';
import {
  ARTICLE_PAGE,
  HOME_PAGE,
  STORY_PAGE,
  MEDIA_ASSET_PAGE,
  PHOTO_GALLERY_PAGE,
  LIVE_RADIO_PAGE,
  AUDIO_PAGE,
  TV_PAGE,
  LIVE_PAGE,
  MEDIA_ARTICLE_PAGE,
} from '#app/routes/utils/pageTypes';
import {
  articleDataNews,
  articleDataPersian,
  articleDataPidginWithByline,
} from '#pages/ArticlePage/fixtureData';
import { RequestContextProvider } from '#contexts/RequestContext';
import { data as gahuzaAudioPage } from '#data/gahuza/bbc_gahuza_radio/p02pcb5c.json';
import { data as liveRadioPageData } from '#data/korean/bbc_korean_radio/liveradio.json';
import { data as hindiTVBrand } from '#data/hindi/bbc_hindi_tv/tv_programmes/w13xttlw.json';
import { getSummary } from '#lib/utilities/parseAssetData/index';
import { Services, PageTypes } from '#app/models/types/global';
import { Article } from '#app/models/types/optimo';
import filterForBlockType from '#app/lib/utilities/blockHandlers';
import services from '#utilities/serviceConfigs';
import { render, waitFor } from '../react-testing-library-with-providers';
import { getAuthorTwitterHandle } from '../Byline/utilities';
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import MetadataContainer, { OG_EXPERIMENT_SERVICES } from './index';
import { MetadataProps } from './types';

const dotComOrigin = 'https://www.bbc.com';
const dotCoDotUKOrigin = 'https://www.bbc.co.uk';

type Platform = 'canonical' | 'amp';

const getArticleMetadataProps = (data: Article) => ({
  title: data.promo.headlines.seoHeadline,
  lang: data.metadata.passport.language,
  description: getSummary(data) as string,
  openGraphType: 'article',
  aboutTags: articleDataNews.metadata.tags.about,
  mentionsTags: articleDataNews.metadata.tags.mentions,
});

const newsArticleMetadataProps = getArticleMetadataProps(articleDataNews);
const persianArticleMetadataProps = getArticleMetadataProps(articleDataPersian);
const pidginArticleWithBylineMetadataProps = {
  ...getArticleMetadataProps(articleDataPidginWithByline),
  twitterHandle: getAuthorTwitterHandle(
    articleDataPidginWithByline.content.model.blocks,
  ),
};

interface MetadataWithContextProps extends MetadataProps {
  service: Services;
  bbcOrigin: string;
  platform: Platform;
  pageType: PageTypes;
  id?: string | null;
  pathname: string;
  isUK?: boolean;
  isLite?: boolean;
}

const MetadataWithContext = ({
  service,
  bbcOrigin,
  platform,
  id,
  pageType,
  pathname,
  title,
  lang,
  twitterHandle,
  description,
  openGraphType,
  image,
  imageAltText,
  imageWidth,
  imageHeight,
  aboutTags,
  mentionsTags,
  hasAppleItunesAppBanner,
  hasAmpPage,
  isUK = false,
  isLite = false,
}: MetadataWithContextProps) => (
  <ServiceContextProvider service={service} pageLang={lang}>
    <RequestContextProvider
      bbcOrigin={bbcOrigin}
      id={id}
      isAmp={platform === 'amp'}
      isApp={false}
      pageType={pageType}
      pathname={pathname}
      service={service}
      statusCode={200}
      isUK={isUK}
      isLite={isLite}
    >
      <MetadataContainer
        title={title}
        lang={lang}
        twitterHandle={twitterHandle}
        description={description}
        openGraphType={openGraphType}
        aboutTags={aboutTags}
        mentionsTags={mentionsTags}
        image={image}
        imageAltText={imageAltText}
        imageHeight={imageHeight}
        imageWidth={imageWidth}
        hasAppleItunesAppBanner={hasAppleItunesAppBanner}
        hasAmpPage={hasAmpPage}
      />
    </RequestContextProvider>
  </ServiceContextProvider>
);

const CanonicalMapInternationalOrigin = () => (
  <MetadataWithContext
    service="pidgin"
    image="http://ichef.test.bbci.co.uk/ace/ws/1024/branded_pidgin/6FC4/test/_63721682_p01kx435.jpg"
    imageAltText="connectionAltText"
    imageWidth={100}
    imageHeight={200}
    bbcOrigin={dotComOrigin}
    platform="canonical"
    id="23248703"
    pageType={ARTICLE_PAGE}
    pathname="/pigdin/23248703"
    {...newsArticleMetadataProps}
  />
);

describe('Metadata', () => {
  it(`should render the canonical link's top level domain as .com for WS article pages`, async () => {
    render(
      <MetadataWithContext
        service="mundo"
        bbcOrigin={dotCoDotUKOrigin}
        platform="canonical"
        id="c0000000001o"
        pageType={ARTICLE_PAGE}
        pathname="/mundo/c0000000001o"
        {...newsArticleMetadataProps}
      />,
    );

    await waitFor(() => {
      const actual = document
        .querySelector('head > link[rel="canonical"]')
        ?.getAttribute('href');

      expect(actual).toEqual('https://www.bbc.com/mundo/c0000000001o');
    });
  });

  it('should render the twitter handle of the author', async () => {
    render(
      <MetadataWithContext
        service="pidgin"
        bbcOrigin={dotComOrigin}
        platform="canonical"
        id="cwl08rd38l6o"
        pageType={ARTICLE_PAGE}
        pathname="/pidgin/articles/cwl08rd38l6o"
        {...pidginArticleWithBylineMetadataProps}
      />,
    );

    await waitFor(() => {
      expect(
        document
          .querySelector('meta[name="twitter:creator"]')
          ?.getAttribute('content'),
      ).toEqual('@mary_harper');
    });
  });

  it('should render the default service twitter handle for a Home Page asset', async () => {
    render(
      <MetadataWithContext
        service="serbian"
        bbcOrigin={dotComOrigin}
        platform="canonical"
        id={null}
        pageType={HOME_PAGE}
        pathname="/serbian"
        title="Serbian"
        lang="sr-Latn"
        description="BBC na srpskom nudi ekskluzivan sadržaj - analitičko, istraživačko i nepristrasno izveštavanje u tekstovima i video prilozima prilagođenim i društvenim mrežama."
        openGraphType="website"
      />,
    );

    await waitFor(() => {
      expect(
        document
          .querySelector('meta[name="twitter:creator"]')
          ?.getAttribute('content'),
      ).toEqual('@bbcnasrpskom');
    });
  });

  it('should render the default service twitter handle for a Story Page asset', async () => {
    render(
      <MetadataWithContext
        service="mundo"
        bbcOrigin={dotComOrigin}
        platform="canonical"
        id="53268428"
        pageType={STORY_PAGE}
        pathname="/mundo/noticias-internacional-51266689"
        title="A story"
        description="The story's description"
        lang="en-GB"
        openGraphType="article"
      />,
    );

    await waitFor(() => {
      expect(
        document
          .querySelector('meta[name="twitter:creator"]')
          ?.getAttribute('content'),
      ).toEqual('@bbcmundo');
    });
  });

  it('should render the default service twitter handle for a Media Asset Page asset', async () => {
    render(
      <MetadataWithContext
        service="arabic"
        bbcOrigin={dotComOrigin}
        platform="canonical"
        id="49580542"
        pageType={MEDIA_ASSET_PAGE}
        pathname="/arabic/media-49580542"
        title="A story"
        description="The story's description"
        lang="en-GB"
        openGraphType="article"
      />,
    );

    await waitFor(() => {
      expect(
        document
          .querySelector('meta[name="twitter:creator"]')
          ?.getAttribute('content'),
      ).toEqual('@BBCArabic');
    });
  });

  it('should render the default service twitter handle for a Photo Gallery asset', async () => {
    render(
      <MetadataWithContext
        service="uzbek"
        bbcOrigin={dotComOrigin}
        platform="canonical"
        id="46716844"
        pageType={PHOTO_GALLERY_PAGE}
        pathname="/uzbek/central-asia-46716844"
        title="A story"
        description="The story's description"
        lang="en-GB"
        openGraphType="article"
      />,
    );

    await waitFor(() => {
      expect(
        document
          .querySelector('meta[name="twitter:creator"]')
          ?.getAttribute('content'),
      ).toEqual('@bbcuzbek');
    });
  });

  it('should render the open graph image if provided', async () => {
    render(<CanonicalMapInternationalOrigin />);

    const expected = [
      {
        property: 'og:image',
        content:
          'http://ichef.test.bbci.co.uk/ace/ws/1024/branded_pidgin/6FC4/test/_63721682_p01kx435.jpg',
      },
      { property: 'og:image:alt', content: 'connectionAltText' },
      { property: 'og:image:width', content: '100' },
      { property: 'og:image:height', content: '200' },
      { name: 'twitter:image:alt', content: 'connectionAltText' },
      {
        name: 'twitter:image:src',
        content:
          'http://ichef.test.bbci.co.uk/ace/ws/1024/branded_pidgin/6FC4/test/_63721682_p01kx435.jpg',
      },
    ];

    await waitFor(() => {
      const actual = Array.from(
        document.querySelectorAll(
          'head > meta[property*="image"], head > meta[name*="image"]',
        ),
      ).map(tag =>
        tag.hasAttribute('property')
          ? {
              property: tag.getAttribute('property'),
              content: tag.getAttribute('content'),
            }
          : {
              name: tag.getAttribute('name'),
              content: tag.getAttribute('content'),
            },
      );

      expect(actual).toEqual(expected);
    });
  });

  describe('Snapshot', () => {
    it('should match for Persian News & byline twitter handle', () => {
      render(
        <MetadataWithContext
          service="pidgin"
          bbcOrigin={dotComOrigin}
          platform="canonical"
          id="cwl08rd38l6o"
          pageType={ARTICLE_PAGE}
          pathname="/pidgin/articles/cwl08rd38l6o"
          {...pidginArticleWithBylineMetadataProps}
        />,
      );
      const container = Helmet.peek();
      expect(container).toMatchSnapshot();
    });

    it('should match for Persian News & international origin', () => {
      render(
        <MetadataWithContext
          service="persian"
          bbcOrigin={dotComOrigin}
          platform="canonical"
          id="c4vlle3q337o"
          pageType={ARTICLE_PAGE}
          pathname="/persian/articles/c4vlle3q337o"
          {...persianArticleMetadataProps}
        />,
      );
      const container = Helmet.peek();
      expect(container).toMatchSnapshot();
    });

    it('should match for Persian News & UK origin', () => {
      render(
        <MetadataWithContext
          service="persian"
          bbcOrigin={dotCoDotUKOrigin}
          platform="amp"
          id="c4vlle3q337o"
          pageType={ARTICLE_PAGE}
          pathname="/persian/articles/c4vlle3q337o.amp"
          {...persianArticleMetadataProps}
        />,
      );
      const container = Helmet.peek();
      expect(container).toMatchSnapshot();
    });

    it('should match for WS Homepages', () => {
      render(
        <MetadataWithContext
          service="urdu"
          bbcOrigin={dotComOrigin}
          platform="canonical"
          id={null}
          pageType={HOME_PAGE}
          pathname="/urdu"
          title="خبریں، تازہ خبریں، بریکنگ نیو | News, latest news, breaking news"
          lang="ur"
          description="تازہ ترین خبروں، ویڈیوز اور آڈیوز کے لیے بی بی سی اردو پر آئیے۔ بی بی سی اردو دنیا بھر کی خبروں کے حصول کے لیے ایک قابلِ اعتماد ویب سائٹ ہے۔"
          openGraphType="website"
        />,
      );
      const container = Helmet.peek();
      expect(container).toMatchSnapshot();
    });

    it('should match for WS Media liveradio', () => {
      render(
        <MetadataWithContext
          service="korean"
          bbcOrigin={dotComOrigin}
          platform="canonical"
          id={null}
          pageType={LIVE_RADIO_PAGE}
          pathname="/korean/bbc_korean_radio/liveradio"
          title={liveRadioPageData.name}
          lang={liveRadioPageData.language}
          description={liveRadioPageData.summary}
          openGraphType="website"
          hasAmpPage={false}
        />,
      );
      const container = Helmet.peek();
      expect(container).toMatchSnapshot();
    });

    it('should match for WS TV', () => {
      const mediaOverrides = filterForBlockType(
        hindiTVBrand.mediaBlocks,
        'mediaOverrides',
      );

      render(
        <MetadataWithContext
          service="hindi"
          bbcOrigin={dotComOrigin}
          platform="canonical"
          id={null}
          pageType={TV_PAGE}
          pathname="/hindi/bbc_hindi_tv/tv_programmes/w13xttlw"
          title={hindiTVBrand.metadata.atiAnalytics.pageTitle}
          lang={mediaOverrides.language}
          description={hindiTVBrand.shortSynopsis}
          openGraphType="website"
          hasAmpPage={false}
        />,
      );

      const container = Helmet.peek();
      expect(container).toMatchSnapshot();
    });

    it('should match for WS On Demand Audio', () => {
      render(
        <MetadataWithContext
          service="gahuza"
          bbcOrigin={dotComOrigin}
          platform="canonical"
          id={null}
          pageType={AUDIO_PAGE}
          pathname="/gahuza/bbc_gahuza_radio/p02pcb5c"
          title={gahuzaAudioPage.promoBrandTitle}
          lang={gahuzaAudioPage.language}
          description={gahuzaAudioPage.summary}
          openGraphType="website"
          hasAmpPage={false}
        />,
      );
      const container = Helmet.peek();
      expect(container).toMatchSnapshot();
    });

    it('should match for Ukrainian STY with Ukrainian lang on canonical', () => {
      render(
        <MetadataWithContext
          lang="uk"
          service="ukrainian"
          bbcOrigin={dotComOrigin}
          platform="canonical"
          id="news-53577781"
          pageType={STORY_PAGE}
          pathname="/ukrainian/news-53577781"
          description="BBC Ukrainian"
          openGraphType="website"
          title="BBC Ukrainian"
        />,
      );
      const container = Helmet.peek();
      expect(container).toMatchSnapshot();
    });

    it('should match for Ukrainian STY with Ukrainian lang on Amp', () => {
      render(
        <MetadataWithContext
          lang="uk"
          service="ukrainian"
          bbcOrigin={dotComOrigin}
          platform="amp"
          id="news-53577781"
          pageType={STORY_PAGE}
          pathname="/ukrainian/news-53577781.amp"
          description="BBC Ukrainian"
          openGraphType="website"
          title="BBC Ukrainian"
        />,
      );
      const container = Helmet.peek();
      expect(container).toMatchSnapshot();
    });

    it('should match for Ukrainian STY with Russian lang on canonical', () => {
      render(
        <MetadataWithContext
          lang="ru"
          service="ukrainian"
          bbcOrigin={dotComOrigin}
          platform="canonical"
          id="news-53577781"
          pageType={STORY_PAGE}
          pathname="/ukrainian/news-53577781"
          description="BBC Ukrainian"
          openGraphType="website"
          title="BBC Ukrainian"
        />,
      );
      const container = Helmet.peek();
      expect(container).toMatchSnapshot();
    });

    it('should match for Ukrainian STY with Russian lang on Amp', () => {
      render(
        <MetadataWithContext
          lang="ru"
          service="ukrainian"
          bbcOrigin={dotComOrigin}
          platform="amp"
          id="news-53577781"
          pageType={STORY_PAGE}
          pathname="/ukrainian/news-53577781.amp"
          description="BBC Ukrainian"
          openGraphType="website"
          title="BBC Ukrainian"
        />,
      );
      const container = Helmet.peek();
      expect(container).toMatchSnapshot();
    });
  });

  describe('apple-itunes-app meta tag', () => {
    interface CanonicalCPSAssetInternationalOriginProps {
      service: Services;
      platform: Platform;
      hasAppleItunesAppBanner: boolean;
    }

    const CanonicalCPSAssetInternationalOrigin = ({
      service,
      platform,
      hasAppleItunesAppBanner,
    }: CanonicalCPSAssetInternationalOriginProps) => (
      <MetadataWithContext
        service={service}
        bbcOrigin={dotComOrigin}
        platform={platform}
        id="asset-12345678"
        pageType={STORY_PAGE}
        pathname={`/${service}/asset-12345678`}
        {...newsArticleMetadataProps}
        hasAppleItunesAppBanner={hasAppleItunesAppBanner}
      />
    );

    it.each`
      service      | iTunesAppId
      ${'arabic'}  | ${558497376}
      ${'mundo'}   | ${515255747}
      ${'russian'} | ${504278066}
    `(
      'should be rendered for $service because iTunesAppId is configured ($iTunesAppId) and hasAppleItunesAppBanner is true',
      async ({ service, iTunesAppId }) => {
        render(
          <CanonicalCPSAssetInternationalOrigin
            service={service}
            platform="canonical"
            hasAppleItunesAppBanner
          />,
        );

        await waitFor(() => {
          const appleItunesApp = document.querySelector(
            'head > meta[name=apple-itunes-app]',
          );
          expect(appleItunesApp).toBeInTheDocument();

          const content = appleItunesApp?.getAttribute('content');
          expect(content).toEqual(
            `app-id=${iTunesAppId}, app-argument=https://www.bbc.com/${service}/asset-12345678?utm_medium=banner&utm_content=apple-itunes-app`,
          );
        });
      },
    );

    it.each`
      service     | reason                                            | platform       | hasAppleItunesAppBanner
      ${'arabic'} | ${'platform is AMP'}                              | ${'amp'}       | ${true}
      ${'mundo'}  | ${'hasAppleItunesAppBanner is false'}             | ${'canonical'} | ${false}
      ${'pidgin'} | ${'service does not have iTunesAppId configured'} | ${'canonical'} | ${true}
    `(
      `should not be rendered for $service because $reason`,
      ({ service, platform, hasAppleItunesAppBanner }) => {
        render(
          <CanonicalCPSAssetInternationalOrigin
            service={service}
            platform={platform}
            hasAppleItunesAppBanner={hasAppleItunesAppBanner}
          />,
        );

        expect(
          document.querySelector('head > meta[name=apple-itunes-app]'),
        ).not.toBeInTheDocument();
      },
    );
  });

  describe('Opengraph Image Experiment', () => {
    beforeEach(() => {
      delete process.env.SIMORGH_APP_ENV;
    });

    const getOgImageTag = () => {
      const metaTags = Helmet.peek()?.metaTags;
      // @ts-expect-error - property does exist on Helmet meta tags
      return metaTags?.find(tag => tag.property === 'og:image');
    };

    OG_EXPERIMENT_SERVICES.forEach(service => {
      describe(`for ${service} service`, () => {
        it.each`
          env        | pageType              | pathName                      | expectedUrl
          ${'local'} | ${ARTICLE_PAGE}       | ${`/${service}/c0000000001o`} | ${`http://localhost:7081/${service}/og/c0000000001o`}
          ${'test'}  | ${ARTICLE_PAGE}       | ${`/${service}/c0000000001o`} | ${`https://web-cdn.test.api.bbci.co.uk/${service}/og/c0000000001o`}
          ${'local'} | ${MEDIA_ARTICLE_PAGE} | ${`/${service}/c0000000001o`} | ${`http://localhost:7081/${service}/og/c0000000001o`}
          ${'test'}  | ${MEDIA_ARTICLE_PAGE} | ${`/${service}/c0000000001o`} | ${`https://web-cdn.test.api.bbci.co.uk/${service}/og/c0000000001o`}
          ${'local'} | ${LIVE_PAGE}          | ${`/${service}/c0000000001t`} | ${`http://localhost:7081/${service}/og/c0000000001t`}
          ${'test'}  | ${LIVE_PAGE}          | ${`/${service}/c0000000001t`} | ${`https://web-cdn.test.api.bbci.co.uk/${service}/og/c0000000001t`}
        `(
          `should return the Opengraph image API url for $pageType page on $env Env`,
          ({ env, pageType, pathName, expectedUrl }) => {
            process.env.SIMORGH_APP_ENV = env;

            render(
              // @ts-expect-error - testing with subset of data
              <MetadataWithContext
                service={service as Services}
                bbcOrigin={dotCoDotUKOrigin}
                pageType={pageType}
                pathname={pathName}
              />,
            );

            const ogImageTag = getOgImageTag();

            expect(ogImageTag?.content).toEqual(expectedUrl);
          },
        );

        it(`should return the default image if on Live Env`, () => {
          process.env.SIMORGH_APP_ENV = 'live';

          render(
            // @ts-expect-error - testing with subset of data
            <MetadataWithContext
              service={service as Services}
              bbcOrigin={dotCoDotUKOrigin}
              pageType={ARTICLE_PAGE}
              pathname={`/${service}/c0000000001o`}
            />,
          );

          const ogImageTag = getOgImageTag();

          expect(ogImageTag?.content).toEqual(
            `https://static.files.bbci.co.uk/ws/simorgh-assets/public/${service}/images/metadata/poster-1024x576.png`,
          );
        });

        it(`should return the default image if the id cannot be determined from the pathname`, () => {
          process.env.SIMORGH_APP_ENV = 'test';

          render(
            // @ts-expect-error - testing with subset of data
            <MetadataWithContext
              service={service as Services}
              bbcOrigin={dotCoDotUKOrigin}
              pageType={ARTICLE_PAGE}
              pathname={`/${service}/c000000001o`} // Malformed Article ID
            />,
          );

          const ogImageTag = getOgImageTag();

          expect(ogImageTag?.content).toEqual(
            `https://static.files.bbci.co.uk/ws/simorgh-assets/public/${service}/images/metadata/poster-1024x576.png`,
          );
        });
      });
    });

    it('should return the default image if service is not in the experiment', () => {
      process.env.SIMORGH_APP_ENV = 'test';

      render(
        // @ts-expect-error - testing with subset of data
        <MetadataWithContext
          service="pidgin"
          bbcOrigin={dotCoDotUKOrigin}
          pageType={ARTICLE_PAGE}
          pathname="/pidgin/c0000000001o"
        />,
      );

      const ogImageTag = getOgImageTag();

      expect(ogImageTag?.content).toEqual(
        'https://static.files.bbci.co.uk/ws/simorgh-assets/public/pidgin/images/metadata/poster-1024x576.png',
      );
    });

    it('should return the default image if page type is not in the experiment', () => {
      process.env.SIMORGH_APP_ENV = 'test';

      render(
        // @ts-expect-error - testing with subset of data
        <MetadataWithContext
          service="mundo"
          bbcOrigin={dotCoDotUKOrigin}
          pageType={STORY_PAGE}
          pathname="/mundo/c0000000001o"
        />,
      );

      const ogImageTag = getOgImageTag();

      expect(ogImageTag?.content).toEqual(
        'https://static.files.bbci.co.uk/ws/simorgh-assets/public/mundo/images/metadata/poster-1024x576.png',
      );
    });
  });
});
