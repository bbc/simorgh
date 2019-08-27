import React from 'react';
import { shouldMatchSnapshot } from '../../../../testHelpers';
import { RequestContextProvider } from '../../../contexts/RequestContext';
import BannerText from './Text';
import { ServiceContextProvider } from '../../../contexts/ServiceContext';

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
    <ServiceContextProvider service="news">
      <RequestContextProvider
        bbcOrigin="https://www.test.bbc.co.uk"
        id="c0000000000o"
        isAmp={false}
        pageType="article"
        service="news"
      >
        <BannerText {...bannerMessaging} />
      </RequestContextProvider>
    </ServiceContextProvider>,
  );

  shouldMatchSnapshot(
    'should correctly render banner text outside the UK',
    <ServiceContextProvider service="news">
      <RequestContextProvider
        bbcOrigin="https://www.test.bbc.com"
        id="c0000000000o"
        isAmp={false}
        pageType="article"
        service="news"
      >
        <BannerText {...bannerMessaging} />
      </RequestContextProvider>
    </ServiceContextProvider>,
  );

  shouldMatchSnapshot(
    'should correctly render banner text with a link in the UK',
    <ServiceContextProvider service="news">
      <RequestContextProvider
        bbcOrigin="https://www.test.bbc.co.uk"
        id="c0000000000o"
        isAmp={false}
        pageType="article"
        service="news"
      >
        <BannerText {...bannerWithLinkMessaging} />
      </RequestContextProvider>
    </ServiceContextProvider>,
  );

  shouldMatchSnapshot(
    'should correctly render banner text with a link outside the UK',
    <ServiceContextProvider service="news">
      <RequestContextProvider
        bbcOrigin="https://www.test.bbc.com"
        id="c0000000000o"
        isAmp={false}
        pageType="article"
        service="news"
      >
        <BannerText {...bannerWithLinkMessaging} />
      </RequestContextProvider>
    </ServiceContextProvider>,
  );
});
