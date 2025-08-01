import { GroupTracker } from '#app/components/ATIAnalytics/types';
import { PortraitClipMediaBlock } from '#app/components/MediaLoader/types';
import { RefObject } from 'react';

export interface PortraitVideoPromoProps {
  id: string;
  block: PortraitClipMediaBlock;
  onClick?: () => void;
  key?: string;
  groupTracker?: GroupTracker;
  blockPosition?: number;
}

export interface PortraitVideoCarouselNavigationProps {
  scrollPaneRef: RefObject<HTMLUListElement | null>;
}

export interface PortraitVideoCarouselProps {
  title: string;
  groupTrackingId?: string;
  blocks: PortraitVideoPromoProps[];
}

export type ScrollDirection = 'left' | 'right' | 'up' | 'down';
