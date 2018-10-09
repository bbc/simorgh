import React from 'react';
import renderer from 'react-test-renderer';
import Helmet from 'react-helmet';
import MetadataContainer from './index';
import { ServiceContextProvider } from '../../components/ServiceContext';
import { articleDataPersian } from '../Article/fixtureData';
import { shouldShallowMatchSnapshot } from '../../helpers/tests/testHelpers';

const MetadataWithContextAsObject = (service, serviceFixtureData) => {
  const { metadata, promo } = serviceFixtureData;

  renderer.create(
    <ServiceContextProvider service={service}>
      <MetadataContainer
        isAmp={false}
        metadata={metadata}
        promo={promo}
        service={service}
      />
    </ServiceContextProvider>,
  );

  return Helmet.peek();
};

describe('no data', () => {
  shouldShallowMatchSnapshot(
    'should render null',
    <MetadataContainer isAmp={false} metadata={{}} promo={{}} service="" />,
  );
});

const persianFixtureData = {
  htmlAttributes: { lang: 'fa' },
  linkTags: [
    {
      rel: 'canonical',
      href: 'https://www.bbc.com/persian/articles/c0000000028o',
    },
  ],
  metaTags: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1, minimum-scale=1',
    },
    {
      name: 'article:author',
      content: 'https://www.facebook.com/bbcnews',
    },
    {
      name: 'article:modified_time',
      content: '2018-01-01T13:00:00.000Z',
    },
    {
      name: 'article:published_time',
      content: '2018-01-01T12:01:00.000Z',
    },
    { name: 'description', content: 'خلاصه مقاله' },
    { name: 'fb:admins', content: 100004154058350 },
    { name: 'fb:app_id', content: 1609039196070050 },
    { name: 'og:description', content: 'خلاصه مقاله' },
    {
      name: 'og:image',
      content: 'https://news.files.bbci.co.uk/ws/img/logos/og/persian.png',
    },
    { name: 'og:image:alt', content: 'BBC News فارسی' },
    { name: 'og:locale', content: 'fa' },
    { name: 'og:site_name', content: 'BBC News فارسی' },
    { name: 'og:title', content: 'سرصفحه مقاله' },
    { name: 'og:type', content: 'article' },
    {
      name: 'og:url',
      content: 'https://www.bbc.com/persian/articles/c0000000028o',
    },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:creator', content: '@bbcpersian' },
    { name: 'twitter:description', content: 'خلاصه مقاله' },
    { name: 'twitter:image:alt', content: 'BBC News فارسی' },
    {
      name: 'twitter:image:src',
      content: 'https://news.files.bbci.co.uk/ws/img/logos/og/persian.png',
    },
    { name: 'twitter:site', content: '@bbcpersian' },
    { name: 'twitter:title', content: 'سرصفحه مقاله' },
  ],
  title: ['سرصفحه مقاله', ' – ', 'BBC News فارسی'],
};

const doesMatch = (result, fixture) => {
  Object.keys(fixture).forEach(key => {
    expect(result[key]).toEqual(fixture[key]);
  });
};

describe('MetadataContainer deep snapshot', () => {
  // doesMatch(
  //   MetadataWithContextAsObject('news', articleDataNews),
  //   persianFixtureData,
  // );
  it('something', () => {
    doesMatch(
      MetadataWithContextAsObject('persian', articleDataPersian),
      persianFixtureData,
    );
  });
});
