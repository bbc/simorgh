import React from 'react';
import Helmet from 'react-helmet';
import { shape } from 'prop-types';
import getMediaPlayerMetadata from './helpers/getMediaPlayerMetadata';

const MediaPlayerMetadata = ({ aresMediaBlock }) => {
  const metadata = getMediaPlayerMetadata(aresMediaBlock);

  return (
    <Helmet>
      {metadata && (
        <script type="application/ld+json">{JSON.stringify(metadata)}</script>
      )}
    </Helmet>
  );
};

MediaPlayerMetadata.propTypes = {
  aresMediaBlock: shape({
    model: shape({}),
  }).isRequired,
};

export default MediaPlayerMetadata;
