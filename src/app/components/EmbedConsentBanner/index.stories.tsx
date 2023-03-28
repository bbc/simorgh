/** @jsx jsx */
import { PropsWithChildren } from 'react';
import { jsx, css } from '@emotion/react';
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import { Services, Variants } from '../../models/types/global';
import metadata from './metadata.json';
import md from './README.md';

import {
  EmbedConsentBannerCanonical,
  EmbedConsentBannerAmp,
  ConsentBannerProviders,
} from '.';
import ThemeProvider from '../ThemeProvider';
import { GREY_2 } from '../ThemeProvider/palette';

const BackgroundColorWrapper = ({ children }: PropsWithChildren) => (
  <div css={css({ backgroundColor: GREY_2, padding: 20 })}>{children}</div>
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
  parameters: {
    chromatic: { disable: true },
    metadata,
    docs: {
      component: {
        title: 'Consent Banner',
      },
      page: md,
    },
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
