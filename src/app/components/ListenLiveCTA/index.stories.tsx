import { ServiceContextProvider } from '#app/contexts/ServiceContext';
import { CurrentLiveProgramme } from '#app/models/types/radioSchedule';
import ListenLiveCTA from '.';

const inOneHour = () => new Date(Date.now() + 60 * 60 * 1000).toISOString();
const oneHourAgo = () => new Date(Date.now() - 60 * 60 * 1000).toISOString();

const baseProgramme: CurrentLiveProgramme = {
  state: 'live',
  service: 'arabic',
  brandTitle: 'BBC Arabic Radio',
  startTime: oneHourAgo(),
  endTime: inOneHour(),
  duration: 'PT2H',
  link: '/arabic/bbc_arabic_radio/liveradio',
};

const Component = ({
  service = 'arabic',
  variant = 'default',
  programme,
}: {
  service?: string;
  variant?: string;
  programme: CurrentLiveProgramme | null;
}) => (
  <ServiceContextProvider service={service as never} variant={variant as never}>
    <ListenLiveCTA programme={programme} />
  </ServiceContextProvider>
);

export default {
  title: 'Components/ListenLiveCTA',
  Component,
};

export const LiveProgrammePresent = () => (
  <Component programme={baseProgramme} />
);

export const RightToLeftService = () => (
  <Component
    service="pashto"
    programme={{
      ...baseProgramme,
      service: 'pashto',
      brandTitle: 'BBC Pashto Radio',
      link: '/pashto/bbc_pashto_radio/liveradio',
    }}
  />
);

export const NoLiveProgramme = () => <Component programme={null} />;

export const ExpiredProgramme = () => (
  <Component
    programme={{
      ...baseProgramme,
      startTime: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      endTime: oneHourAgo(),
    }}
  />
);
