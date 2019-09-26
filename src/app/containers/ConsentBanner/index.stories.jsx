import React from 'react';
import { storiesOf } from '@storybook/react';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import ConsentBanner from '.';
import AmpDecorator from '../../../../.storybook/helpers/ampDecorator';

const getConsentBanner = platform => (
  <ServiceContextProvider service="news">
    <RequestContextProvider
      platform={platform}
      isUK
      isAmp={platform === 'amp'}
      origin="https://www.bbc.co.uk"
      pageType="article"
      id="c0000000000o"
      service="news"
      statsDestination="NEWS_PS_TEST"
      statsPageIdentifier="news.articles.c0000000000o"
    >
      <ConsentBanner />
      This container uses cookies to conditionally render. If you can not see
      the banner above please clear your cookies or view in incognito mode.
    </RequestContextProvider>
  </ServiceContextProvider>
);

const stories = storiesOf('Containers|Consent Banner/', module).addParameters({
  chromatic: { disable: true },
});

stories.addDecorator(AmpDecorator).add('amp', () => getConsentBanner('amp'));
stories.add('canonical', () => getConsentBanner('canonical'));
