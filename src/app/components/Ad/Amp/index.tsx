import React, { use } from 'react';
import { Helmet } from 'react-helmet';
import pathOr from 'ramda/src/pathOr';
import { RequestContext } from '#contexts/RequestContext';
import {
  AMP_ACCESS_JS,
  AMP_ADS_JS,
} from '#psammead/psammead-assets/src/amp-boilerplate';
import { getEnvConfig } from '#app/lib/utilities/getEnvConfig';
import { ServiceContext } from '../../../contexts/ServiceContext';
import getAdsAriaLabel from '../utilities/getAdsAriaLabel';
import AdSlot from './AdSlot';
import { Direction, PageTypes, Services } from '../../../models/types/global';
import adStyles from '../utilities/adSlot.styles';
import { AdProps, SLOT_TYPES, SlotType } from '../types';

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
}: AdContentProps) => {
  return (
    <>
      <a
        className={`block p-full uppercase text-minion font-sans-regular text-rhino no-underline ${dir === 'ltr' ? 'text-right' : 'text-left'} hover:underline`}
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
    <div
      className="amp-geo-pending:hidden amp-geo-pending:invisible amp-geo-group-gbOrUnknown:hidden amp-geo-group-gbOrUnknown:invisible"
      amp-access="toggles.ads.enabled"
      amp-access-hide="true"
    >
      <section
        className="bg-grey-3"
        aria-label={ariaLabel}
        role="region"
        data-e2e="advertisement"
        aria-hidden="true"
      >
        <div
          className={
            slotType === SLOT_TYPES.MPU
              ? adStyles.ampMpu
              : adStyles.ampLeaderboard
          }
        >
          <div className="mx-auto text-center">
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
};

const AdWithPlaceholder = ({
  dir,
  label,
  ariaLabel,
  slotType,
  pageType,
  service,
}: AdContentProps) => {
  return (
    <section
      className="bg-grey-3"
      aria-label={ariaLabel}
      role="region"
      data-e2e="advertisement"
      aria-hidden="true"
    >
      <div
        className={
          slotType === SLOT_TYPES.MPU
            ? adStyles.ampMpu
            : adStyles.ampLeaderboard
        }
      >
        <div className="mx-auto text-center">
          <div
            className="amp-geo-pending:hidden amp-geo-pending:invisible amp-geo-group-gbOrUnknown:hidden amp-geo-group-gbOrUnknown:invisible"
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
};

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
