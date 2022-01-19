import React from 'react';
import { string, number } from 'prop-types';
import { Helmet } from 'react-helmet';
import { AmpImg } from '@bbc/psammead-image';
import { C_LUNAR } from '@bbc/psammead-styles/colours';
import { BBC_BLOCKS } from '@bbc/psammead-assets/svgs';
import Message from '../Message';

const bgImageRegular = `url(data:image/svg+xml;base64,${BBC_BLOCKS})`;

const placeholderImgStyle = {
  position: 'relative',
  overflow: 'hidden',
  backgroundColor: C_LUNAR,
  backgroundPosition: 'center center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: '93px 27px',
  backgroundImage: bgImageRegular,
};

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
        sandbox="allow-scripts allow-same-origin"
        layout="fill"
        scrolling="no"
        frameborder="0"
        src={src}
        title={title}
        allowfullscreen="allowfullscreen"
        data-e2e="media-player"
      >
        <AmpImg
          layout="fill"
          style={placeholderImgStyle}
          src=""
          placeholder
          alt=""
          height={height}
          width={width}
          data-e2e="media-player__placeholder"
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
