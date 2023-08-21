/* eslint-disable camelcase */
import React, { useContext } from 'react';
import pathOr from 'ramda/src/pathOr';
import { ServiceContext } from '../../../contexts/ServiceContext';
import { RequestContext } from '../../../contexts/RequestContext';
import EmbedHtml from '../EmbedHtml';
import EmbedError from '../EmbedError';

export type OEmbedProps = {
  type: string;
  oembed: {
    version: string;
    provider_name: string;
    provider_url: string;
    html: string;
    url?: string;
    source?: string;
    width?: number;
    height?: number;
    type: string;
  };
};

const OEmbedLoader = ({ oembed }: OEmbedProps) => {
  const { translations } = useContext(ServiceContext);
  const { isAmp, canonicalLink } = useContext(RequestContext);
  const { html } = oembed;

  if (isAmp) {
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

  return <EmbedHtml embeddableContent={html} />;
};

export default OEmbedLoader;
