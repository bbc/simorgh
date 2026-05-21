import { HeadToHeadV2Data } from '#app/components-webcore/SportDataHeader/head-to-head-v2/types';

export type SportDataPollingPayload = {
  title: string;
  live: boolean;
  startDateTime: string;
  countingServiceDataAverage?: number;
  sportDataEvent: HeadToHeadV2Data;
};

export type SportDataPollingResponse = {
  data: SportDataPollingPayload;
};
