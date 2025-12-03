import React from 'react';
import metadata from './metadata.json';
import readme from './README.md';

import {
  EmbedConsentBannerCanonical,
  EmbedConsentBannerAmp,
  ConsentBannerProviders,
} from '.';

interface Props {
  isAmp?: boolean;
  provider: ConsentBannerProviders;
}

const Component = ({ isAmp, provider = 'youtube' }: Props) => {
  const EmbedBanner = !isAmp
    ? EmbedConsentBannerCanonical
    : EmbedConsentBannerAmp;

  return (
    <EmbedBanner provider={provider}>
      <div>Embed goes here</div>
    </EmbedBanner>
  );
};

export default {
  title: 'Components/Social Embed Consent Banner',
  Component,
  parameters: {
    chromatic: { disable: true },
    metadata,
    docs: { readme },
  },
};

export const CanonicalYoutube = () => <Component provider="youtube" />;

export const AmpYoutube = () => <Component isAmp provider="youtube" />;
export const CanonicalTikTok = () => <Component provider="tiktok" />;
export const AmpTikTok = () => <Component isAmp provider="tiktok" />;
