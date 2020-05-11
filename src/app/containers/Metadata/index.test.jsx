import React from 'react';
import { render, waitForDomChange } from '@testing-library/react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import MetadataContainer from './index';

import { ServiceContextProvider } from '#contexts/ServiceContext';
import {
  articleDataNews,
  articleDataPersian,
} from '#pages/ArticlePage/fixtureData';
import services from '#server/utilities/serviceConfigs';
import { RequestContextProvider } from '#contexts/RequestContext';
import frontPageData from '#data/igbo/frontpage/index.json';
import liveRadioPageData from '#data/korean/bbc_korean_radio/liveradio.json';
import { getSummary } from '#lib/utilities/parseAssetData/index';

const dotComOrigin = 'https://www.bbc.com';
const dotCoDotUKOrigin = 'https://www.bbc.co.uk';

const getArticleMetadataProps = data => ({
  title: data.promo.headlines.seoHeadline,
  lang: data.metadata.passport.language,
  description: getSummary(data),
  openGraphType: 'article',
  aboutTags: articleDataNews.metadata.tags.about,
  mentionsTags: articleDataNews.metadata.tags.mentions,
});

const newsArticleMetadataProps = getArticleMetadataProps(articleDataNews);
const persianArticleMetadataProps = getArticleMetadataProps(articleDataPersian);

const MetadataWithContext = ({
  /* eslint-disable react/prop-types */
  service,
  bbcOrigin,
  platform,
  id,
  pageType,
  pathname,
  title,
  lang,
  description,
  openGraphType,
  image,
  imageAltText,
  aboutTags,
  mentionsTags,
  /* eslint-enable react/prop-types */
}) => {
  const serviceConfig = services[service].default;

  return (
    <ServiceContextProvider {...serviceConfig}>
      <RequestContextProvider
        bbcOrigin={bbcOrigin}
        id={id}
        isAmp={platform === 'amp'}
        pageType={pageType}
        pathname={pathname}
        service={service}
        statusCode={200}
      >
        <MetadataContainer
          title={title}
          lang={lang}
          description={description}
          openGraphType={openGraphType}
          aboutTags={aboutTags}
          mentionsTags={mentionsTags}
          image={image}
          imageAltText={imageAltText}
        />
      </RequestContextProvider>
    </ServiceContextProvider>
  );
};

const CanonicalNewsInternationalOrigin = () => (
  <MetadataWithContext
    service="news"
    bbcOrigin={dotComOrigin}
    platform="canonical"
    id="c0000000001o"
    pageType="article"
    pathname="/news/articles/c0000000001o"
    {...newsArticleMetadataProps}
  />
);

const CanonicalMapInternationalOrigin = () => (
  <MetadataWithContext
    service="pidgin"
    image="http://ichef.test.bbci.co.uk/news/1024/branded_pidgin/6FC4/test/_63721682_p01kx435.jpg"
    imageAltText="connectionAltText"
    bbcOrigin={dotComOrigin}
    platform="canonical"
    id="23248703"
    pageType="article"
    pathname="/pigdin/23248703"
    {...newsArticleMetadataProps}
  />
);

const renderMetadataToDocument = async () => {
  render(<CanonicalNewsInternationalOrigin />);

  await waitForDomChange({
    container: document.querySelector('head'),
  });
};

const renderMapMetadataToDocument = async () => {
  render(<CanonicalMapInternationalOrigin />);

  await waitForDomChange({
    container: document.querySelector('head'),
  });
};

it('should render the dir and lang attribute', async () => {
  await renderMetadataToDocument();
  const htmlEl = document.querySelector('html');

  expect(htmlEl.getAttribute('dir')).toEqual('ltr');
  expect(htmlEl.getAttribute('lang')).toEqual('en-gb');
});

it('should render the document title', async () => {
  await renderMetadataToDocument();
  const actual = document.querySelector('head > title').innerHTML;
  const expected = 'Article Headline for SEO - BBC News';

  expect(actual).toEqual(expected);
});

it('should render the canonical link', async () => {
  await renderMetadataToDocument();

  const actual = document
    .querySelector('head > link[rel="canonical"]')
    .getAttribute('href');
  const expected = 'https://www.bbc.com/news/articles/c0000000001o';

  expect(actual).toEqual(expected);
});

it('should render the alternate links', async () => {
  await renderMetadataToDocument();
  const actual = Array.from(
    document.querySelectorAll('head > link[rel="alternate"]'),
  ).map(tag => ({
    href: tag.getAttribute('href'),
    hreflang: tag.getAttribute('hreflang'),
  }));
  const expected = [
    {
      href: 'https://www.bbc.com/news/articles/c0000000001o',
      hreflang: 'x-default',
    },
    {
      href: 'https://www.bbc.com/news/articles/c0000000001o',
      hreflang: 'en',
    },
    {
      href: 'https://www.bbc.co.uk/news/articles/c0000000001o',
      hreflang: 'en-gb',
    },
  ];

  expect(actual).toEqual(expected);
});

it('should render the apple touch icons', async () => {
  await renderMetadataToDocument();
  const actual = Array.from(
    document.querySelectorAll('head > link[rel="apple-touch-icon"]'),
  ).map(tag => ({
    href: tag.getAttribute('href'),
    sizes: tag.getAttribute('sizes'),
  }));
  const expected = [
    {
      href: 'http://localhost:7080/news/images/icons/icon-192x192.png',
      sizes: null,
    },
    {
      href:
        'https://news.files.bbci.co.uk/include/articles/public/news/images/icons/icon-72x72.png',
      sizes: '72x72',
    },
    {
      href:
        'https://news.files.bbci.co.uk/include/articles/public/news/images/icons/icon-96x96.png',
      sizes: '96x96',
    },
    {
      href:
        'https://news.files.bbci.co.uk/include/articles/public/news/images/icons/icon-128x128.png',
      sizes: '128x128',
    },
    {
      href:
        'https://news.files.bbci.co.uk/include/articles/public/news/images/icons/icon-144x144.png',
      sizes: '144x144',
    },
    {
      href:
        'https://news.files.bbci.co.uk/include/articles/public/news/images/icons/icon-152x152.png',
      sizes: '152x152',
    },
    {
      href:
        'https://news.files.bbci.co.uk/include/articles/public/news/images/icons/icon-192x192.png',
      sizes: '192x192',
    },
    {
      href:
        'https://news.files.bbci.co.uk/include/articles/public/news/images/icons/icon-384x384.png',
      sizes: '384x384',
    },
    {
      href:
        'https://news.files.bbci.co.uk/include/articles/public/news/images/icons/icon-512x512.png',
      sizes: '512x512',
    },
  ];

  expect(actual).toEqual(expected);
});

it('should render the icons', async () => {
  await renderMetadataToDocument();
  const actual = Array.from(
    document.querySelectorAll('head > link[rel="icon"]'),
  ).map(tag => ({
    href: tag.getAttribute('href'),
    type: tag.getAttribute('type'),
    sizes: tag.getAttribute('sizes'),
  }));
  const expected = [
    {
      href:
        'https://news.files.bbci.co.uk/include/articles/public/news/images/icons/icon-72x72.png',
      sizes: '72x72',
      type: 'image/png',
    },
    {
      href:
        'https://news.files.bbci.co.uk/include/articles/public/news/images/icons/icon-96x96.png',
      sizes: '96x96',
      type: 'image/png',
    },
    {
      href:
        'https://news.files.bbci.co.uk/include/articles/public/news/images/icons/icon-192x192.png',
      sizes: '192x192',
      type: 'image/png',
    },
  ];

  expect(actual).toEqual(expected);
});

it('should render the favicon', async () => {
  await renderMetadataToDocument();
  const favicon = document.querySelector('head > link[rel="shortcut icon"]');

  expect(favicon.getAttribute('href')).toEqual('/favicon.ico');
  expect(favicon.getAttribute('rel')).toEqual('shortcut icon');
  expect(favicon.getAttribute('type')).toEqual('image/x-icon');
});

it('should render the IE X-UA-Compatible meta tag', async () => {
  await renderMetadataToDocument();

  const actual = document
    .querySelector('head > meta[http-equiv="X-UA-Compatible"]')
    .getAttribute('content');
  const expected = 'IE=edge';

  expect(actual).toEqual(expected);
});

it('should render the char set metadata', async () => {
  await renderMetadataToDocument();

  expect(document.querySelector('head > meta[charset="utf-8"]')).toBeTruthy();
});

it('should render the robots meta tag', async () => {
  await renderMetadataToDocument();

  const actual = document
    .querySelector('head > meta[name="robots"]')
    .getAttribute('content');
  const expected = 'noodp,noydir';

  expect(actual).toEqual(expected);
});

it('should render the theme-colour meta tag', async () => {
  await renderMetadataToDocument();

  const actual = document
    .querySelector('head > meta[name="theme-color"]')
    .getAttribute('content');
  const expected = '#B80000';

  expect(actual).toEqual(expected);
});

it('should render the apple-mobile-web-app-title', async () => {
  await renderMetadataToDocument();

  const actual = document
    .querySelector('head > meta[name="apple-mobile-web-app-title"]')
    .getAttribute('content');
  const expected = 'BBC News';

  expect(actual).toEqual(expected);
});

it('should render the application name meta tag', async () => {
  await renderMetadataToDocument();

  const actual = document
    .querySelector('head > meta[name="application-name"]')
    .getAttribute('content');
  const expected = 'BBC News';

  expect(actual).toEqual(expected);
});

it('should render the description meta tag', async () => {
  await renderMetadataToDocument();

  const actual = document
    .querySelector('head > meta[name="description"]')
    .getAttribute('content');
  const expected = 'Article summary.';

  expect(actual).toEqual(expected);
});

it('should render the facebook metatags', async () => {
  await renderMetadataToDocument();

  const fbAdminId = document
    .querySelector('head > meta[property="fb:admins"]')
    .getAttribute('content');
  const fbAppId = document
    .querySelector('head > meta[property="fb:app_id"]')
    .getAttribute('content');
  const fbPages = document
    .querySelector('head > meta[property="fb:pages"]')
    .getAttribute('content');

  expect(fbAdminId).toEqual('100004154058350');
  expect(fbAppId).toEqual('1609039196070050');
  expect(fbPages).toEqual(
    '285361880228,192168680794107,9432520138,347501767628,264572343581678,303522857815,166580710064489,592266607456680,260669183761,160817274042538,236659822607,237647452933504,10150118096995434,113097918700687,143048895744759,81395234664,207150596007088,167959249906191,64040652712,190992343324,103678496456574,367167334474,160894643929209,186742265162,1526071940947174,230299653821,124158667615790,126548377386804,298318986864908,1068750829805728,228458913833525,163571453661989,660673490805047,948946275170651,485274381864409,1633841096923106,654070648098812',
  );
});

it('should render the mobile-web-app-capable meta tag', async () => {
  await renderMetadataToDocument();

  const actual = document
    .querySelector('head > meta[name="mobile-web-app-capable"]')
    .getAttribute('content');
  const expected = 'yes';

  expect(actual).toEqual(expected);
});

it('should render the msapplication meta tags', async () => {
  await renderMetadataToDocument();

  const tileColour = document
    .querySelector('head > meta[name=msapplication-TileColor]')
    .getAttribute('content');
  const tileImage = document
    .querySelector('head > meta[name=msapplication-TileImage]')
    .getAttribute('content');

  expect(tileColour).toEqual('#B80000');
  expect(tileImage).toEqual(
    'https://news.files.bbci.co.uk/include/articles/public/news/images/icons/icon-144x144.png',
  );
});

it('should render the OG metatags', async () => {
  await renderMetadataToDocument();

  const actual = Array.from(
    document.querySelectorAll('head > meta[property^="og:"]'),
  ).map(tag => ({
    property: tag.getAttribute('property'),
    content: tag.getAttribute('content'),
  }));
  const expected = [
    { content: 'Article summary.', property: 'og:description' },
    {
      content:
        'https://www.bbc.co.uk/news/special/2015/newsspec_10857/bbc_news_logo.png',
      property: 'og:image',
    },
    { content: 'BBC News', property: 'og:image:alt' },
    { content: 'en_GB', property: 'og:locale' },
    { content: 'BBC News', property: 'og:site_name' },
    { content: 'Article Headline for SEO - BBC News', property: 'og:title' },
    { content: 'article', property: 'og:type' },
    {
      content: 'https://www.bbc.com/news/articles/c0000000001o',
      property: 'og:url',
    },
  ];

  expect(actual).toEqual(expected);
});

it('should render the twitter metatags', async () => {
  await renderMetadataToDocument();

  const actual = Array.from(
    document.querySelectorAll('head > meta[name^="twitter"]'),
  ).map(tag => ({
    name: tag.getAttribute('name'),
    content: tag.getAttribute('content'),
  }));
  const expected = [
    { content: 'summary_large_image', name: 'twitter:card' },
    { content: '@BBCNews', name: 'twitter:creator' },
    { content: 'Article summary.', name: 'twitter:description' },
    { content: 'BBC News', name: 'twitter:image:alt' },
    {
      content:
        'https://www.bbc.co.uk/news/special/2015/newsspec_10857/bbc_news_logo.png',
      name: 'twitter:image:src',
    },
    { content: '@BBCNews', name: 'twitter:site' },
    { content: 'Article Headline for SEO - BBC News', name: 'twitter:title' },
  ];

  expect(actual).toEqual(expected);
});

it('should render the LDP tags', async () => {
  await renderMetadataToDocument();

  const actual = Array.from(
    document.querySelectorAll('head > meta[name^="article:tag"]'),
  ).map(tag => ({
    name: tag.getAttribute('name'),
    content: tag.getAttribute('content'),
  }));

  const expected = [
    { content: 'Royal Wedding 2018', name: 'article:tag' },
    { content: 'Duchess of Sussex', name: 'article:tag' },
    { content: 'Queen Victoria', name: 'article:tag' },
  ];

  expect(actual).toEqual(expected);
});

it('should render the default service image as open graph image', async () => {
  await renderMetadataToDocument();
  const serviceConfig = services.news.default;

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
  const expected = [
    {
      property: 'og:image',
      content: serviceConfig.defaultImage,
    },
    { property: 'og:image:alt', content: serviceConfig.defaultImageAltText },
    { name: 'twitter:image:alt', content: serviceConfig.defaultImageAltText },
    {
      name: 'twitter:image:src',
      content: serviceConfig.defaultImage,
    },
  ];
  expect(actual).toEqual(expected);
});

it('should render the open graph image if provided', async () => {
  await renderMapMetadataToDocument();

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
  const expected = [
    {
      property: 'og:image',
      content:
        'http://ichef.test.bbci.co.uk/news/1024/branded_pidgin/6FC4/test/_63721682_p01kx435.jpg',
    },
    { property: 'og:image:alt', content: 'connectionAltText' },
    { name: 'twitter:image:alt', content: 'connectionAltText' },
    {
      name: 'twitter:image:src',
      content:
        'http://ichef.test.bbci.co.uk/news/1024/branded_pidgin/6FC4/test/_63721682_p01kx435.jpg',
    },
  ];
  expect(actual).toEqual(expected);
});

shouldMatchSnapshot(
  'should match for Canonical News & international origin',
  <CanonicalNewsInternationalOrigin />,
);

shouldMatchSnapshot(
  'should match for AMP News & UK origin',
  <MetadataWithContext
    service="news"
    bbcOrigin={dotCoDotUKOrigin}
    platform="amp"
    id="c0000000001o"
    pageType="article"
    pathname="/news/articles/c0000000001o.amp"
    {...newsArticleMetadataProps}
  />,
);

shouldMatchSnapshot(
  'should match for Persian News & international origin',
  <MetadataWithContext
    service="persian"
    bbcOrigin={dotComOrigin}
    platform="canonical"
    id="c4vlle3q337o"
    pageType="article"
    pathname="/persian/articles/c4vlle3q337o"
    {...persianArticleMetadataProps}
  />,
);

shouldMatchSnapshot(
  'should match for Persian News & UK origin',
  <MetadataWithContext
    service="persian"
    bbcOrigin={dotCoDotUKOrigin}
    platform="amp"
    id="c4vlle3q337o"
    pageType="article"
    pathname="/persian/articles/c4vlle3q337o.amp"
    {...persianArticleMetadataProps}
  />,
);

shouldMatchSnapshot(
  'should match for WS Frontpages',
  <MetadataWithContext
    service="igbo"
    bbcOrigin={dotComOrigin}
    platform="canonical"
    id={null}
    pageType="frontPage"
    pathname="/igbo"
    title="Ogbako"
    lang={frontPageData.metadata.language}
    description={frontPageData.metadata.summary}
    openGraphType="website"
  />,
);

shouldMatchSnapshot(
  'should match for WS Media liveradio',
  <MetadataWithContext
    service="korean"
    bbcOrigin={dotComOrigin}
    platform="canonical"
    id={null}
    pageType="media"
    pathname="/korean/bbc_korean_radio/liveradio"
    title={liveRadioPageData.promo.name}
    lang={liveRadioPageData.metadata.language}
    description={liveRadioPageData.promo.summary}
    openGraphType="website"
  />,
);
