import React, { useContext } from 'react';
import path from 'ramda/src/path';
import {
  AmpSocialEmbed,
  CanonicalSocialEmbed,
} from '#psammead/psammead-social-embed/src';
import { RequestContext } from '#contexts/RequestContext';
import { GridItemMedium } from '#legacy/components/Grid';
import { ServiceContext } from '#contexts/ServiceContext';
import createTranslations from '../common/translations';
import Wrapper from '../common/styles';

const CpsSocialEmbedContainer = ({ blocks }) => {
  const { isAmp } = useContext(RequestContext);
  const { service, translations } = useContext(ServiceContext);

  if (!blocks) return null;

  const { type: provider, indexOfType, model } = blocks[0];
  const index = indexOfType + 1;

  const id = path(['id'], model);
  const href = path(['href'], model);

  if (!id || !href) return null;

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
    endTextId: `end-of-%provider%-content-${index}`,
  };

  const caption = provider === 'youtube' ? captionTranslations : null;

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

export default CpsSocialEmbedContainer;
