/** @jsxRuntime classic */
/** @jsx jsx */
/* @jsxFrag React.Fragment */
import { jsx } from '@emotion/react';
import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import pathOr from 'ramda/src/pathOr';
import { RequestContext } from '#contexts/RequestContext';
import {
  AMP_ACCESS_JS,
  AMP_ADS_JS,
} from '#psammead/psammead-assets/src/amp-boilerplate';
import { ServiceContext } from '../../../contexts/ServiceContext';
import getAdsAriaLabel from '../utilities/getAdsAriaLabel';
import AdSlot from './AdSlot';
import styles, {
  AdSection,
  DisplayWrapper,
  StyledWrapper,
} from './index.styles';
import { Services } from '../../../models/types/global';
import { AdProps } from '../types';
import adSlotStyles from '../utilities/adSlot.styles';

const AMP_ACCESS_DATA = (endpoint: string) => ({
  authorization: endpoint,
  noPingback: true,
  authorizationFallbackResponse: {
    error: true,
  },
});

const LABEL_LINK = 'https://www.bbc.com/usingthebbc/cookies/';

export const AMP_ACCESS_FETCH = (service: Services) => {
  const togglesEndpoint = `${process.env.SIMORGH_CONFIG_URL}?application=simorgh&service=${service}`;

  return (
    <script id="amp-access" type="application/json">
      {JSON.stringify(AMP_ACCESS_DATA(togglesEndpoint))}
    </script>
  );
};

interface AdContentProps {
  dir: Direction;
  label: string;
  ariaLabel?: string;
  slotType: SlotType;
  pageType: PageTypes;
  service: Services;
}

const AdContent = ({
  service,
  dir,
  label,
  slotType,
  pageType,
}: AdContentProps) => {
  return (
    <>
      <a
        css={[styles.link, { textAlign: dir === 'ltr' ? 'right' : 'left' }]}
        dir={dir}
        href={LABEL_LINK}
        tabIndex={-1}
      >
        {label}
      </a>
      <AdSlot service={service} slotType={slotType} pageType={pageType} />
    </>
  );
};

const AdWithoutPlaceholder = ({
  dir,
  label,
  slotType,
  pageType,
  service,
  ariaLabel,
}: AdContentProps) => {
  return (
    <DisplayWrapper amp-access="toggles.ads.enabled" amp-access-hide="true">
      <AdSection
        aria-label={ariaLabel}
        role="region"
        data-e2e="advertisement"
        aria-hidden="true"
      >
        <div
          css={
            slotType === 'mpu'
              ? adSlotStyles.ampMpu
              : adSlotStyles.ampLeaderboard
          }
        >
          <StyledWrapper>
            <AdContent
              dir={dir}
              label={label}
              pageType={pageType}
              service={service}
              slotType={slotType}
            />
          </StyledWrapper>
        </div>
      </AdSection>
    </DisplayWrapper>
  );
};

const AdWithPlaceholder = ({
  dir,
  label,
  slotType,
  pageType,
  service,
  ariaLabel,
}: AdContentProps) => {
  return (
    <AdSection
      aria-label={ariaLabel}
      role="region"
      data-e2e="advertisement"
      aria-hidden="true"
    >
      <div
        css={
          slotType === 'mpu' ? adSlotStyles.ampMpu : adSlotStyles.ampLeaderboard
        }
      >
        <StyledWrapper>
          <DisplayWrapper
            amp-access="toggles.ads.enabled"
            amp-access-hide="true"
          >
            <AdContent
              dir={dir}
              label={label}
              pageType={pageType}
              service={service}
              slotType={slotType}
            />
          </DisplayWrapper>
        </StyledWrapper>
      </div>
    </AdSection>
  );
};

const AmpAd = ({ slotType }: AdProps) => {
  const { translations, dir, service, showAdPlaceholder } =
    useContext(ServiceContext);
  const { pageType } = useContext(RequestContext);
  const label = pathOr(
    'Advertisement',
    ['ads', 'advertisementLabel'],
    translations,
  );
  const ariaLabel = getAdsAriaLabel({ label, dir, slotType });

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
        dir={dir}
        label={label}
        pageType={pageType}
        ariaLabel={ariaLabel}
        slotType={slotType}
      />
    </>
  );
};

export default AmpAd;
