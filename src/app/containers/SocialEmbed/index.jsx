import React, { useContext } from 'react';
import path from 'ramda/src/path';
import styled from 'styled-components';
import {
  AmpSocialEmbed,
  CanonicalSocialEmbed,
} from '@bbc/psammead-social-embed';
import { GEL_SPACING_TRPL } from '@bbc/gel-foundations/spacings';
import { RequestContext } from '#contexts/RequestContext';
import { ServiceContext } from '#contexts/ServiceContext';
import { GridItemConstrainedMedium } from '#lib/styledGrid';
import useToggle from '#hooks/useToggle';
import socialEmbedBlockPropTypes from '#models/propTypes/socialEmbed';
import createTranslations from './translations';

const MAX_WIDTH = '31.25rem';

const Wrapper = styled.div`
  margin-right: auto;
  margin-left: auto;
  margin-bottom: ${GEL_SPACING_TRPL};
  max-width: ${MAX_WIDTH};

  .twitter-tweet,
  .instagram-media {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
  }
`;

const SocialEmbedContainer = ({ blocks }) => {
  const { isAmp } = useContext(RequestContext);
  const { service, translations } = useContext(ServiceContext);
  const { enabled } = useToggle('socialEmbed');

  if (!blocks || !enabled) return null;

  const { type: provider, model, id: uuid } = blocks[0];
  const { id, href } = model;

  const oEmbed = path(['embed', 'oembed'], model);

  const {
    fallback: fallbackTranslations,
    skipLink: skipLinkTranslations,
    caption: captionTranslations,
  } = createTranslations(translations);

  const fallback = {
    ...fallbackTranslations,
    linkHref: href,
  };

  const skipLink = {
    ...skipLinkTranslations,
    endTextId: `skip-%provider%-content-${uuid.split('-')[0]}`,
  };

  const caption = provider === 'youtube' ? captionTranslations : null;

  return (
    <GridItemConstrainedMedium>
      <Wrapper provider={provider}>
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
      </Wrapper>
    </GridItemConstrainedMedium>
  );
};

SocialEmbedContainer.propTypes = socialEmbedBlockPropTypes;

export default SocialEmbedContainer;
