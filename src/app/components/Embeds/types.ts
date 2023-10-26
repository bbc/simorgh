/* eslint-disable camelcase */
export type OEmbedData = Partial<{
  version: string;
  provider_name: string;
  provider_url: string;
  html: string;
  url: string;
  source: string;
  width: number;
  height: number;
  type: string;
  iFrameSrc: string;
  iFrameId: string;
  iFrameTitle: string;
  sizeAdjustScript: string;
}>;

export type OEmbedProps = {
  type: string;
  oembed: OEmbedData;
};
