import React from 'react';
import { Helmet } from 'react-helmet';
import { string, number } from 'prop-types';
import serialiseForScript from '#lib/utilities/serialiseForScript';

const VideoLinkedData = ({
  promoBrandTitle,
  shortSynopsis,
  durationISO8601,
  embedUrl,
  thumbnailImageUrl,
  releaseDateTimeStamp,
}) => {
  const metadata = {
    '@context': 'http://schema.org',
    '@type': 'VideoObject',
    name: promoBrandTitle,
    description: shortSynopsis,
    duration: durationISO8601,
    thumbnailUrl: thumbnailImageUrl,
    datePublished: new Date(releaseDateTimeStamp).toISOString(),
    embedURL: embedUrl,
  };

  return (
    <Helmet>
      <script type="application/ld+json">{serialiseForScript(metadata)}</script>
    </Helmet>
  );
};

VideoLinkedData.propTypes = {
  promoBrandTitle: string,
  shortSynopsis: string,
  durationISO8601: string,
  embedUrl: string,
  thumbnailImageUrl: string,
  releaseDateTimeStamp: number,
};

VideoLinkedData.defaultProps = {
  promoBrandTitle: '',
  shortSynopsis: '',
  durationISO8601: '',
  embedUrl: '',
  thumbnailImageUrl: '',
  releaseDateTimeStamp: null,
};

export default VideoLinkedData;
