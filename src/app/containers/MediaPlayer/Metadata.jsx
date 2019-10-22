import React from 'react';
import Helmet from 'react-helmet';
import { any, arrayOf, shape, string } from 'prop-types';
import mediaPlayerMetadata from './helpers/metadata';

const Metadata = ({ aresMediaBlock }) => {
  const metadata = mediaPlayerMetadata(aresMediaBlock);

  return (
    <Helmet>
      {metadata && (
        <script type="application/ld+json">{JSON.stringify(metadata)}</script>
      )}
    </Helmet>
  );
};

Metadata.propTypes = {
  aresMediaBlock: shape({
    model: shape({
      blocks: arrayOf({
        model: shape(any),
        type: string,
      }).isRequired,
    }),
  }).isRequired,
};

export default Metadata;
