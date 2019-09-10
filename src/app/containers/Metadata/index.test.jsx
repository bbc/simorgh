import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import MetadataContainer from './index';
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import { articleDataNews, articleDataPersian } from '../Article/fixtureData';
import services from '../../lib/config/services/index';
import { RequestContextProvider } from '../../contexts/RequestContext';
import frontPageData from '../../../../data/igbo/frontpage/index.json';
import liveRadioPageData from '../../../../data/korean/bbc_korean_radio/liveradio.json';

// eslint-disable-next-line react/prop-types
jest.mock('react-helmet', () => ({ htmlAttributes, ...props }) => (
  <>
    {htmlAttributes && <helmet-html-attributes {...htmlAttributes} />}
    <helmet-head {...props} />
  </>
));

const dotComOrigin = 'https://www.bbc.com';
const dotCoDotUKOrigin = 'https://www.bbc.co.uk';

process.env.SIMORGH_PUBLIC_STATIC_ASSETS_ORIGIN = 'https://foo.com';
process.env.SIMORGH_PUBLIC_STATIC_ASSETS_PATH = '/static';

// eslint-disable-next-line react/prop-types
const getContainer = ({ service, bbcOrigin, platform, data, id, pageType }) => {
  const serviceConfig = services[service];

  return (
    <ServiceContextProvider {...serviceConfig}>
      <RequestContextProvider
        bbcOrigin={bbcOrigin}
        id={id}
        isAmp={platform === 'amp'}
        pageType={pageType}
        service={service}
      >
        <MetadataContainer {...articleDataNews} {...data} />
      </RequestContextProvider>
    </ServiceContextProvider>
  );
};

describe('Metadata Container', () => {
  describe('LinkedData and Metadata components called with correct props', () => {
    shouldMatchSnapshot(
      'should match snapshot for Canonical News & international origin',
      getContainer({
        service: 'news',
        bbcOrigin: dotComOrigin,
        platform: 'canonical',
        data: articleDataNews,
        id: 'c0000000001o',
        pageType: 'article',
      }),
    );

    shouldMatchSnapshot(
      'should match snapshot for AMP News & UK origin',
      getContainer({
        service: 'news',
        bbcOrigin: dotCoDotUKOrigin,
        platform: 'amp',
        data: articleDataNews,
        id: 'c0000000001o',
        pageType: 'article',
      }),
    );

    shouldMatchSnapshot(
      'should match snapshot for Persian News & international origin',
      getContainer({
        service: 'persian',
        bbcOrigin: dotComOrigin,
        platform: 'canonical',
        data: articleDataPersian,
        id: 'c4vlle3q337o',
        pageType: 'article',
      }),
    );

    shouldMatchSnapshot(
      'should match snapshot for Persian News & UK origin',
      getContainer({
        service: 'persian',
        bbcOrigin: dotCoDotUKOrigin,
        platform: 'amp',
        data: articleDataPersian,
        id: 'c4vlle3q337o',
        pageType: 'article',
      }),
    );

    shouldMatchSnapshot(
      'should match snapshot for WS Frontpages',
      getContainer({
        service: 'igbo',
        bbcOrigin: dotComOrigin,
        platform: 'canonical',
        data: frontPageData,
        id: null,
        pageType: 'frontPage',
      }),
    );
  });

  shouldMatchSnapshot(
    'should match snapshot for WS Media liveradio',
    getContainer({
      service: 'korean',
      bbcOrigin: dotComOrigin,
      platform: 'canonical',
      data: liveRadioPageData,
      id: null,
      pageType: 'media',
    }),
  );
});
