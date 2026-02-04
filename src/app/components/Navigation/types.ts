import { ReactNode } from 'react';

export type NavigationSubItem = {
  title: string;
  url: string;
  hideOnLiteSite?: boolean;
  subItems?: NavigationSubItem[];
};

export type NavigationItem = {
  title: string;
  url: string;
  hideOnLiteSite?: boolean;
  subItems?: NavigationSubItem[];
};

export type PropsForTopBarOJComponent = {
  blocks?: unknown[];
  experimentVariant?: string;
};

export type NavigationContainerProps = {
  navItems?: NavigationItem[] | null;
  propsForTopBarOJComponent?: PropsForTopBarOJComponent | null;
};

export type CanonicalNavigationContainerProps = {
  script: unknown;
  service: string;
  dir: string;
  menuAnnouncedText: string;
  scrollableListItems: ReactNode;
  dropdownListItems: ReactNode;
  blocks?: unknown[];
};

export type AmpNavigationContainerProps = {
  script: unknown;
  service: string;
  dir: string;
  menuAnnouncedText: string;
  scrollableListItems: React.ReactNode;
  dropdownListItems: React.ReactNode;
};

export type NavigationBaseProps = {
  script: unknown;
  service: string;
  dir: string;
  children: ReactNode;
  isOpen?: boolean;
  ampOpenClass?: string | null;
  id?: string;
};
