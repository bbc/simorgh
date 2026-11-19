export type ArticleEndPreview = {
  id: string;
  title: string;
  href: string;
  imageUrl?: string;
  imageAlt?: string;
  paragraphs: string[];
  excerptSource: 'opening' | 'summary' | 'unavailable';
  readTime?: number;
  firstPublished?: number;
  relationship: 'authored' | 'curated';
};
