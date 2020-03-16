import React from 'react';
import Helmet from 'react-helmet';
import pathOr from 'ramda/src/pathOr';
import { shape, string } from 'prop-types';
import { mediaPlayerMetadata } from './utilities/metadata';

const Metadata = ({ aresMediaBlock, embedSource }) => {
  const aresMediaBlocks = pathOr(null, ['model', 'blocks'], aresMediaBlock);

  if (!aresMediaBlocks || aresMediaBlocks.length < 1) {
    return null;
  }

  const metadata = mediaPlayerMetadata(aresMediaBlocks, embedSource);

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
    model: shape({}).isRequired,
  }).isRequired,
  embedSource: string.isRequired,
};

export default Metadata;
