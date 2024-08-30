export interface Tag {
  '@type'?: string;
  name?: string;
  sameAs?: string[];
  alternateName?: string;
  thingType?: string[];
  thingName?: string;
  thingLabel?: string;
  thingSameAs?: string[];
  'skos:altLabel'?: string;
}

interface BylineLinkedData {
  authorName: string;
  jobRole: string;
  twitterText: string;
  twitterLink: string;
  authorImage: string;
  location: string;
  authorTopicUrl: string;
}

export interface LinkedDataProps {
  showAuthor?: boolean;
  type: string;
  seoTitle?: string;
  headline?: string;
  promoImage?: string;
  description?: string;
  datePublished?: string;
  dateModified?: string;
  aboutTags?: Tag[];
  entities?: object[];
  imageLocator?: string;
  bylineLinkedData?: BylineLinkedData | null;
  coverageStartTime?: string;
  coverageEndTime?: string;
}
