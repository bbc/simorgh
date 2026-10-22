export type PortraitVideoArticle = {
  url: string;
  title: string;
  duration: string;
  published: string;
  imgSrc: string;
  imgAlt: string;
  media?: {
    id: string;
    versionId: string;
    holdingImageURL?: string;
    kind?: string;
    guidance?: string | null;
    territories?: string[];
    isEmbeddingAllowed: boolean;
  };
};

export type PortraitVideoSlice = {
  topicId: string;
  title: string;
  articles: PortraitVideoArticle[];
};

export type PortraitVideoPageData = {
  pageTitle: string;
  slices: PortraitVideoSlice[];
};
