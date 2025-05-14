import { RefObject } from 'react';

export interface PortraitVideoItemProps {
  id: string;
  headlines?: {
    primaryHeadline?: string;
    seoHeadline?: string;
    promoHeadline?: string;
    socialHeadline?: string;
  };
  link?: {
    path: string;
  };
  images?: {
    url: string;
    urlTemplate?: string;
    altText?: string;
    type?: string;
    source?: string;
    height?: number;
    width?: number;
    orientation?: 'portrait' | 'landscape';
  }[];
  video?: {
    id: string;
    isEmbeddingAllowed?: boolean;
    version: {
      id?: string;
      duration: string;
      kind: string;
      territories: string[];
    };
  };
  analytics?: {
    page?: {
      contentId?: string;
    };
  };
  onClick?: () => void;
  key?: string;
}

export interface NavigationButtonsProp {
  scrollPaneRef: RefObject<HTMLDivElement | null>;
}
