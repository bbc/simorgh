export type PortraitVideoArticle = {
  url: string;
  title: string;
  duration: string;
  published: string;
  imgSrc: string;
  imgAlt: string;
};

export type PortraitVideoPageData = {
  pageTitle: string;
  topicTitles: Record<string, string>;
  topics: Record<string, PortraitVideoArticle[]>;
};
