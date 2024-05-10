export type OptimoBlock = {
  type: string;
  model: object;
  id?: string;
  position?: number[];
  blockGroupType?: string;
  blockGroupIndex?: number;
};

export type ArticleMetadata = object & {
  allowAdvertising?: boolean;
};

export type ArticleContent = {
  model: {
    blocks: OptimoBlock[];
  };
};

export type Article = {
  metadata: ArticleMetadata;
  content: ArticleContent;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  promo: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  relatedContent: any;
};
