import React, { useContext } from 'react';
import { shape, string, func } from 'prop-types';
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
} from '../../../../routes/utils/pageTypes';

const checkIsSupportedProvider = (provider, pageType) => {
  // Optimo Articles support all social media providers
  if (pageType === ARTICLE_PAGE) return provider;

  // CPS Pages only support a select few
  if ([STORY_PAGE, CORRESPONDENT_STORY_PAGE].includes(pageType)) {
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
  oEmbed,
  caption,
  fallback,
  onRender,
}) => {
  const { pageType } = useContext(RequestContext);
  const embedCaption = getCaptionText({ pageType, caption, provider });

  const isSupportedProvider = checkIsSupportedProvider(provider, pageType);

  if (!isSupportedProvider || !oEmbed)
    return (
      <SkipLinkWrapper service={service} provider={provider} {...skipLink}>
        <Notice service={service} provider={provider} {...fallback} />
      </SkipLinkWrapper>
    );

  return (
    <SkipLinkWrapper service={service} provider={provider} {...skipLink}>
      {embedCaption ? (
        <CaptionWrapper service={service} {...embedCaption}>
          <EmbedConsentBannerCanonical provider={provider}>
            <CanonicalEmbed
              provider={provider}
              oEmbed={oEmbed}
              onRender={onRender}
            />
          </EmbedConsentBannerCanonical>
        </CaptionWrapper>
      ) : (
        <EmbedConsentBannerCanonical provider={provider}>
          <CanonicalEmbed
            provider={provider}
            oEmbed={oEmbed}
            onRender={onRender}
          />
        </EmbedConsentBannerCanonical>
      )}
    </SkipLinkWrapper>
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
  source,
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

const sharedPropTypes = {
  provider: string.isRequired,
  service: string.isRequired,
  skipLink: shape({
    text: string.isRequired,
    endTextId: string.isRequired,
    endTextVisuallyHidden: string.isRequired,
  }).isRequired,
  caption: shape({
    textPrefixVisuallyHidden: string,
    text: string.isRequired,
  }),
  fallback: shape({
    text: string.isRequired,
    linkText: string.isRequired,
    linkTextSuffixVisuallyHidden: string,
    linkHref: string.isRequired,
    warningText: string,
  }).isRequired,
};

CanonicalSocialEmbed.defaultProps = {
  oEmbed: null,
  onRender: null,
};

CanonicalSocialEmbed.propTypes = {
  ...sharedPropTypes,
  oEmbed: shape({
    html: string.isRequired,
  }),
  onRender: func,
};

AmpSocialEmbed.defaultProps = {
  source: null,
};

AmpSocialEmbed.propTypes = {
  ...sharedPropTypes,
  id: string.isRequired,
  source: string,
};
