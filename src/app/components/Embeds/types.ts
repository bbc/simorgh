/* eslint-disable camelcase */
export type ampParams = {
  'amp-clickable': boolean;
  'amp-image-height': number;
  'amp-image-width': number;
  'amp-image': string;
};

export type OEmbedData = Partial<{
  version: string;
  provider_name: string;
  provider_url: string;
  html: string | null;
  url: string;
  source: string;
  width: number | string;
  height: number | string;
  type: string;
  iFrameSrc: string;
  iFrameId: string;
  iFrameTitle: string;
  sizeAdjustScript: string;
  parameters: ampParams;
  oEmbedType: string;
  riddleId: string;
}>;

export type OEmbedProps = {
  oembed: OEmbedData;
};
