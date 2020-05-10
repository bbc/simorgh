import React from 'react';
import { Helmet } from 'react-helmet';
import { string, number } from 'prop-types';
import serialiseForScript from '#lib/utilities/serialiseForScript';

const StructuredData = ({
  promoBrandTitle,
  shortSynopsis,
  durationISO8601,
  embedUrl,
  imageUrl,
  releaseDateTimeStamp,
}) => {
  const metadata = {
    '@context': 'http://schema.org',
    '@type': 'AudioObject',
    name: promoBrandTitle,
    description: shortSynopsis,
    duration: durationISO8601,
    thumbnailUrl: imageUrl,
    uploadDate: new Date(releaseDateTimeStamp).toISOString(),
    embedURL: embedUrl,
  };

  return (
    <Helmet>
      <script type="application/ld+json">{serialiseForScript(metadata)}</script>
    </Helmet>
  );
};

StructuredData.propTypes = {
  promoBrandTitle: string,
  shortSynopsis: string,
  durationISO8601: string,
  embedUrl: string,
  imageUrl: string,
  releaseDateTimeStamp: number,
};

StructuredData.defaultProps = {
  promoBrandTitle: '',
  shortSynopsis: '',
  durationISO8601: '',
  embedUrl: '',
  imageUrl: '',
  releaseDateTimeStamp: null,
};

export default StructuredData;
