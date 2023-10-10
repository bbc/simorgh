/* eslint-disable camelcase */
import React, { useContext } from 'react';
import pathOr from 'ramda/src/pathOr';
import { ServiceContext } from '../../../contexts/ServiceContext';
import { RequestContext } from '../../../contexts/RequestContext';
import EmbedHtml from '../EmbedHtml';
import EmbedError from '../EmbedError';
import Flourish from './Flourish';
import { OEmbedProps } from './types';

const OEmbedLoader = ({ oembed }: OEmbedProps) => {
  const { translations } = useContext(ServiceContext);
  const { isAmp, canonicalLink } = useContext(RequestContext);
  const { html, provider_name } = oembed;

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

  if (provider_name === 'Flourish') {
    return <Flourish oembed={oembed} />;
  }

  return <EmbedHtml embeddableContent={html} />;
};

export default OEmbedLoader;
