import React from 'react';
import { string, number } from 'prop-types';
import { Helmet } from 'react-helmet';
import { AmpImg } from '@bbc/psammead-image';
import Message from '../Message';

const AmpHead = () => (
  <Helmet>
    <script
      async
      custom-element="amp-iframe"
      src="https://cdn.ampproject.org/v0/amp-iframe-0.1.js"
    />
  </Helmet>
);

const AmpMediaPlayer = ({
  src,
  placeholderSrc,
  placeholderSrcset,
  title,
  height,
  width,
  noJsMessage,
  service,
}) => {
  return (
    <>
      <AmpHead />
      <amp-iframe
        data-e2e="media-player"
        sandbox="allow-scripts allow-same-origin"
        layout="fill"
        scrolling="no"
        frameborder="0"
        src={src}
        title={title}
        allowfullscreen="allowfullscreen"
      >
        <AmpImg
          data-e2e="media-player__placeholder"
          layout="fill"
          src={placeholderSrc}
          srcset={placeholderSrcset}
          placeholder
          alt=""
          height={height}
          width={width}
        />
        <noscript>
          <Message
            service={service}
            message={noJsMessage}
            placeholderSrc={placeholderSrc}
            placeholderSrcset={placeholderSrcset}
          />
        </noscript>
      </amp-iframe>
    </>
  );
};

AmpMediaPlayer.propTypes = {
  src: string.isRequired,
  placeholderSrc: string.isRequired,
  placeholderSrcset: string,
  title: string.isRequired,
  height: number.isRequired,
  width: number.isRequired,
  noJsMessage: string.isRequired,
  service: string.isRequired,
};
AmpMediaPlayer.defaultProps = {
  placeholderSrcset: null,
};

export default AmpMediaPlayer;
