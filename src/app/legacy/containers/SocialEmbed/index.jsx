import React, { useContext } from 'react';
import path from 'ramda/src/path';
import is from 'ramda/src/is';
import Lazyload from 'react-lazyload';
import {
  AmpSocialEmbed,
  CanonicalSocialEmbed,
} from '#psammead/psammead-social-embed/src';

import { RequestContext } from '#contexts/RequestContext';
import { ServiceContext } from '#contexts/ServiceContext';
import { GridItemMedium } from '#components/Grid';
import { socialEmbedBlockPropTypes } from '#models/propTypes/socialEmbed';
import nodeLogger from '#lib/logger.node';
import { SOCIAL_EMBED_RENDERED } from '#lib/logger.const';
import createTranslations from './common/translations';
import { LAZYLOAD_OFFSET, Wrapper } from './common/styles';
import { getProviderFromSource, getIdFromSource } from './sourceHelpers';

const logger = nodeLogger(__filename);

const SocialEmbedContainer = ({ blocks, source }) => {
  const { isAmp } = useContext(RequestContext);
  const { service, translations } = useContext(ServiceContext);

  if (!blocks || !source) return null;
  const { model } = blocks[0];

  const provider =
    path(['blocks', 0, 'model', 'oembed', 'provider_name'], model) ||
    getProviderFromSource(source);

  const sanitisedProvider = provider.toLowerCase();

  const id = getIdFromSource(source);

  const oEmbed = path(['blocks', 0, 'model', 'oembed'], model);
  const oEmbedIndexOfType = path(['indexOfType'], oEmbed);
  const oEmbedPosition = is(Number, oEmbedIndexOfType) && oEmbedIndexOfType + 1;

  const {
    fallback: fallbackTranslations,
    skipLink: skipLinkTranslations,
    caption: captionTranslations,
  } = createTranslations({ translations, index: oEmbedPosition });

  const fallback = {
    ...fallbackTranslations,
    linkHref: source,
  };

  const skipLink = {
    ...skipLinkTranslations,
    endTextId:
      oEmbedPosition > 0
        ? `end-of-%provider%-content-${oEmbedPosition}`
        : `end-of-%provider%-content`,
  };

  const caption = sanitisedProvider === 'youtube' ? captionTranslations : null;

  logger.info(SOCIAL_EMBED_RENDERED, {
    sanitisedProvider,
    href: source,
  });

  return (
    <GridItemMedium>
      <Wrapper
        provider={sanitisedProvider}
        data-e2e={`${sanitisedProvider}-embed-${source}`}
        oEmbed={oEmbed}
      >
        {isAmp ? (
          <AmpSocialEmbed
            provider={sanitisedProvider}
            service={service}
            id={id}
            fallback={fallback}
            skipLink={skipLink}
            caption={caption}
          />
        ) : (
          <Lazyload offset={LAZYLOAD_OFFSET} once height={oEmbed?.height}>
            <CanonicalSocialEmbed
              provider={sanitisedProvider}
              service={service}
              oEmbed={oEmbed}
              fallback={fallback}
              skipLink={skipLink}
              caption={caption}
            />
          </Lazyload>
        )}
      </Wrapper>
    </GridItemMedium>
  );
};

SocialEmbedContainer.propTypes = socialEmbedBlockPropTypes;

export default SocialEmbedContainer;
