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

export type AmpChartbeatConfig = ChartbeatConfig & { contentType?: string };

export interface AmpChartbeatProps {
  chartbeatConfig: AmpChartbeatConfig;
}

export interface ChartbeatProps {
  sectionName?: string;
  mediaPageType?: string;
  categoryName?: string;
  title: string;
  taggings?: {
    predicate: string;
    value: string;
  }[];
  contentType?: string;
}
