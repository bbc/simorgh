import React, { useState, PropsWithChildren } from 'react';
import ConsentBanner from './ConsentBanner';

import { SocialEmbedProviders } from '../../models/types/global';
import useClickTrackerHandler from '../../hooks/useClickTrackerHandler';

export type ConsentBannerProviders = Extract<
  SocialEmbedProviders,
  'youtube' | 'tiktok' | 'twitter' | 'facebook' | 'instagram'
>;

export const CONSENT_BANNER_PROVIDERS: ConsentBannerProviders[] = [
  'youtube',
  'tiktok',
  'facebook',
  'instagram',
  'twitter',
];

export const getEventTrackingData = (provider: ConsentBannerProviders) => ({
  componentName: `social-consent-banner-${provider}`,
});

type ConsentBannerProps = {
  provider: ConsentBannerProviders;
  id?: string;
};

const EmbedConsentBannerAmp = ({
  provider,
  id,
  children,
}: PropsWithChildren<ConsentBannerProps>) => {
  if (!CONSENT_BANNER_PROVIDERS.includes(provider))
    return children as JSX.Element;

  return (
    <>
      <ConsentBanner
        provider={provider}
        clickHandler={{
          on: `tap:consentBanner${id ? `-${id}` : ''}.hide,embed${
            id ? `-${id}` : ''
          }.show`,
        }}
        id={id}
      />
      <div id={`embed${id ? `-${id}` : ''}`} hidden>
        {children}
      </div>
    </>
  );
};

const EmbedConsentBannerCanonical = ({
  provider,
  id,
  children,
}: PropsWithChildren<ConsentBannerProps>) => {
  const [consented, setConsented] = useState(false);

  const handleClickTracking = useClickTrackerHandler(
    getEventTrackingData(provider),
  );

  const showConsentBanner =
    CONSENT_BANNER_PROVIDERS.includes(provider) && !consented;

  if (!showConsentBanner) return children as JSX.Element;

  return (
    <ConsentBanner
      provider={provider}
      id={id}
      clickHandler={{
        onClick: e => {
          setConsented(true);
          handleClickTracking(e);
        },
      }}
    />
  );
};

export { EmbedConsentBannerCanonical, EmbedConsentBannerAmp };
