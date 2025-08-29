type CollapsibleNavigationSubLink = {
  id: string;
  label: string;
  href: string;
  lang?: string;
  altLabel?: string;
};

export type CollapsibleNavigationSection = {
  id: string;
  title: string;
  href?: string;
  links?: CollapsibleNavigationSubLink[];
};
