export interface Summary {
  imageUrl?: string;
  link?: string;
  imageAlt?: string;
  description?: string;
  title: string;
  id?: string;
  type?: string;
  firstPublished?: string | number;
}

export interface Curation {
  visualStyle: string;
  visualProminence: string;
  promos: Summary[];
  title: string;
  link: string;
  headingLevel: number;
  position: number;
  topStoriesTitle: string;
  curationLength: number;
}
