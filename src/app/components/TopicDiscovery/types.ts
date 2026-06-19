export type TopicDiscoveryItem = {
  id: string;
  type: 'article' | 'audio' | 'video';
  title: string;
  link: string;
  imageUrl: string;
  imageAlt: string;
  firstPublished: string;
  lastPublished: string;
  isLive: boolean;
  duration?: string;
  description: string;
  isPortraitImage: boolean;
};

export type TopicDiscoveryData = {
  data: {
    items: TopicDiscoveryItem[];
  };
};
