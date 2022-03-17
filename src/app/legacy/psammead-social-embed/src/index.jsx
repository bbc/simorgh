import React from 'react';
import { shape, string, func } from 'prop-types';

import SkipLinkWrapper from './SkipLinkWrapper';
import CaptionWrapper from './CaptionWrapper';
import Notice from './Notice';

import CanonicalEmbed, { providers } from './Canonical';
import AmpElements from './Amp';

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
  const isSupportedProvider = Object.keys(providers).includes(provider);
  const hasCaption = caption && caption.text;

  if (!isSupportedProvider || !oEmbed)
    return (
      <SkipLinkWrapper service={service} provider={provider} {...skipLink}>
        <Notice service={service} provider={provider} {...fallback} />
      </SkipLinkWrapper>
    );

  return (
    <SkipLinkWrapper service={service} provider={provider} {...skipLink}>
      {hasCaption ? (
        <CaptionWrapper service={service} {...caption}>
          <CanonicalEmbed
            provider={provider}
            oEmbed={oEmbed}
            onRender={onRender}
          />
        </CaptionWrapper>
      ) : (
        <CanonicalEmbed
          provider={provider}
          oEmbed={oEmbed}
          onRender={onRender}
        />
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
}) => {
  if (!id) {
    return null;
  }

  const AmpElement = AmpElements[provider];
  const hasCaption = caption && caption.text;

  if (!AmpElement)
    return (
      <SkipLinkWrapper service={service} provider={provider} {...skipLink}>
        <Notice service={service} provider={provider} {...fallback} />
      </SkipLinkWrapper>
    );

  return (
    <SkipLinkWrapper service={service} provider={provider} {...skipLink}>
      {hasCaption ? (
        <CaptionWrapper service={service} {...caption}>
          <AmpElement id={id} />
        </CaptionWrapper>
      ) : (
        <AmpElement id={id} />
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

AmpSocialEmbed.propTypes = {
  ...sharedPropTypes,
  id: string.isRequired,
};
