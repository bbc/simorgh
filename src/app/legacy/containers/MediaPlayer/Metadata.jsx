import React from 'react';
import { Helmet } from 'react-helmet';
import pathOr from 'ramda/src/pathOr';
import { mediaPlayerMetadata } from './helpers/metadata';

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

export default Metadata;
