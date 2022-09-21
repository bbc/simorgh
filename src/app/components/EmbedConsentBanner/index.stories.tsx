import React, { PropsWithChildren } from 'react';
import { css } from '@emotion/react';
import { withKnobs } from '@storybook/addon-knobs';
import { ARTICLE_PAGE } from '../../routes/utils/pageTypes';
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import { withServicesKnob } from '../../legacy/psammead/psammead-storybook-helpers/src';
import { C_GREY_2 } from '../../legacy/psammead/psammead-styles/src/colours';
import { Services, Variants } from '../../models/types/global';

import { EmbedConsentBannerCanonical, EmbedConsentBannerAmp } from '.';
import ThemeProvider from '../ThemeProvider';

const BackgroundColorWrapper = ({ children }: PropsWithChildren) => (
  <div css={css({ backgroundColor: C_GREY_2, padding: 20 })}>{children}</div>
);

interface Props {
  service: Services;
  variant: Variants;
  isAmp?: boolean;
}

const Component = ({ service, variant, isAmp }: Props) => {
  const EmbedBanner = !isAmp
    ? EmbedConsentBannerCanonical
    : EmbedConsentBannerAmp;

  return (
    <ThemeProvider service={service} variant={variant}>
      <ServiceContextProvider service={service} variant={variant}>
        <BackgroundColorWrapper>
          <EmbedBanner pageType={ARTICLE_PAGE} provider="youtube">
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
  decorators: [withKnobs, withServicesKnob()],
  parameters: { chromatic: { disable: true } },
};

export const CanonicalYoutube = Component;
export const CanonicalYoutubeMundo = Component;
export const AmpYoutube = (props: Props) => <Component isAmp {...props} />;
