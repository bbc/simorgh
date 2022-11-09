import React, { PropsWithChildren } from 'react';
import { css } from '@emotion/react';
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import { C_GREY_2 } from '../../legacy/psammead/psammead-styles/src/colours';
import { Services, Variants } from '../../models/types/global';

import {
  EmbedConsentBannerCanonical,
  EmbedConsentBannerAmp,
  ConsentBannerProviders,
} from '.';
import ThemeProvider from '../ThemeProvider';

const BackgroundColorWrapper = ({ children }: PropsWithChildren) => (
  <div css={css({ backgroundColor: C_GREY_2, padding: 20 })}>{children}</div>
);

interface Props {
  service: Services;
  variant: Variants;
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
        <BackgroundColorWrapper>
          <EmbedBanner provider={provider}>
            <div>Embed goes here</div>
          </EmbedBanner>
        </BackgroundColorWrapper>
      </ServiceContextProvider>
    </ThemeProvider>
  );
};

export default {
  title: 'Containers/Social Embed/Consent Banner',
  Component,
  parameters: { chromatic: { disable: true } },
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
