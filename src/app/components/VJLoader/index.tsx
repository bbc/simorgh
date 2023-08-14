import CanonicalIncludeContainer from '#app/legacy/containers/Include/canonical';
import React from 'react';

type OEmbedBlock = {
  id: string;
  type: string;
  link: string;
  oembed: {
    version: string;
    // eslint-disable-next-line camelcase
    provider_name: string;
    // eslint-disable-next-line camelcase
    provider_url: string;
    html: string;
    width: number;
    height: number;
    type: string;
  };
};

const VJLoader = ({ oembed, type }: OEmbedBlock) => {
  const { html } = oembed;
  return <CanonicalIncludeContainer html={html} type={type} index={0} />;
};

export default VJLoader;
