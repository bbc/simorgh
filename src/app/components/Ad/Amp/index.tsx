/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { RequestContext } from '#contexts/RequestContext';
import {
  AMP_ACCESS_JS,
  AMP_ADS_JS,
} from '#psammead/psammead-assets/src/amp-boilerplate';
import { Services } from '#app/models/types/global';
import { ServiceContext } from '../../../contexts/ServiceContext';
import getAdsAriaLabel from '../utilities/getAdsAriaLabel';
import AdSlot from './AdSlot';
import styles from './index.styles';
import { AmpAdContentProps, AmpAdProps, AdProps } from '../types';

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

const AdContent = ({
  service,
  dir,
  label,
  slotType,
  pageType,
}: AmpAdContentProps) => {
  const linkCss = [
    styles.link,
    dir === 'ltr' ? styles.ltrLink : styles.rtlLink,
  ];

  return (
    <React.Fragment>
      <a css={linkCss} href={LABEL_LINK} tabIndex={-1}>
        {label}
      </a>
      <AdSlot service={service} slotType={slotType} pageType={pageType} />
    </React.Fragment>
  );
};

const AdWithoutPlaceholder = ({
  ariaLabel,
  slotType,
  service,
  dir,
  label,
  pageType,
}: AmpAdProps) => {
  return (
    <div
      css={styles.ampGeo}
      amp-access="toggles.ads.enabled"
      amp-access-hide="true"
    >
      <section
        css={styles.section}
        aria-label={ariaLabel}
        role="region"
        data-e2e="advertisement"
        aria-hidden="true"
      >
        <div css={slotType === 'mpu' ? styles.mpu : styles.leaderboard}>
          <div css={styles.wrapper}>
            <AdContent
              service={service}
              dir={dir}
              label={label}
              pageType={pageType}
              slotType={slotType}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

const AdWithPlaceholder = ({
  ariaLabel,
  slotType,
  service,
  dir,
  label,
  pageType,
}: AmpAdProps) => {
  return (
    <section
      css={styles.section}
      aria-label={ariaLabel}
      role="region"
      data-e2e="advertisement"
      aria-hidden="true"
    >
      <div css={slotType === 'mpu' ? styles.mpu : styles.leaderboard}>
        <div css={styles.wrapper}>
          <div
            css={styles.ampGeo}
            amp-access="toggles.ads.enabled"
            amp-access-hide="true"
          >
            <AdContent
              service={service}
              dir={dir}
              label={label}
              pageType={pageType}
              slotType={slotType}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const AmpAd = ({ slotType }: AdProps) => {
  const { translations, dir, service, showAdPlaceholder } =
    useContext(ServiceContext);
  const { pageType } = useContext(RequestContext);
  const label = translations?.ads?.advertisementLabel || 'Advertisement';

  const ariaLabel = getAdsAriaLabel(label, dir, slotType);

  const Advert = showAdPlaceholder ? AdWithPlaceholder : AdWithoutPlaceholder;

  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};

export default AmpAd;
