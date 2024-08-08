import { OptimoBlock } from '../../models/types/optimo';

export type ComponentToRenderProps = {
  blocks: OptimoBlock[];
};

export type AtomicVersionProps = {
  available: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  blocks: any;
  embedding: boolean;
  externalId: string;
  format: string;
  id: string;
  live: boolean;
  subType: string;
};

export type TimestampProps = {
  firstPublished: number;
  lastPublished: number;
  popOut: boolean;
  minutesTolerance?: number;
  className: string;
};

export type EmbedHtmlProps = {
  embeddableContent: string;
};
