import { use } from 'react';
import pathOr from 'ramda/src/pathOr';
import { Helmet } from 'react-helmet';

import { getEnvConfig } from '#app/lib/utilities/getEnvConfig';
import { RequestContext } from '#contexts/RequestContext';
import {
  AMP_ACCESS_JS,
  AMP_ADS_JS,
} from '#psammead/psammead-assets/src/amp-boilerplate';
import { ServiceContext } from '../../../contexts/ServiceContext';
import type {
  Direction,
  PageTypes,
  Services,
} from '../../../models/types/global';
import { type AdProps, SLOT_TYPES, type SlotType } from '../types';
import adStyles from '../utilities/adSlot.styles';
import getAdsAriaLabel from '../utilities/getAdsAriaLabel';
import AdSlot from './AdSlot';
import styles from './index.styles';

const AMP_ACCESS_DATA = (endpoint: string) => ({
  authorization: endpoint,
  noPingback: true,
  authorizationFallbackResponse: {
    error: true,
  },
});

const LABEL_LINK = 'https://www.bbc.com/usingthebbc/cookies/';

export const AMP_ACCESS_FETCH = (service: Services) => {
  const togglesEndpoint = `${
    getEnvConfig().SIMORGH_CONFIG_URL
  }?application=simorgh&service=${service}`;

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
  dir,
  label,
  slotType,
  pageType,
  service,
}: AdContentProps) => (
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

const AdWithoutPlaceholder = ({
  dir,
  label,
  slotType,
  pageType,
  service,
  ariaLabel,
}: AdContentProps) => (
  <div
    css={styles.display}
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
      <div
        css={
          slotType === SLOT_TYPES.MPU
            ? adStyles.ampMpu
            : adStyles.ampLeaderboard
        }
      >
        <div css={styles.wrapper}>
          <AdContent
            dir={dir}
            label={label}
            pageType={pageType}
            service={service}
            slotType={slotType}
          />
        </div>
      </div>
    </section>
  </div>
);

const AdWithPlaceholder = ({
  dir,
  label,
  ariaLabel,
  slotType,
  pageType,
  service,
}: AdContentProps) => (
  <section
    css={styles.section}
    aria-label={ariaLabel}
    role="region"
    data-e2e="advertisement"
    aria-hidden="true"
  >
    <div
      css={
        slotType === SLOT_TYPES.MPU ? adStyles.ampMpu : adStyles.ampLeaderboard
      }
    >
      <div css={styles.wrapper}>
        <div
          css={styles.display}
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
        </div>
      </div>
    </div>
  </section>
);

const AmpAd = ({ slotType }: AdProps) => {
  const { translations, dir, service, showAdPlaceholder } = use(ServiceContext);

  const { pageType } = use(RequestContext);
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
