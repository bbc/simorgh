import React, { useContext } from 'react';
import path from 'ramda/src/path';
import {
  AmpSocialEmbed,
  CanonicalSocialEmbed,
} from '@bbc/psammead-social-embed';
import { RequestContext } from '#contexts/RequestContext';
import { ServiceContext } from '#contexts/ServiceContext';
import useToggle from '#hooks/useToggle';
import { GridItemConstrainedMedium } from '#lib/styledGrid';
import socialEmbedBlockPropTypes from '#models/propTypes/socialEmbed';

const SocialEmbedContainer = ({ blocks }) => {
  const { isAmp } = useContext(RequestContext);
  const { service } = useContext(ServiceContext);
  const { enabled } = useToggle('socialEmbed');

  if (!blocks || !enabled) return null;

  const { type: provider, model } = blocks[0];
  const { id, href } = model;
  const oEmbed = path(['embed', 'oembed'], model);

  const fallback = {
    text: "Sorry but we're having trouble displaying this content",
    linkText: 'View content on %provider_name%',
    linkTextSuffixVisuallyHidden: ', external',
    linkHref: href,
    warningText: 'Warning: BBC is not responsible for third party content',
  };

  const skipLink = {
    text: 'Skip %provider_name% content',
    endTextId: 'skip-%provider%-content',
    endTextVisuallyHidden: 'End of %provider_name% content',
  };

  const caption =
    provider === 'youtube'
      ? {
          textPrefixVisuallyHidden: 'Video caption, ',
          text: 'Warning: Third party content may contain adverts',
        }
      : null;

  return (
    <GridItemConstrainedMedium>
      {isAmp ? (
        <AmpSocialEmbed
          provider={provider}
          service={service}
          id={id}
          fallback={fallback}
          skipLink={skipLink}
          caption={caption}
        />
      ) : (
        <CanonicalSocialEmbed
          provider={provider}
          service={service}
          oEmbed={oEmbed}
          fallback={fallback}
          skipLink={skipLink}
          caption={caption}
        />
      )}
    </GridItemConstrainedMedium>
  );
};

SocialEmbedContainer.propTypes = socialEmbedBlockPropTypes;

export default SocialEmbedContainer;
