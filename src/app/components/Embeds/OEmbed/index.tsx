/* eslint-disable camelcase */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import { memo, useContext } from 'react';
import pathOr from 'ramda/src/pathOr';
import { RequestContext } from '../../../contexts/RequestContext';
import { ServiceContext } from '../../../contexts/ServiceContext';
import EmbedHtml from '../EmbedHtml';
import EmbedError from '../EmbedError';
import FlourishEmbed from '../FlourishEmbed';
import AmpIframeEmbed from '../AmpIframeEmbed';
import { OEmbedProps } from '../types';

const OEmbedLoader = ({ oembed }: OEmbedProps) => {
  const { isAmp, isLite, canonicalLink } = useContext(RequestContext);
  const { translations } = useContext(ServiceContext);

  if (isLite) return null;

  const { html, provider_name, oEmbedType, parameters, url } = oembed;
  const isVDJEmbed = oEmbedType === 'vdj-embed';

  if (isAmp) {
    if (isVDJEmbed && parameters && url) {
      return <AmpIframeEmbed parameters={parameters} url={url} />;
    }
    const errorMessage = pathOr(
      'Sorry, we can’t display this part of the story on this lightweight mobile page.',
      ['include', 'errorMessage'],
      translations,
    );

    const linkText = pathOr(
      'View the full version of the page to see all the content.',
      ['include', 'linkText'],
      translations,
    );

    return (
      <EmbedError
        message={errorMessage}
        link={{
          text: linkText,
          href: canonicalLink,
        }}
      />
    );
  }

  if (html == null) {
    return null;
  }

  if (provider_name === 'Flourish') {
    return <FlourishEmbed {...oembed} />;
  }

  return <EmbedHtml embeddableContent={html} />;
};

export default memo(OEmbedLoader);
