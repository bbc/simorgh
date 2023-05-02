type ChartbeatConfig = {
  domain: string;
  sections: string;
  uid: number;
  title: string;
  virtualReferrer: string | null;
  idSync?: {
    // eslint-disable-next-line camelcase
    bbc_hid: string;
  };
};

export type CanonicalChartbeatConfig = ChartbeatConfig & {
  type: string;
  useCanonical: boolean;
};

export interface CanonicalChartbeatProps {
  chartbeatConfig: CanonicalChartbeatConfig;
  chartbeatSource?: string;
}

export type AmpChartbeatConfig = ChartbeatConfig & {
  contentType?: string | null;
};

export interface AmpChartbeatProps {
  chartbeatConfig: AmpChartbeatConfig;
}

export interface ChartbeatProps {
  sectionName?: string; // required for STY and MAP pages
  categoryName?: string; // required for STY and MAP pages
  mediaPageType?: string; // required for Live & On Demand Radio, Podcasts & On Demand TV pages
  title: string;
  taggings?: {
    predicate: string;
    value: string;
  }[]; // required for Media Article Pages
  contentType?: string; // required for Live & On Demand Radio, Podcasts & On Demand TV pages
  producer?: string; // required for Media Article, STY, MAP, Live & On Demand Radio, Podcasts & On Demand TV pages, if available
  chapter?: string; // required for Media Article, STY, MAP, Live & On Demand Radio, Podcasts & On Demand TV pages, if available
}
