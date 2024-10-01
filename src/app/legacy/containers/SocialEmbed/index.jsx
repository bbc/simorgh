import React, { useContext } from 'react';
import {
  AmpSocialEmbed,
  CanonicalSocialEmbed,
} from '#psammead/psammead-social-embed/src';

import { RequestContext } from '#contexts/RequestContext';
import { GridItemMedium } from '#components/Grid';
import { LIVE_PAGE } from '#app/routes/utils/pageTypes';
import { ServiceContext } from '../../../contexts/ServiceContext';
import createTranslations from './common/translations';
import Wrapper from './common/styles';
import { getProviderFromSource, getIdFromSource } from './sourceHelpers';

const SocialEmbedContainer = ({ blocks, source }) => {
  const { isAmp, isLite, pageType } = useContext(RequestContext);
  const { service, translations } = useContext(ServiceContext);

  if (isLite) return null;
  if (!blocks || !source) return null;

  const { model, id: blockId } = blocks[0];
  const provider = getProviderFromSource(source);

  const id = getIdFromSource(source);

  if (!id) return null;

  const oEmbed = model?.blocks?.[0]?.model?.oembed || model?.oembed;

  const oEmbedIndexOfType = oEmbed?.indexOfType;
  const oEmbedPosition =
    typeof oEmbedIndexOfType === 'number' && oEmbedIndexOfType + 1;

  const isLive = pageType === LIVE_PAGE;

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
        ? `end-of-%provider%-content-${isLive ? blockId : oEmbedPosition}`
        : `end-of-%provider%-content${isLive ? `-${blockId}` : ''}`,
  };

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
          <CanonicalSocialEmbed
            provider={provider}
            service={service}
            id={id}
            oEmbed={oEmbed}
            fallback={fallback}
            skipLink={skipLink}
            caption={caption}
          />
        )}
      </Wrapper>
    </GridItemMedium>
  );
};

export default SocialEmbedContainer;
