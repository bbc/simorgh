import {
  secondLegAETInPensData,
  etFirstHalfData,
} from '../static-data/event/transformed/mid-event';
import {
  postEventData,
  postEventPens90Data,
} from '../static-data/event/transformed/post-event';
import { HeadToHeadV2 } from '../head-to-head-v2';
import { HeadToHeadV2Data } from '../types';
import { ServiceContextProvider } from '#app/contexts/ServiceContext';
import { Services } from '#app/models/types/global';

const Component = ({
  data,
  service,
}: {
  data: HeadToHeadV2Data;
  service: Services;
}) => {
  return (
    <ServiceContextProvider service={service}>
      <HeadToHeadV2 initialSportData={data as unknown as HeadToHeadV2Data} />
    </ServiceContextProvider>
  );
};

export default {
  Component: Component,
  title: 'Head To Head V2/Chromatic Tests',
};

export const TestInPenaltiesAfterExtraTimeSecondLegAfrique = {
  render: () => (
    <Component
      data={secondLegAETInPensData as unknown as HeadToHeadV2Data}
      service={'afrique'}
    />
  ),
  tags: ['!dev'],
};

export const TestInPenaltiesAfterExtraTimeSecondLegPersian = {
  render: () => (
    <Component
      data={secondLegAETInPensData as unknown as HeadToHeadV2Data}
      service={'persian'}
    />
  ),
  tags: ['!dev'],
};

export const TestEtFirstHalfDataAfrique = {
  render: () => (
    <Component
      data={etFirstHalfData as unknown as HeadToHeadV2Data}
      service={'afrique'}
    />
  ),
  tags: ['!dev'],
};

export const TestEtFirstHalfDataPersian = {
  render: () => (
    <Component
      data={etFirstHalfData as unknown as HeadToHeadV2Data}
      service={'persian'}
    />
  ),
  tags: ['!dev'],
};

export const TestFullTimeAfrique = {
  render: () => (
    <Component
      data={postEventData as unknown as HeadToHeadV2Data}
      service={'afrique'}
    />
  ),
  tags: ['!dev'],
};

export const TestFullTimePersian = {
  render: () => (
    <Component
      data={postEventData as unknown as HeadToHeadV2Data}
      service={'persian'}
    />
  ),
  tags: ['!dev'],
};

export const TestPenaltiesAfter90MinsAfrique = {
  render: () => (
    <Component
      data={postEventPens90Data as unknown as HeadToHeadV2Data}
      service={'afrique'}
    />
  ),
  tags: ['!dev'],
};

export const TestPenaltiesAfter90MinsPersian = {
  render: () => (
    <Component
      data={postEventPens90Data as unknown as HeadToHeadV2Data}
      service={'persian'}
    />
  ),
  tags: ['!dev'],
};
