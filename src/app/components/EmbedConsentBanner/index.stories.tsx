import React from 'react';
import withServicesDecorator from '#app/utilities/withServicesDecorator';
import metadata from './metadata.json';

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
  title: 'Containers/Social Embed/Consent Banner',
  Component,
  parameters: {
    chromatic: { disable: true },
    metadata,
  },
  decorators: [withServicesDecorator],
};

export const CanonicalYoutube = () => <Component provider="youtube" />;

export const AmpYoutube = (props: Props) => (
  <Component isAmp provider="youtube" />
);
export const CanonicalTikTok = (props: Props) => (
  <Component provider="tiktok" />
);
export const AmpTikTok = (props: Props) => (
  <Component isAmp provider="tiktok" />
);
