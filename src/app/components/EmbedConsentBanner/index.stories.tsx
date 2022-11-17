/** @jsx jsx */
import { PropsWithChildren } from 'react';
import { jsx, css } from '@emotion/react';
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import { C_GREY_2 } from '../../legacy/psammead/psammead-styles/src/colours';
import { Services, Variants } from '../../models/types/global';

import {
  EmbedConsentBannerCanonical,
  EmbedConsentBannerAmp,
  ConsentBannerProviders,
} from '.';
import ThemeProvider from '../ThemeProvider';

function BackgroundColorWrapper({ children }: PropsWithChildren) {
  return (
    <div css={css({ backgroundColor: C_GREY_2, padding: 20 })}>{children}</div>
  );
}

interface Props {
  service: Services;
  variant: Variants;
  isAmp?: boolean;
  provider: ConsentBannerProviders;
}

function Component({
  service = 'news',
  variant,
  isAmp,
  provider = 'youtube',
}: Props) {
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
}

export default {
  title: 'Containers/Social Embed/Consent Banner',
  Component,
  parameters: { chromatic: { disable: true } },
};

export function CanonicalYoutube(props: Props) {
  return <Component {...props} provider="youtube" />;
}
export function CanonicalYoutubeMundo(props: Props) {
  return <Component {...props} isAmp provider="youtube" service="mundo" />;
}
export function AmpYoutube(props: Props) {
  return <Component {...props} isAmp provider="youtube" />;
}
export function CanonicalTikTok(props: Props) {
  return <Component {...props} provider="tiktok" />;
}
export function CanonicalTikTokMundo(props: Props) {
  return <Component {...props} isAmp provider="tiktok" service="mundo" />;
}
export function AmpTikTok(props: Props) {
  return <Component {...props} isAmp provider="tiktok" />;
}
