import React from 'react';
import Metadata from './index';
import { shouldShallowMatchSnapshot } from '../../helpers/tests/testHelpers';

const metadataSnapshotTest = (
  testDescription,
  isAmp,
  articleAuthor,
  articleSection,
  brandName,
  canonicalLink,
  defaultImage,
  defaultImageAltText,
  description,
  facebookAdmin,
  facebookAppID,
  lang,
  locale,
  metaTags,
  timeLastUpdated,
  timeFirstPublished,
  title,
  twitterCreator,
  twitterSite,
) =>
  describe(testDescription, () => {
    const metadataProps = {
      isAmp,
      articleAuthor,
      articleSection,
      brandName,
      canonicalLink,
      defaultImage,
      defaultImageAltText,
      description,
      facebookAdmin,
      facebookAppID,
      lang,
      locale,
      metaTags,
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
    'BBC News',
    'https://www.bbc.com/news/articles/c0000000001o',
    'https://www.bbc.com/news/image.png',
    'BBC News',
    'This is a description',
    101010,
    202020,
    'en-GB',
    'en_GB',
    ['tagA', 'tagB'],
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
    'BBC News',
    'https://www.bbc.com/news/articles/c0000000001o.amp',
    'https://www.bbc.com/news/image.png',
    'BBC News',
    'This is a description',
    101010,
    202020,
    'en-GB',
    'en_GB',
    ['tagA', 'tagB'],
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
    'BBC News فارسی',
    'https://www.bbc.com/persian/articles/cwv2xv848j5o',
    'https://www.bbc.com/persian/image.png',
    'BBC News فارسی',
    'This is a description',
    101010,
    202020,
    'fa',
    'fa',
    ['tagA', 'tagB'],
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
    'BBC News فارسی',
    'https://www.bbc.com/persian/articles/cwv2xv848j5o.amp',
    'https://www.bbc.com/persian/image.png',
    'BBC News فارسی',
    'This is a description',
    101010,
    202020,
    'fa',
    'fa',
    ['tagA', 'tagB'],
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
    'BBC News',
    'https://www.bbc.com/news/articles/c0000000001o',
    'https://www.bbc.com/news/image.png',
    'BBC News',
    'This is a description',
    101010,
    202020,
    'en-GB',
    'en_GB',
    ['tagA', 'tagB'],
    1514811600000,
    1514811600000,
    'An article title',
    '@BBCNews',
    '@BBCNews',
  );
});
