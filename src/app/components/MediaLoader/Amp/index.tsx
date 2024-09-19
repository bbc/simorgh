import React from 'react';
import { Helmet } from 'react-helmet';
import ImagePlaceholder from '#psammead/psammead-image-placeholder/src';
import Message from './Message';

const AmpHead = () => (
  <Helmet>
    <script
      async
      custom-element="amp-iframe"
      src="https://cdn.ampproject.org/v0/amp-iframe-0.1.js"
    />
  </Helmet>
);

type Props = {
  src?: string;
  placeholderSrc?: string;
  placeholderSrcset?: string;
  title?: string;
  noJsMessage?: string;
};

const AmpMediaLoader = ({
  src,
  placeholderSrc,
  placeholderSrcset,
  title,
  noJsMessage,
}: Props) => {
  return (
    <>
      <AmpHead />
      <amp-iframe
        sandbox="allow-scripts allow-same-origin"
        layout="fill"
        // @ts-expect-error - 'scrolling' does not exist in type
        scrolling="no"
        frameborder="0"
        src={src}
        title={title}
        allowfullscreen="allowfullscreen"
        data-e2e="media-player"
      >
        <ImagePlaceholder ratio={56.25} placeholder="" />
        <noscript>
          <Message
            message={noJsMessage}
            placeholderSrc={placeholderSrc}
            placeholderSrcset={placeholderSrcset}
          />
        </noscript>
      </amp-iframe>
    </>
  );
};

export default AmpMediaLoader;
