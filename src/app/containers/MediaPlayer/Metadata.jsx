import React from 'react';
import Helmet from 'react-helmet';
import videoMetadata from './helpers/metadata';

const Metadata = aresMediaBlock => {
  const metadata = videoMetadata(aresMediaBlock);

  return (
    <Helmet>
      {metadata && (
        <script type="application/ld+json">{JSON.stringify(metadata)}</script>
      )}
    </Helmet>
  );
};

export default Metadata;
