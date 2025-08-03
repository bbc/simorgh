import { PortraitClipMediaBlock } from '#app/components/MediaLoader/types';
import { RefObject } from 'react';

export interface PortraitVideoCarouselNavigationProps {
  scrollPaneRef: RefObject<HTMLUListElement | null>;
}

export interface PortraitVideoCarouselProps {
  title: string;
  groupTrackingId?: string;
  blocks: PortraitClipMediaBlock[];
}

export type ScrollDirection = 'left' | 'right' | 'up' | 'down';
