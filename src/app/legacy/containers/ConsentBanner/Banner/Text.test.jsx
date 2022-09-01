import React from 'react';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ARTICLE_PAGE } from '#app/routes/utils/pageTypes';
import { shouldMatchSnapshot } from '#psammead/psammead-test-helpers/src';
import { ServiceContextProvider } from '../../../../contexts/ServiceContext';
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

const bannerTextWithContext = (message, topLevelDomain) => (
  <ServiceContextProvider service="news">
    <RequestContextProvider
      bbcOrigin={`https://www.test.bbc.${topLevelDomain}`}
      id="c0000000000o"
      isAmp={false}
      pageType={ARTICLE_PAGE}
      service="news"
      statusCode={200}
      pathname="/pathname"
    >
      <BannerText {...message} />
    </RequestContextProvider>
  </ServiceContextProvider>
);

describe('Consent Banner Text', () => {
  shouldMatchSnapshot(
    'should correctly render banner text in the UK',
    bannerTextWithContext(bannerMessaging, 'co.uk'),
  );

  shouldMatchSnapshot(
    'should correctly render banner text outside the UK',
    bannerTextWithContext(bannerMessaging, 'com'),
  );

  shouldMatchSnapshot(
    'should correctly render banner text with a link in the UK',
    bannerTextWithContext(bannerWithLinkMessaging, 'co.uk'),
  );

  shouldMatchSnapshot(
    'should correctly render banner text with a link outside the UK',
    bannerTextWithContext(bannerWithLinkMessaging, 'com'),
  );
});
