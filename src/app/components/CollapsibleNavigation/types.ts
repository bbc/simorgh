type CollapsibleNavigationSubLink = {
  id: string;
  label: string;
  href: string;
};

export type CollapsibleNavigationSection = {
  id: string;
  title: string;
  href?: string;
  links?: CollapsibleNavigationSubLink[];
};
