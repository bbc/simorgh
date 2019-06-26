import React from 'react';
import { shouldMatchSnapshot } from '../../../../testHelpers';
import { RequestContextProvider } from '../../../contexts/RequestContext';
import BannerText from './Text';

const bannerMessaging = {
  uk: {
    first: 'Just some text',
  },
  international: {
    first: 'Just some international text',
  },
};

const bannerWithLinkMessaging = {
  uk: {
    first: 'Some text ',
    linkText: 'with a link',
    linkUrl: 'https://www.bbc.co.uk',
    last: ' followed by text.',
  },
  international: {
    first: 'Some international text',
    linkText: 'with an international link',
    linkUrl: 'https://www.bbc.com',
    last: ' followed by international text.',
  },
};

describe('Consent Banner Text', () => {
  shouldMatchSnapshot(
    'should correctly render banner text in the UK',
    <RequestContextProvider
      isUK
      lang="en-gb"
      origin="https://www.bbc.co.uk"
      id="c0000000000o"
      pageType="article"
      platform="canonical"
      statsDestination="NEWS_PS_TEST"
      statsPageIdentifier="news.articles.c0000000000o"
    >
      <BannerText {...bannerMessaging} />
    </RequestContextProvider>,
  );

  shouldMatchSnapshot(
    'should correctly render banner text outside the UK',
    <RequestContextProvider
      isUK={false}
      lang="en-gb"
      origin="https://www.bbc.com"
      id="c0000000000o"
      pageType="article"
      platform="canonical"
      statsDestination="NEWS_PS_TEST"
      statsPageIdentifier="news.articles.c0000000000o"
    >
      <BannerText {...bannerMessaging} />
    </RequestContextProvider>,
  );

  shouldMatchSnapshot(
    'should correctly render banner text with a link in the UK',
    <RequestContextProvider
      isUK
      lang="en-gb"
      origin="https://www.bbc.co.uk"
      id="c0000000000o"
      pageType="article"
      platform="canonical"
      statsDestination="NEWS_PS_TEST"
      statsPageIdentifier="news.articles.c0000000000o"
    >
      <BannerText {...bannerWithLinkMessaging} />
    </RequestContextProvider>,
  );

  shouldMatchSnapshot(
    'should correctly render banner text with a link outside the UK',
    <RequestContextProvider
      isUK={false}
      lang="en-gb"
      origin="https://www.bbc.com"
      id="c0000000000o"
      pageType="article"
      platform="canonical"
      statsDestination="NEWS_PS_TEST"
      statsPageIdentifier="news.articles.c0000000000o"
    >
      <BannerText {...bannerWithLinkMessaging} />
    </RequestContextProvider>,
  );
});
