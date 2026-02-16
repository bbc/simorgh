// ...existing code...

import { TopStoryItem } from '#app/pages/ArticlePage/PagePromoSections/TopStoriesSection/types';

export interface AmpNavigationContainerProps {
  script: unknown;
  service: string;
  dir: string;
  menuAnnouncedText: string;
  scrollableListItems: React.ReactNode;
  dropdownListItems: React.ReactNode;
}

export interface NavigationItem {
  title: string;
  url: string;
  hideOnLiteSite?: boolean;
  subItems?: NavigationItem[];
}

export interface NavigationContainerProps {
  navItems: NavigationItem[];
  currentPath: string;
  propsForTopBarOJComponent?: {
    blocks?: TopStoryItem[];
  };
}
