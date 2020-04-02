import React, { useContext } from 'react';
import path from 'ramda/src/path';
import styled from 'styled-components';
import {
  AmpSocialEmbed,
  CanonicalSocialEmbed,
} from '@bbc/psammead-social-embed';
import { RequestContext } from '#contexts/RequestContext';
import { ServiceContext } from '#contexts/ServiceContext';
import useToggle from '#hooks/useToggle';
import { GridItemConstrainedMedium } from '#lib/styledGrid';
import socialEmbedBlockPropTypes from '#models/propTypes/socialEmbed';

const MAX_WIDTH = '31.25rem';

const htmlUnescape = (htmlString) =>
  htmlString
    .replace(/&gt;/g, '>')
    .replace(/&lt;/g, '<')
    .replace(/&#0?39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&');

const Wrapper = styled.div`
  margin-right: auto;
  margin-left: auto;
  max-width: ${MAX_WIDTH};
`;

const SocialEmbedContainer = ({ blocks }) => {
  const { isAmp } = useContext(RequestContext);
  const { service } = useContext(ServiceContext);
  const { enabled } = useToggle('socialEmbed');

  if (!blocks || !enabled) return null;

  const { type: provider, model } = blocks[0];
  const { id, href } = model;

  const oEmbedHtmlEscaped = path(['embed', 'oembed'], model);
  const oEmbed = oEmbedHtmlEscaped && {
    ...(oEmbedHtmlEscaped && { html: htmlUnescape(oEmbedHtmlEscaped.html) }),
  };

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
