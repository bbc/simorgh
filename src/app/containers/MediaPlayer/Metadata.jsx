import React from 'react';
import Helmet from 'react-helmet';
import { arrayOf, number, shape, string } from 'prop-types';
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
      blocks: arrayOf(
        // aresMediaMetadata
        shape({
          model: shape({
            format: string,
            title: string,
            synopses: shape({
              short: string,
            }),
            versions: arrayOf(
              shape({
                duration: number,
                availableFrom: number,
              }),
            ),
            imageUrl: string,
          }),
        }),
        // image
        shape({}),
      ),
    }),
  }).isRequired,
};

export default Metadata;
