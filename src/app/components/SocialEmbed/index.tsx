/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import React, { useContext } from 'react';

import Lazyload from 'react-lazyload';

import { RequestContext } from '#contexts/RequestContext';
import { ServiceContext } from '#contexts/ServiceContext';

import { PageTypes, SocialEmbedProviders } from '#app/models/types/global';
import SkipLinkWrapper from './SkipLinkWrapper';
import Notice from './Notice';
import CaptionWrapper from './CaptionWrapper';
import {
  EmbedConsentBannerCanonical,
  EmbedConsentBannerAmp,
} from '../EmbedConsentBanner';

import CanonicalEmbed from './Canonical';
import AmpElements from './Amp';

import { checkIsSupportedProvider } from './utilities';

import styles, { getWrapperHeightStyles } from './index.styles';
import getSocialMetadata from './utilities/getSocialMetadata';

type Props = {
  blocks: {
    type: SocialEmbedProviders;
    indexOfType: number;
    model: object;
  }[];
  source: string;
};

const SocialEmbedContainer = ({ blocks, source }: Props) => {
  const { isAmp, pageType } = useContext(RequestContext) as {
    isAmp: boolean;
    pageType: PageTypes;
  };
  const { translations } = useContext(ServiceContext);

  if (!blocks) return null;

  const { id, oEmbed, fallback, skipLink, embedCaption, provider } =
    getSocialMetadata({ blocks, source, pageType, translations });

  if (!id || !provider || !skipLink || !fallback) {
    return null;
  }

  const isSupportedProvider = checkIsSupportedProvider(provider, pageType);

  if (!isSupportedProvider || !oEmbed)
    return (
      <SkipLinkWrapper provider={provider} {...skipLink}>
        <Notice provider={provider} {...fallback} />
      </SkipLinkWrapper>
    );

  const AmpElement = AmpElements[provider];

  const EmbedElement = isAmp ? (
    <EmbedConsentBannerAmp provider={provider} id={id}>
      <AmpElement id={id} source={source} />
    </EmbedConsentBannerAmp>
  ) : (
    <EmbedConsentBannerCanonical provider={provider}>
      <CanonicalEmbed provider={provider} oEmbed={oEmbed} />
    </EmbedConsentBannerCanonical>
  );

  const LazyWrapper = isAmp ? React.Fragment : Lazyload;

  return (
    <div
      css={[styles.wrapper, getWrapperHeightStyles(oEmbed)]}
      data-e2e={`${provider}-embed-${source}`}
    >
      <LazyWrapper offset={250} once height={oEmbed?.height}>
        <SkipLinkWrapper provider={provider} {...skipLink}>
          {embedCaption ? (
            <CaptionWrapper {...embedCaption}>{EmbedElement}</CaptionWrapper>
          ) : (
            EmbedElement
          )}
        </SkipLinkWrapper>
      </LazyWrapper>
    </div>
  );
};

export default SocialEmbedContainer;
