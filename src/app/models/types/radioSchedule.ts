export interface RadioScheduleData {
  id: string;
  state: 'live' | 'onDemand' | 'next' | string;
  startTime: number;
  link: string;
  brandTitle: string;
  summary: string;
  duration: string;
}
