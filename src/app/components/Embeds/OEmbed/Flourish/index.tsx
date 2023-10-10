/* eslint-disable camelcase */
import React, { useEffect, useRef } from 'react';
import { OEmbedProps } from '../types';

const Flourish = ({ oembed }: OEmbedProps) => {
  const { html, width, height } = oembed;
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
};

export default Flourish;
