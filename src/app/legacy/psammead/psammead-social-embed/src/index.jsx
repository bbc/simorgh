import { use, useId } from 'react';

import { RequestContext } from '#contexts/RequestContext';
import {
  EmbedConsentBannerAmp,
  EmbedConsentBannerCanonical,
} from '../../../../components/EmbedConsentBanner';
import {
  ARTICLE_PAGE,
  CORRESPONDENT_STORY_PAGE,
  LIVE_PAGE,
  STORY_PAGE,
} from '../../../../routes/utils/pageTypes';
import AmpElements from './Amp';
import CanonicalEmbed from './Canonical';
import CaptionWrapper from './CaptionWrapper';
import Notice from './Notice';
import SkipLinkWrapper from './SkipLinkWrapper';
import { getCaptionText } from './utilities';

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
  skipLink,
  id,
  oEmbed = null,
  caption,
  fallback,
  onRender = null,
}) => {
  const { pageType } = use(RequestContext);
  const embedCaption = getCaptionText({ pageType, caption, provider });

  const isSupportedProvider = checkIsSupportedProvider(provider, pageType);
  const captionId = useId();

  if (!isSupportedProvider || !oEmbed)
    return (
      <>
        <SkipLinkWrapper provider={provider} {...skipLink}>
          <Notice provider={provider} {...fallback} />
        </SkipLinkWrapper>
        <noscript>
          <Notice provider={provider} {...fallback} />
        </noscript>
      </>
    );

  return (
    <>
      <SkipLinkWrapper
        provider={provider}
        {...(embedCaption && { describedById: captionId })}
        {...skipLink}
      >
        {embedCaption ? (
          <CaptionWrapper describedById={captionId} {...embedCaption}>
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
        <Notice provider={provider} {...fallback} />
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
  skipLink,
  id,
  caption,
  fallback,
  source = null,
}) => {
  const { pageType } = use(RequestContext);
  const embedCaption = getCaptionText({ pageType, caption, provider });

  if (!id) {
    return null;
  }
  const isSupportedProvider = checkIsSupportedProvider(provider, pageType);

  const AmpElement = AmpElements[provider];

  if (!isSupportedProvider || !AmpElement)
    return (
      <SkipLinkWrapper provider={provider} {...skipLink}>
        <Notice provider={provider} {...fallback} />
      </SkipLinkWrapper>
    );

  return (
    <SkipLinkWrapper provider={provider} {...skipLink}>
      {embedCaption ? (
        <CaptionWrapper {...embedCaption}>
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
