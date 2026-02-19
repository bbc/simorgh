import { Navigation } from '#app/models/types/global';
import { TopStoryItem } from '#app/pages/ArticlePage/PagePromoSections/TopStoriesSection/types';

export interface AmpNavigationContainerProps {
  service: string;
  dir: string;
  menuAnnouncedText: string;
  topScrollableListItems?: React.ReactNode;
  scrollableListItems: React.ReactNode;
  dropdownListItems: React.ReactNode;
}

export interface NavigationContainerProps {
  navItems: Navigation[];
  currentPath: string;
  propsForTopBarOJComponent?: {
    blocks?: TopStoryItem[];
  };
}
