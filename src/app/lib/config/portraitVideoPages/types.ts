export type PortraitVideoArticle = {
  url: string;
  title: string;
  duration: string;
  published: string;
  imgSrc: string;
  imgAlt: string;
  videoId?: string;
  versionId?: string;
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
