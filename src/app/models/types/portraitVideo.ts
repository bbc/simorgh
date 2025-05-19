import { GroupTracker } from '#app/components/ATIAnalytics/types';
import { RefObject } from 'react';

export interface PortraitVideoPromoProps {
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
    orientation?: ScreenOrientation;
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
  groupTracker?: GroupTracker;
  itemPosition?: number;
}

export interface PortraitVideoCarouselNavigationProps {
  scrollPaneRef: RefObject<HTMLDivElement | null>;
}

export interface PortraitVideoCarouselProps {
  title: string;
  curationId?: string;
  items: PortraitVideoPromoProps[];
}

export type ScrollDirection = 'left' | 'right' | 'up' | 'down';
