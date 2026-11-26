export interface MostRecentItem {
  id: string;
  headline: string;
  href: string;
  timeAgo: string;
}

export interface MostRecentData {
  items: MostRecentItem[];
}
