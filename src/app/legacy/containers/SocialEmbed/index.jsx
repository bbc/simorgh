import React, { useContext } from 'react';
import path from 'ramda/src/path';
import is from 'ramda/src/is';
import Lazyload from 'react-lazyload';
import {
  AmpSocialEmbed,
  CanonicalSocialEmbed,
} from '#psammead/psammead-social-embed/src';

import { RequestContext } from '#contexts/RequestContext';
import { GridItemMedium } from '#components/Grid';
import { socialEmbedBlockPropTypes } from '#models/propTypes/socialEmbed';
import nodeLogger from '#lib/logger.node';
import { SOCIAL_EMBED_RENDERED } from '#lib/logger.const';
import { ServiceContext } from '../../../contexts/ServiceContext';
import createTranslations from './common/translations';
import { LAZYLOAD_OFFSET, Wrapper } from './common/styles';
import { getProviderFromSource, getIdFromSource } from './sourceHelpers';

const logger = nodeLogger(__filename);

const SocialEmbedContainer = ({ blocks, source }) => {
  const { isAmp } = useContext(RequestContext);
  const { service, translations } = useContext(ServiceContext);

  if (!blocks || !source) return null;
  const { model } = blocks[0];
  const provider = getProviderFromSource(source);

  const id = getIdFromSource(source);

  const oEmbed = path(['blocks', 0, 'model', 'oembed'], model);
  const oEmbedIndexOfType = path(['indexOfType'], oEmbed);
  const oEmbedPosition = is(Number, oEmbedIndexOfType) && oEmbedIndexOfType + 1;

  const {
    fallback: fallbackTranslations,
    skipLink: skipLinkTranslations,
    caption,
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

  logger.info(SOCIAL_EMBED_RENDERED, {
    provider,
    href: source,
  });

  return (
    <GridItemMedium>
      <Wrapper
        provider={provider}
        data-e2e={`${provider}-embed-${source}`}
        oEmbed={oEmbed}
      >
        {isAmp ? (
          <AmpSocialEmbed
            provider={provider}
            service={service}
            id={id}
            fallback={fallback}
            skipLink={skipLink}
            caption={caption}
            source={source}
          />
        ) : (
          <Lazyload offset={LAZYLOAD_OFFSET} once height={oEmbed?.height}>
            <CanonicalSocialEmbed
              provider={provider}
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
