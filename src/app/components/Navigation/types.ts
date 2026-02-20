import { Direction, Navigation } from '#app/models/types/global';
import { TopStoryItem } from '#app/pages/ArticlePage/PagePromoSections/TopStoriesSection/types';

export interface AmpNavigationContainerProps {
  dir: Direction;
  menuAnnouncedText: string;
  topScrollableListItems?: React.ReactNode;
  bottomScrollableListItems: React.ReactNode;
  dropdownListItems: React.ReactNode;
}

export interface NavigationContainerProps {
  navItems: Navigation[];
  currentPath: string;
  propsForTopBarOJComponent?: {
    blocks?: TopStoryItem[];
  };
}
