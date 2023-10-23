/* eslint-disable camelcase */
import React, { useContext } from 'react';
import { RequestContext } from '../../../contexts/RequestContext';
import EmbedHtml from '../EmbedHtml';
import EmbedAmp, { ampParams } from '../EmbedAmp';

type OEmbedData = Partial<{
  version: string;
  provider_name: string;
  provider_url: string;
  html: string;
  url: string;
  source: string;
  width: number;
  height: number;
  type: string;
  parameters: ampParams;
  oEmbedType: string;
}>;

export type OEmbedProps = {
  type: string;
  oembed: OEmbedData;
};

const OEmbedLoader = ({ oembed }: OEmbedProps) => {
  const { isAmp, canonicalLink } = useContext(RequestContext);
  const { html, oEmbedType, parameters, url } = oembed; // check
  const isVDJEmbed = oEmbedType === 'vdj-embed';

  if (isAmp) {
    <EmbedAmp
      isVDJEmbed={isVDJEmbed}
      canonicalLink={canonicalLink}
      parameters={parameters}
      url={url}
    />;
  }

  if (html == null) {
    return null;
  }

  return <EmbedHtml embeddableContent={html} />;
};

export default OEmbedLoader;
