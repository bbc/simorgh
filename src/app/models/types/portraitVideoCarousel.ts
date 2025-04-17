export interface PortraitVideoItem {
  id: string;
  images?: Array<{
    url: string;
    urlTemplate?: string;
    altText?: string;
    type?: string;
    source?: string;
    height?: number;
    width?: number;
    orientation?: 'portrait' | 'landscape';
  }>;
  headlines?: {
    primaryHeadline?: string;
    seoHeadline?: string;
    promoHeadline?: string;
    socialHeadline?: string;
  };
  description?: string;
  link?: {
    path: string;
  };
}
