import React from 'react';
import Metadata from './index';
import { shouldShallowMatchSnapshot } from '../../../testHelpers';

const metadataSnapshotTest = (testDescription, overrideProps) =>
  describe(testDescription, () => {
    const defaultProps = {
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
      articleAuthor: 'BBC News',
      articleSection: null,
      appleTouchIcon: 'https://foo.com/static/news/image.png',
      brandName: 'BBC News',
      canonicalLink: 'https://www.bbc.com/news/articles/c0000000001o',
      defaultImage: 'https://www.bbc.com/news/image.png',
      defaultImageAltText: 'BBC News',
      description: 'This is a description',
      facebookAdmin: 101010,
      facebookAppId: 202020,
      lang: 'en-GB',
      locale: 'en_GB',
      metaTags: ['tagA', 'tagB'],
      themeColor: '#B80000',
      timeLastPublished: 1539188371344,
      timeFirstPublished: 1514811600000,
      title: 'An article title',
      twitterCreator: '@BBCNews',
      twitterSite: '@BBCNews',
    };

    shouldShallowMatchSnapshot(
      'should render correctly',
      <Metadata {...defaultProps} {...overrideProps} />,
    );
  });

describe.only('Metadata', () => {
  metadataSnapshotTest('News article');
  metadataSnapshotTest('News AMP article', { isAmp: true });

  const persianOverrides = {
    articleAuthor: 'BBC News فارسی',
    brandName: 'BBC News فارسی',
    lang: 'fa',
    locale: 'fa',
    title: 'پهپادی که برایتان قهوه می‌آورد',
    twitterCreator: '@bbcpersian',
    twitterSite: '@bbcpersian',
  };
  metadataSnapshotTest('Persian article', persianOverrides);
  metadataSnapshotTest('Persian AMP article', {
    ...persianOverrides,
    isAmp: true,
  });
  metadataSnapshotTest('articleSection is not null', {
    articleSection: 'Politics',
  });
});
