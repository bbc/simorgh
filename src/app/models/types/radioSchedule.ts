export interface RadioScheduleData {
  id: string;
  state: 'live' | 'onDemand' | 'next' | string;
  startTime: number | string;
  link: string;
  brandTitle: string;
  summary: string;
  duration: string;
}

export interface CurrentLiveProgramme {
  state: 'live';
  service: string;
  brandTitle: string;
  startTime: string;
  endTime: string;
  duration: string;
  link: string;
}
