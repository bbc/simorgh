export interface AlternateLink {
  href: string;
  hrefLang?: string | null | undefined;
}

export interface AppleItunesApp {
  iTunesAppId?: number;
  canonicalLink?: string;
  isAmp?: boolean;
  hasAppleItunesAppBanner?: boolean;
}

export interface IconSizes {
  'apple-touch-icon': string[];
  icon: string[];
}

export type IconType = 'apple-touch-icon' | 'icon';

export interface Tag {
  thingUri: string;
  topicId: string;
  topicName: string;
  curationType: string[];
  thingId: string;
  thingLabel: string;
  thingType: string[];
  thingSameAs: string[];
}

export interface MetadataProps {
  title: string;
  socialHeadline?: string;
  lang: string;
  twitterHandle?: string;
  description?: string;
  openGraphType: string;
  aboutTags?: Tag[];
  mentionsTags?: Tag[];
  image?: string;
  imageAltText?: string;
  imageWidth?: number;
  imageHeight?: number;
  children?: string[];
  hasAppleItunesAppBanner?: boolean;
  hasAmpPage?: boolean;
}

interface Headlines {
  seoHeadline: string;
}
interface Promo {
  headlines: Headlines;
}

interface Passport {
  language: string;
}

interface Metadata {
  passport: Passport;
}

export interface PageDataProps {
  promo: Promo;
  metadata: Metadata;
}
