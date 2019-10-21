import React from 'react';
import Helmet from 'react-helmet';
import { shape, string, array } from 'prop-types';
import videoMetadata from './helpers/metadata';

const Metadata = ({ aresMediaBlock }) => {
  const metadata = videoMetadata(aresMediaBlock);

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
    id: string,
    type: string,
    model: shape({}),
    position: array,
  }).isRequired,
};

export default Metadata;
