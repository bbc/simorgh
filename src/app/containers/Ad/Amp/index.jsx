import React, { useContext } from 'react';
import { oneOf } from 'prop-types';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import {
  AMP_ACCESS_JS,
  AMP_ADS_JS,
} from '@bbc/psammead-assets/amp-boilerplate';
import { GEL_GROUP_4_SCREEN_WIDTH_MIN } from '@bbc/gel-foundations/breakpoints';

import { GEL_SPACING_DBL, GEL_SPACING } from '@bbc/gel-foundations/spacings';
import { C_LUNAR_LIGHT, C_RHINO } from '@bbc/psammead-styles/colours';
import pathOr from 'ramda/src/pathOr';
import { getMinion } from '@bbc/gel-foundations/typography';
import { getSansRegular } from '@bbc/psammead-styles/font-styles';
import { ServiceContext } from '#contexts/ServiceContext';
import getAdsAriaLabel from '../utilities/getAdsAriaLabel';
import AdSlot from './AdSlot';

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

const AMP_ACCESS_DATA = endpoint => ({
  authorization: endpoint,
  noPingback: true,
  authorizationFallbackResponse: {
    error: true,
  },
});

const LABEL_LINK = 'https://www.bbc.com/usingthebbc/cookies/';

export const AMP_ACCESS_FETCH = service => {
  const togglesEndpoint = `${process.env.SIMORGH_CONFIG_URL}?application=simorgh&service=${service}`;

  return (
    <script id="amp-access" type="application/json">
      {JSON.stringify(AMP_ACCESS_DATA(togglesEndpoint))}
    </script>
  );
};

const AmpAd = ({ slotType }) => {
  const { ads, dir, script, service } = useContext(ServiceContext);
  const label = pathOr('Advertisement', ['advertisementLabel'], ads);
  const ariaLabel = getAdsAriaLabel(label, dir, slotType);

  return (
    // eslint-disable-next-line jsx-a11y/no-redundant-roles
    <section
      amp-access="toggles.ads.enabled"
      amp-access-hide="true"
      aria-hidden="true"
      aria-label={ariaLabel}
      role="region"
    >
      <FullWidthWrapper>
        <StyledWrapper>
          <Helmet>
            {AMP_ADS_JS}
            {AMP_ACCESS_JS}
            {AMP_ACCESS_FETCH(service)}
          </Helmet>

          <StyledAd>
            <StyledLink
              href={LABEL_LINK}
              script={script}
              service={service}
              dir={dir}
            >
              {label}
            </StyledLink>
            <AdSlot service={service} slotType={slotType} />
          </StyledAd>
        </StyledWrapper>
      </FullWidthWrapper>
    </section>
  );
};

AmpAd.propTypes = {
  slotType: oneOf(['leaderboard', 'mpu']).isRequired,
};

export default AmpAd;
