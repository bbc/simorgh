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
  script: unknown;
  service: string;
  dir: string;
  id?: string;
  ampOpenClass?: string;
  scrollableListItems: ReactNode;
  dropdownListItems: ReactNode;
  menuAnnouncedText: string;
  ampMenuButton?: ReactNode;
  blocks?: unknown[];
  navItems?: NavigationItem[] | null;
  propsForTopBarOJComponent?: PropsForTopBarOJComponent | null;
  divider?: ReactNode;
  topBarOJs?: ReactNode;
  isOpen?: boolean;
};

export type CanonicalNavigationContainerProps = {
  script: unknown;
  service: string;
  dir: string;
  menuAnnouncedText: string;
  scrollableListItems: ReactNode;
  dropdownListItems: ReactNode;
  blocks?: unknown[];
  navItems?: NavigationItem[] | null;
  propsForTopBarOJComponent?: PropsForTopBarOJComponent | null;
};

export type AmpNavigationContainerProps = {
  script: unknown;
  service: string;
  dir: string;
  menuAnnouncedText: string;
  scrollableListItems: React.ReactNode;
  dropdownListItems: React.ReactNode;
  navItems?: NavigationItem[] | null;
  propsForTopBarOJComponent?: PropsForTopBarOJComponent | null;
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
