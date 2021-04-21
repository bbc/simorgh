import React, { useContext } from 'react';
import path from 'ramda/src/path';
import styled from '@emotion/styled';
import Lazyload from 'react-lazyload';
import {
  AmpSocialEmbed,
  CanonicalSocialEmbed,
} from '@bbc/psammead-social-embed';
import { GEL_SPACING_TRPL } from '@bbc/gel-foundations/spacings';
import { RequestContext } from '#contexts/RequestContext';
import { ServiceContext } from '#contexts/ServiceContext';
import nodeLogger from '#lib/logger.node';
import { SOCIAL_EMBED_RENDERED } from '#lib/logger.const';
import { GridItemMedium } from '#app/components/Grid';
import useToggle from '#hooks/useToggle';
import socialEmbedBlockPropTypes from '#models/propTypes/socialEmbed';
import createTranslations from '../utilities/translations';

const logger = nodeLogger(__filename);

/**
 * MAX_WIDTH        Ensures all embeds assume the same width. (Tweets max-out
 *                  at 500px, which is why this is set to 31.25rem.)
 * LAZYLOAD_OFFSET  The distance in pixels above or below the viewport before
 *                  an embed is allowed to load.
 */
const MAX_WIDTH = '31.25rem';
const LAZYLOAD_OFFSET = 250;

const getWrapperHeightStyles = oEmbed => {
  /**
   * Adjust MIN_HEIGHT to configure the default minimum height of Social Embed
   * wrappers. This helps reduce layout shift. It is not applied to fallbacks.
   */
  const MIN_HEIGHT = '18.75rem';
  if (oEmbed?.height) return `min-height: ${oEmbed.height / 16}rem`;
  if (oEmbed) return `min-height: ${MIN_HEIGHT};`;
  return '';
};

const Wrapper = styled.div`
  margin-right: auto;
  margin-left: auto;
  margin-bottom: ${GEL_SPACING_TRPL};
  max-width: ${MAX_WIDTH};
  ${({ oEmbed }) => getWrapperHeightStyles(oEmbed)}
`;

const CpsSocialEmbedContainer = ({ blocks }) => {
  const { isAmp } = useContext(RequestContext);
  const { service, translations } = useContext(ServiceContext);
  const { enabled } = useToggle('cpsSocialEmbed');

  if (!blocks || !enabled) return null;

  const { type: provider, indexOfType, model } = blocks[0];
  const index = indexOfType + 1;

  const id = path(['id'], model);
  const href = path(['href'], model);
  if (!href) return null;

  const oEmbed = path(['embed', 'oembed'], model);

  const {
    fallback: fallbackTranslations,
    skipLink: skipLinkTranslations,
    caption: captionTranslations,
  } = createTranslations({ translations, index });

  const fallback = {
    ...fallbackTranslations,
    linkHref: href,
  };

  const skipLink = {
    ...skipLinkTranslations,
    endTextId: `skip-%provider%-content-${index}`,
  };

  const caption = provider === 'youtube' ? captionTranslations : null;

  logger.info(SOCIAL_EMBED_RENDERED, {
    provider,
    href,
  });

  return (
    <GridItemMedium>
      <Wrapper
        provider={provider}
        data-e2e={`${provider}-embed-${href}`}
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

CpsSocialEmbedContainer.propTypes = socialEmbedBlockPropTypes;

export default CpsSocialEmbedContainer;
