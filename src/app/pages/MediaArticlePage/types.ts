import { OptimoBlock } from '../../models/types/optimo';

export type MediaArticlePageProps = {
  pageData: object;
};

export type ComponentToRenderProps = {
  blocks: OptimoBlock[];
};

export type TimestampProps = {
  firstPublished: number;
  lastPublished: number;
  popOut: boolean;
  minutesTolerance?: number;
  className: string;
};
