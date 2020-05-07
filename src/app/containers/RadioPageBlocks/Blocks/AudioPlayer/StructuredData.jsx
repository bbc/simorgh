import React from 'react';
import { Helmet } from 'react-helmet';
import { string, number } from 'prop-types';

const StructuredData = ({
  promoBrandTitle,
  shortSynopsis,
  durationISO8601,
  embedUrl,
  imageUrl,
  episodeAvailableFrom,
}) => {
  const metadata = {
    '@context': 'http://schema.org',
    '@type': 'AudioObject',
    name: promoBrandTitle,
    description: shortSynopsis,
    duration: durationISO8601,
    thumbnailUrl: imageUrl,
    uploadDate: new Date(episodeAvailableFrom).toISOString(),
    embedURL: embedUrl,
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(metadata)}</script>
    </Helmet>
  );
};

StructuredData.propTypes = {
  promoBrandTitle: string,
  shortSynopsis: string,
  durationISO8601: string,
  embedUrl: string,
  imageUrl: string,
  episodeAvailableFrom: number,
};

StructuredData.defaultProps = {
  promoBrandTitle: '',
  shortSynopsis: '',
  durationISO8601: '',
  embedUrl: '',
  imageUrl: '',
  episodeAvailableFrom: null,
};

export default StructuredData;
