import React, { useContext } from 'react';
import { oneOf } from 'prop-types';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import {
  AMP_ACCESS_JS,
  AMP_ADS_JS,
} from '@bbc/psammead-assets/amp-boilerplate';
import { GEL_SPACING } from '@bbc/gel-foundations/spacings';
import { C_LUNAR_LIGHT, C_RHINO } from '@bbc/psammead-styles/colours';
import pathOr from 'ramda/src/pathOr';
import { getMinion } from '@bbc/gel-foundations/typography';
import { getSansRegular } from '@bbc/psammead-styles/font-styles';
import { ServiceContext } from '#contexts/ServiceContext';
import useToggle from '#hooks/useToggle';
import getAdsAriaLabel from '../utilities/getAdsAriaLabel';
import AdSlot from './AdSlot';
import { ampLeaderboardStyles, ampMpuStyles } from '../utilities/adSlotStyles';

// styled-components removes non-standard attributes (such as AMP attributes) on
// server rendering. spreading props like this allows us to add AMP attributes
// to the element.
const AccessDiv = props => <div {...props} />;

const AdSection = styled.section`
  background-color: ${C_LUNAR_LIGHT};
  margin-top: ${GEL_SPACING};
`;

const AdContainer = styled.div`
  ${({ slotType }) =>
    slotType === 'mpu' ? ampMpuStyles : ampLeaderboardStyles};
`;

const StyledWrapper = styled.div`
  margin: 0 auto; /* To centre page layout for Group 4+ */
  text-align: center;
`;

// amp-geo adds geo group classes to the body of the document depending on
// the user's location. It removes the `amp-geo-pending` class when geolocation
// data is available.
// setting display: none ensures ad requests within this component are not made.
const DisplayWrapper = styled(AccessDiv)`
  .amp-geo-pending &,
  .amp-geo-group-gbOrUnknown & {
    display: none;
    visibility: hidden;
  }
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
  const { translations, dir, script, service } = useContext(ServiceContext);
  const label = pathOr(
    'Advertisement',
    ['ads', 'advertisementLabel'],
    translations,
  );
  const ariaLabel = getAdsAriaLabel(label, dir, slotType);
  const { enabled: ampAdsEnabled } = useToggle('ampAds');

  if (!ampAdsEnabled) {
    return null;
  }

  return (
    // eslint-disable-next-line jsx-a11y/no-redundant-roles
    <>
      <Helmet>
        {AMP_ADS_JS}
        {AMP_ACCESS_JS}
        {AMP_ACCESS_FETCH(service)}
      </Helmet>
      <AdSection
        aria-label={ariaLabel}
        role="region"
        data-e2e="advertisement"
        aria-hidden="true"
      >
        <AdContainer slotType={slotType}>
          <StyledWrapper>
            <DisplayWrapper
              amp-access="toggles.ads.enabled"
              amp-access-hide="true"
            >
              <StyledLink
                href={LABEL_LINK}
                script={script}
                service={service}
                dir={dir}
              >
                {label}
              </StyledLink>
              <AdSlot service={service} slotType={slotType} />
            </DisplayWrapper>
          </StyledWrapper>
        </AdContainer>
      </AdSection>
    </>
  );
};

AmpAd.propTypes = {
  slotType: oneOf(['leaderboard', 'mpu']).isRequired,
};

export default AmpAd;
