import React from 'react';
import { storiesOf } from '@storybook/react';
import { RequestContextProvider } from '../../contexts/RequestContext';
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import ConsentBanner from '.';
import AmpDecorator from '../../../../.storybook/helpers/ampDecorator';

const getConsentBanner = platform => (
  <ServiceContextProvider service="news">
    <RequestContextProvider
      platform={platform}
      isUK
      origin="https://www.bbc.co.uk"
      pageType="article"
      id="c0000000000o"
      statsDestination="NEWS_PS_TEST"
      statsPageIdentifier="news.articles.c0000000000o"
    >
      <ConsentBanner />
      This container uses cookies to conditionally render. If you can not see
      the banner above please clear your cookies or view in incognito mode.
    </RequestContextProvider>
  </ServiceContextProvider>
);

storiesOf('Containers|Consent Banner/', module)
  .addDecorator(AmpDecorator)
  .add('amp', () => getConsentBanner('amp'));

storiesOf('Containers|Consent Banner/', module).add('canonical', () =>
  getConsentBanner('canonical'),
);
