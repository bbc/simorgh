import React from 'react';
import { Helmet } from 'react-helmet';
import { string } from 'prop-types';
import serialiseForScript from '#lib/utilities/serialiseForScript';

const AudioObject = ({
  name,
  description,
  duration,
  embedURL,
  thumbnailUrl,
  uploadDate,
}) => {
  const metadata = {
    '@context': 'http://schema.org',
    '@type': 'AudioObject',
    name,
    description,
    duration,
    thumbnailUrl,
    uploadDate,
    embedURL,
  };

  return (
    <Helmet>
      <script type="application/ld+json">{serialiseForScript(metadata)}</script>
    </Helmet>
  );
};

AudioObject.propTypes = {
  name: string.isRequired,
  description: string.isRequired,
  duration: string.isRequired,
  embedURL: string.isRequired,
  thumbnailUrl: string.isRequired,
  uploadDate: string.isRequired,
};

export default AudioObject;
