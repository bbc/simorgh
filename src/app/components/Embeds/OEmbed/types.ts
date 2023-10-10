/* eslint-disable camelcase */
export type OEmbedProps = {
  oembed: {
    version: string;
    provider_name: string;
    provider_url: string;
    html: string;
    url?: string;
    source?: string;
    width?: number;
    height?: number;
    type: string;
  };
};
