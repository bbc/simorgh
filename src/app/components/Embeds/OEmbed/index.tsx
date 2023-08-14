/* eslint-disable camelcase */

import React from 'react';
import EmbedHtml from '../EmbedHtml';

type OEmbedBlock = {
  id: string;
  type: string;
  link: string;
  oembed: {
    version: string;
    provider_name: string;
    provider_url: string;
    html: string;
    url?: string;
    width?: number;
    height?: number;
    type: string;
  };
};

const OEmbedLoader = ({ oembed }: OEmbedBlock) => {
  const { html } = oembed;
  console.log('CHECK', html);
  return <EmbedHtml embeddableContent={html} />;
};

export default OEmbedLoader;
