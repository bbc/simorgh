/* eslint-disable camelcase */
import React, { useContext, useEffect, useRef } from 'react';
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
  const { html, width, height, provider_name } = oembed;
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      const message = typeof event.data === 'string' && JSON.parse(event.data);
      if (
        iframeRef.current &&
        message?.sender === 'Flourish' &&
        message?.context === 'iframe.resize'
      ) {
        iframeRef.current.style.height = `${message.height}px`;
      }
    };

    window.addEventListener('message', onMessage);

    return () => window.removeEventListener('message', onMessage);
  });

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
    const iframeSrc = html.match(/(?<=src=").*?(?=[?"])/)?.[0];
    return (
      <iframe
        src={`${iframeSrc}?auto=1`}
        ref={iframeRef}
        frameBorder="0"
        scrolling="no"
        height={height}
        width={width}
        style={{ width: '100%' }}
        title="Interactive or visual content"
      />
    );
  }

  return <EmbedHtml embeddableContent={html} />;
};

export default OEmbedLoader;
