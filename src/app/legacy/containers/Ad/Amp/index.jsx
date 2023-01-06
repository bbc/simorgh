import React, { useContext } from 'react';
import { oneOf } from 'prop-types';
import styled from '@emotion/styled';
import { Helmet } from 'react-helmet';
import pathOr from 'ramda/src/pathOr';
import { RequestContext } from '#contexts/RequestContext';
import {
  AMP_ACCESS_JS,
  AMP_ADS_JS,
} from '#psammead/psammead-assets/src/amp-boilerplate';
import { GEL_SPACING } from '#psammead/gel-foundations/src/spacings';
import { C_GREY_3, C_RHINO } from '#psammead/psammead-styles/src/colours';
import { getMinion } from '#psammead/gel-foundations/src/typography';
import { getSansRegular } from '#psammead/psammead-styles/src/font-styles';
import { ServiceContext } from '../../../../contexts/ServiceContext';
import getAdsAriaLabel from '../utilities/getAdsAriaLabel';
import AdSlot from './AdSlot';
import { ampLeaderboardStyles, ampMpuStyles } from '../utilities/adSlotStyles';

// styled-components removes non-standard attributes (such as AMP attributes) on
// server rendering. spreading props like this allows us to add AMP attributes
// to the element.
const AccessDiv = props => <div {...props} />;

const AdSection = styled.section`
  background-color: ${C_GREY_3};
`;

const AdContainer = styled.div`
  ${({ slotType }) =>
    slotType === 'mpu' ? ampMpuStyles : ampLeaderboardStyles}
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

const StyledLink = styled.a`
  ${({ script }) => script && getMinion(script)}
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

const AdContent = props => {
  // eslint-disable-next-line react/prop-types
  const { script, service, dir, label, slotType, pageType } = props;
  return (
    <>
      <StyledLink
        href={LABEL_LINK}
        script={script}
        service={service}
        dir={dir}
        tabIndex="-1"
      >
        {label}
      </StyledLink>
      <AdSlot service={service} slotType={slotType} pageType={pageType} />
    </>
  );
};

const AdWithoutPlaceholder = props => {
  // eslint-disable-next-line react/prop-types
  const { ariaLabel, slotType } = props;
  return (
    <DisplayWrapper amp-access="toggles.ads.enabled" amp-access-hide="true">
      <AdSection
        aria-label={ariaLabel}
        role="region"
        data-e2e="advertisement"
        aria-hidden="true"
      >
        <AdContainer slotType={slotType}>
          <StyledWrapper>
            <AdContent {...props} />
          </StyledWrapper>
        </AdContainer>
      </AdSection>
    </DisplayWrapper>
  );
};

const AdWithPlaceholder = props => {
  // eslint-disable-next-line react/prop-types
  const { ariaLabel, slotType } = props;
  return (
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
            <AdContent {...props} />
          </DisplayWrapper>
        </StyledWrapper>
      </AdContainer>
    </AdSection>
  );
};

const AmpAd = ({ slotType }) => {
  const { translations, dir, script, service, showAdPlaceholder } =
    useContext(ServiceContext);
  const { pageType } = useContext(RequestContext);
  const label = pathOr(
    'Advertisement',
    ['ads', 'advertisementLabel'],
    translations,
  );
  const ariaLabel = getAdsAriaLabel(label, dir, slotType);

  const Advert = showAdPlaceholder ? AdWithPlaceholder : AdWithoutPlaceholder;

  return (
    <>
      <Helmet>
        {AMP_ADS_JS}
        {AMP_ACCESS_JS}
        {AMP_ACCESS_FETCH(service)}
      </Helmet>
      <Advert
        service={service}
        script={script}
        dir={dir}
        label={label}
        pageType={pageType}
        ariaLabel={ariaLabel}
        slotType={slotType}
      />
    </>
  );
};

AmpAd.propTypes = {
  slotType: oneOf(['leaderboard', 'mpu']).isRequired,
};

export default AmpAd;
