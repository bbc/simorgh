import { ChartbeatProps } from '#app/components/ChartbeatAnalytics/types';
import { LiveRadioBlock } from '#app/models/types/media';

export type LiveRadioPageData = {
  language: string;
  name: string;
  summary: string;
  heading: string;
  bodySummary: string;
  contentType: ChartbeatProps['contentType'];
  radioScheduleData: [];
  mediaBlock: LiveRadioBlock[];
};
