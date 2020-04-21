import React from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import {
  AMP_ACCESS_JS,
  AMP_ADS_JS,
} from '@bbc/psammead-assets/amp-boilerplate';
import {
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
} from '@bbc/gel-foundations/breakpoints';
import {
  GEL_SPACING_TRPL,
  GEL_SPACING_QUAD,
} from '@bbc/gel-foundations/spacings';

const StyledAd = styled.div`
  /* To centre page layout for Group 4+ */
  margin: 0 auto;
  width: 100%; /* Needed for IE11 */
  text-align: center;

  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    margin-top: ${GEL_SPACING_TRPL};
  }

  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    margin-top: ${GEL_SPACING_QUAD};
    max-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN};
  }
`;

const constructAdJsonData = ({ service }) => {
  const data = {
    targeting: {
      slot: 'leaderboard',
      asset_type: 'index',
      channel: service,
    },
  };

  return data;
};

const ampAdPropsMobile = ({ service }) => ({
  media: '(max-width: 599px)',
  type: 'doubleclick',
  width: '320',
  height: '50',
  'data-multi-size': '320x50,300x50',
  'data-slot': '/4817/bbccom.test.site.amp.news',
  'data-amp-slot-index': '0',
  'data-a4a-upgrade-type': 'amp-ad-network-doubleclick-impl',
  json: JSON.stringify(constructAdJsonData({ service })),
});

const ampAdPropsDesktop = ({ service }) => ({
  media: '(min-width: 600px)',
  type: 'doubleclick',
  width: '970',
  height: '250',
  'data-multi-size': '970x250,728x90',
  'data-slot': '/4817/bbccom.test.site.amp.news',
  'data-amp-slot-index': '0',
  'data-a4a-upgrade-type': 'amp-ad-network-doubleclick-impl',
  json: JSON.stringify(constructAdJsonData({ service })),
});

const AMP_ACCESS_DATA = endpoint => ({
  authorization: endpoint,
  noPingback: true,
});

const AMP_ACCESS_FETCH = service => {
  const togglesEndpoint = `${process.env.SIMORGH_TOGGLES_URL}/toggles?application=simorgh&service=${service}&geoiplookup=true`;

  return (
    <script id="amp-access" type="application/json">
      {JSON.stringify(AMP_ACCESS_DATA(togglesEndpoint))}
    </script>
  );
};

// eslint-disable-next-line react/prop-types
const AmpAd = ({ service }) => {
  return (
    <>
      <Helmet>
        {AMP_ADS_JS}
        {AMP_ACCESS_JS}
        {AMP_ACCESS_FETCH(service)}
      </Helmet>
      <div
        amp-access="toggles.ads.enabled AND geoIp.advertiseCombined"
        amp-access-hide="true"
      >
        <StyledAd>
          <amp-ad {...ampAdPropsMobile({ service })}>
            <amp-img
              placeholder
              width="320"
              height="50"
              src="https://via.placeholder.com/320x50"
              layout="responsive"
            />
          </amp-ad>
          <amp-ad {...ampAdPropsDesktop({ service })}>
            <amp-img
              placeholder
              width="970"
              height="250"
              src="https://via.placeholder.com/970x250"
              layout="responsive"
            />
          </amp-ad>
        </StyledAd>
      </div>
    </>
  );
};

export default AmpAd;
