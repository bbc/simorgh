import React, { useContext } from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import {
  AMP_ACCESS_JS,
  AMP_ADS_JS,
} from '@bbc/psammead-assets/amp-boilerplate';
import {
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MAX,
} from '@bbc/gel-foundations/breakpoints';

import { GEL_SPACING_DBL, GEL_SPACING } from '@bbc/gel-foundations/spacings';
import { C_LUNAR_LIGHT, C_RHINO } from '@bbc/psammead-styles/colours';
import pathOr from 'ramda/src/pathOr';
import { getMinion } from '@bbc/gel-foundations/typography';
import { getSansRegular } from '@bbc/psammead-styles/font-styles';
import { ServiceContext } from '#contexts/ServiceContext';

const FullWidthWrapper = styled.div`
  background-color: ${C_LUNAR_LIGHT};
`;

const StyledWrapper = styled.div`
  margin: 0 auto; /* To centre page layout for Group 4+ */
  text-align: center;
  padding-bottom: ${GEL_SPACING};

  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    padding-bottom: ${GEL_SPACING_DBL};
    max-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN};
  }
`;

const StyledAd = styled.div`
  display: inline-block;
`;

const StyledLink = styled.a.attrs({ tabIndex: '-1' })`
  ${({ script }) => script && getMinion(script)};
  ${({ service }) => getSansRegular(service)}
  color: ${C_RHINO};
  text-decoration: none;
  text-transform: uppercase;
  display: block;
  padding: ${GEL_SPACING} 0;
  
  text-align: ${({ dir }) => (dir === 'ltr' ? `right` : `left`)};

  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    padding-top: ${GEL_SPACING_DBL};
  }
  
  &:hover {
    text-decoration: underline;
  }
`;

const constructAdJsonData = ({ service }) => ({
  targeting: {
    slot: 'leaderboard',
    asset_type: 'index',
    channel: service,
  },
});

const ampAdPropsMobile = ({ service }) => ({
  'data-block-on-consent': 'default',
  'data-npa-on-unknown-consent': 'true',
  media: `(max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX})`,
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
  'data-block-on-consent': 'default',
  'data-npa-on-unknown-consent': 'true',
  media: `(min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN})`,
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
  authorizationFallbackResponse: {
    error: true,
  },
});

const LABEL_LINK = 'https://www.bbc.com/usingthebbc/cookies/';

export const AMP_ACCESS_FETCH = service => {
  const togglesEndpoint = `${process.env.SIMORGH_TOGGLES_URL}/toggles?application=simorgh&service=${service}`;

  return (
    <script id="amp-access" type="application/json">
      {JSON.stringify(AMP_ACCESS_DATA(togglesEndpoint))}
    </script>
  );
};

// eslint-disable-next-line react/prop-types
const AmpAd = () => {
  const { ads, dir, script, service } = useContext(ServiceContext);
  const label = pathOr('Advertisement', ['advertisementLabel'], ads);

  return (
    <FullWidthWrapper>
      <StyledWrapper>
        <Helmet>
          {AMP_ADS_JS}
          {AMP_ACCESS_JS}
          {AMP_ACCESS_FETCH(service)}
        </Helmet>
        <div amp-access="toggles.ads.enabled" amp-access-hide="true">
          <StyledAd>
            <StyledLink
              href={LABEL_LINK}
              script={script}
              service={service}
              dir={dir}
            >
              {label}
            </StyledLink>
            <amp-ad {...ampAdPropsMobile({ service })} />
            <amp-ad {...ampAdPropsDesktop({ service })} />
          </StyledAd>
        </div>
      </StyledWrapper>
    </FullWidthWrapper>
  );
};

export default AmpAd;
