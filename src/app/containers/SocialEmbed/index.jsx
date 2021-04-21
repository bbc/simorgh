import { arrayOf, shape, string } from 'prop-types';
import React, { useContext } from 'react';
import path from 'ramda/src/path';
import Lazyload from 'react-lazyload';
import {
  AmpSocialEmbed,
  CanonicalSocialEmbed,
} from '@bbc/psammead-social-embed';

import CpsSocialEmbed from './Cps';
import { RequestContext } from '#contexts/RequestContext';
import { ServiceContext } from '#contexts/ServiceContext';
import useToggle from '#hooks/useToggle';
import { GridItemMedium } from '#app/components/Grid';
import nodeLogger from '#lib/logger.node';
import { SOCIAL_EMBED_RENDERED } from '#lib/logger.const';
import createTranslations from './common/translations';
import { LAZYLOAD_OFFSET, Wrapper } from './common/styles';
import { getProviderFromSource, getIdFromSource } from './sourceHelper';

const logger = nodeLogger(__filename);

const SocialEmbed = ({ blocks, source }) => {
  const { isAmp } = useContext(RequestContext);
  const { service, translations } = useContext(ServiceContext);
  const { enabled } = useToggle('socialEmbed');

  if (!blocks || !source || !enabled) return null;

  const { model } = blocks[0];
  const oEmbed = path(['blocks', 0, 'model', 'oembed'], model);
  const provider = getProviderFromSource(source);
  const id = getIdFromSource(source);

  const indexOfType = 0;
  const index = indexOfType + 1;

  const {
    fallback: fallbackTranslations,
    skipLink: skipLinkTranslations,
    caption: captionTranslations,
  } = createTranslations({ translations, index });

  const fallback = {
    ...fallbackTranslations,
    linkHref: source,
  };

  const skipLink = {
    ...skipLinkTranslations,
    endTextId: `skip-%provider%-content-${index}`,
  };

  const caption = provider === 'youtube' ? captionTranslations : null;

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

SocialEmbed.defaultProps = {
  blocks: [],
};

SocialEmbed.propTypes = {
  blocks: arrayOf(shape({})),
  source: string.isRequired,
};

export { CpsSocialEmbed, SocialEmbed };
