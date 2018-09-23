import React from 'react';
import Metadata from './index';
import { shouldShallowMatchSnapshot } from '../../helpers/tests/testHelpers';

const metadataSnapshotTest = (
  testDescription,
  amp,
  articleAuthor,
  articleSection,
  canonicalLink,
  defaultImage,
  defaultImageAltText,
  description,
  lang,
  locale,
  metaTags,
  opengraphSiteName,
  timeLastUpdated,
  timeFirstPublished,
  title,
  twitterCreator,
  twitterSite,
) =>
  describe(testDescription, () => {
    const metadataProps = {
      amp,
      articleAuthor,
      articleSection,
      canonicalLink,
      defaultImage,
      defaultImageAltText,
      description,
      lang,
      locale,
      metaTags,
      opengraphSiteName,
      timeLastUpdated,
      timeFirstPublished,
      title,
      twitterCreator,
      twitterSite,
    };

    shouldShallowMatchSnapshot(
      'should render correctly',
      <Metadata {...metadataProps} />,
    );
  });

describe('Metadata', () => {
  metadataSnapshotTest(
    'News article',
    false,
    'BBC News',
    null,
    'https://www.bbc.com/news/articles/c0000000001o',
    'https://www.bbc.com/news/image.png',
    'BBC News',
    'This is a description',
    'en-GB',
    'en_GB',
    ['tagA', 'tagB'],
    'BBC News',
    1514811600000,
    1514811600000,
    'An article title',
    '@BBCNews',
    '@BBCNews',
  );

  metadataSnapshotTest(
    'News AMP article',
    true,
    'BBC News',
    null,
    'https://www.bbc.com/news/articles/amp/c0000000001o',
    'https://www.bbc.com/news/image.png',
    'BBC News',
    'This is a description',
    'en-GB',
    'en_GB',
    ['tagA', 'tagB'],
    'BBC News',
    1514811600000,
    1514811600000,
    'An article title',
    '@BBCNews',
    '@BBCNews',
  );

  metadataSnapshotTest(
    'Persian article',
    false,
    'BBC News فارسی',
    null,
    'https://www.bbc.com/persian/articles/c0000000028o',
    'https://www.bbc.com/persian/image.png',
    'BBC News فارسی',
    'This is a description',
    'fa',
    'fa',
    ['tagA', 'tagB'],
    'BBC News فارسی',
    1514811600000,
    1514811600000,
    'پهپادی که برایتان قهوه می‌آورد',
    '@bbcpersian',
    '@bbcpersian',
  );

  metadataSnapshotTest(
    'Persian AMP article',
    true,
    'BBC News فارسی',
    null,
    'https://www.bbc.com/persian/articles/amp/c0000000028o',
    'https://www.bbc.com/persian/image.png',
    'BBC News فارسی',
    'This is a description',
    'fa',
    'fa',
    ['tagA', 'tagB'],
    'BBC News فارسی',
    1514811600000,
    1514811600000,
    'پهپادی که برایتان قهوه می‌آورد',
    '@bbcpersian',
    '@bbcpersian',
  );

  metadataSnapshotTest(
    'articleSection is not null',
    false,
    'BBC News',
    'Politics',
    'https://www.bbc.com/news/articles/c0000000001o',
    'https://www.bbc.com/news/image.png',
    'BBC News',
    'This is a description',
    'en-GB',
    'en_GB',
    ['tagA', 'tagB'],
    'BBC News',
    1514811600000,
    1514811600000,
    'An article title',
    '@BBCNews',
    '@BBCNews',
  );
});
