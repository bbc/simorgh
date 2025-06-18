import React, { useContext, useId } from 'react';
import { RequestContext } from '#contexts/RequestContext';
import {
  EmbedConsentBannerCanonical,
  EmbedConsentBannerAmp,
} from '../../../../components/EmbedConsentBanner';
import SkipLinkWrapper from './SkipLinkWrapper';
import CaptionWrapper from './CaptionWrapper';
import Notice from './Notice';

import CanonicalEmbed from './Canonical';
import AmpElements from './Amp';
import { getCaptionText } from './utilities';
import {
  ARTICLE_PAGE,
  STORY_PAGE,
  CORRESPONDENT_STORY_PAGE,
  LIVE_PAGE,
} from '../../../../routes/utils/pageTypes';

const checkIsSupportedProvider = (provider, pageType) => {
  // Optimo Articles support all social media providers
  if (pageType === ARTICLE_PAGE) {
    return ['twitter', 'instagram', 'youtube', 'facebook', 'tiktok'].includes(
      provider,
    );
  }
  // CPS Pages only support a select few
  if ([STORY_PAGE, CORRESPONDENT_STORY_PAGE].includes(pageType)) {
    return ['twitter', 'instagram', 'youtube'].includes(provider);
  }

  if ([LIVE_PAGE].includes(pageType)) {
    return ['twitter', 'instagram', 'youtube'].includes(provider);
  }

  // Only Optimo and CPS articles support social embeds
  return false;
};

/**
 * Returns a social embed or fallback component for use on Canonical pages.
 * @param {Object} props
 */
export const CanonicalSocialEmbed = ({
  provider,
  service,
  skipLink,
  id,
  oEmbed = null,
  caption,
  fallback,
  onRender = null,
}) => {
  const { pageType } = useContext(RequestContext);
  const embedCaption = getCaptionText({ pageType, caption, provider });

  const isSupportedProvider = checkIsSupportedProvider(provider, pageType);
  const captionId = useId();

  if (!isSupportedProvider || !oEmbed)
    return (
      <>
        <SkipLinkWrapper service={service} provider={provider} {...skipLink}>
          <Notice service={service} provider={provider} {...fallback} />
        </SkipLinkWrapper>
        <noscript>
          <Notice service={service} provider={provider} {...fallback} />
        </noscript>
      </>
    );

  return (
    <>
      <SkipLinkWrapper
        service={service}
        provider={provider}
        {...(embedCaption && { describedById: captionId })}
        {...skipLink}
      >
        {embedCaption ? (
          <CaptionWrapper
            service={service}
            describedById={captionId}
            {...embedCaption}
          >
            <EmbedConsentBannerCanonical provider={provider} id={id}>
              <CanonicalEmbed
                provider={provider}
                oEmbed={oEmbed}
                onRender={onRender}
              />
            </EmbedConsentBannerCanonical>
          </CaptionWrapper>
        ) : (
          <EmbedConsentBannerCanonical provider={provider} id={id}>
            <CanonicalEmbed
              provider={provider}
              oEmbed={oEmbed}
              onRender={onRender}
            />
          </EmbedConsentBannerCanonical>
        )}
      </SkipLinkWrapper>
      <noscript>
        <Notice service={service} provider={provider} {...fallback} />
      </noscript>
    </>
  );
};

/**
 * Returns a social embed or fallback component for use on AMP pages.
 * @param {Object} props
 */
export const AmpSocialEmbed = ({
  provider,
  service,
  skipLink,
  id,
  caption,
  fallback,
  source = null,
}) => {
  const { pageType } = useContext(RequestContext);
  const embedCaption = getCaptionText({ pageType, caption, provider });

  if (!id) {
    return null;
  }
  const isSupportedProvider = checkIsSupportedProvider(provider, pageType);

  const AmpElement = AmpElements[provider];

  if (!isSupportedProvider || !AmpElement)
    return (
      <SkipLinkWrapper service={service} provider={provider} {...skipLink}>
        <Notice service={service} provider={provider} {...fallback} />
      </SkipLinkWrapper>
    );

  return (
    <SkipLinkWrapper service={service} provider={provider} {...skipLink}>
      {embedCaption ? (
        <CaptionWrapper service={service} {...embedCaption}>
          <EmbedConsentBannerAmp provider={provider} id={id}>
            <AmpElement id={id} source={source} />
          </EmbedConsentBannerAmp>
        </CaptionWrapper>
      ) : (
        <EmbedConsentBannerAmp provider={provider} id={id}>
          <AmpElement id={id} source={source} />
        </EmbedConsentBannerAmp>
      )}
    </SkipLinkWrapper>
  );
};
