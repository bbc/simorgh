import React from 'react';
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import metadata from './metadata.json';

import {
  EmbedConsentBannerCanonical,
  EmbedConsentBannerAmp,
  ConsentBannerProviders,
} from '.';
import ThemeProvider from '../ThemeProvider';
import { StoryProps } from '../../models/types/storybook';

interface Props extends StoryProps {
  isAmp?: boolean;
  provider: ConsentBannerProviders;
}

const Component = ({
  service = 'news',
  variant,
  isAmp,
  provider = 'youtube',
}: Props) => {
  const EmbedBanner = !isAmp
    ? EmbedConsentBannerCanonical
    : EmbedConsentBannerAmp;

  return (
    <ThemeProvider service={service} variant={variant}>
      <ServiceContextProvider service={service} variant={variant}>
        <EmbedBanner provider={provider}>
          <div>Embed goes here</div>
        </EmbedBanner>
      </ServiceContextProvider>
    </ThemeProvider>
  );
};

export default {
  title: 'Containers/Social Embed/Consent Banner',
  Component,
  parameters: {
    chromatic: { disable: true },
    metadata,
  },
};

export const CanonicalYoutube = (props: Props) => (
  <Component {...props} provider="youtube" />
);
export const CanonicalYoutubeMundo = (props: Props) => (
  <Component {...props} isAmp provider="youtube" service="mundo" />
);
export const AmpYoutube = (props: Props) => (
  <Component {...props} isAmp provider="youtube" />
);
export const CanonicalTikTok = (props: Props) => (
  <Component {...props} provider="tiktok" />
);
export const CanonicalTikTokMundo = (props: Props) => (
  <Component {...props} isAmp provider="tiktok" service="mundo" />
);
export const AmpTikTok = (props: Props) => (
  <Component {...props} isAmp provider="tiktok" />
);
