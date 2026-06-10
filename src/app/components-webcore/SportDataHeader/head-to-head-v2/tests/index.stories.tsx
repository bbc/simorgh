import { secondLegAETInPensData } from '../static-data/event/transformed/mid-event';
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
  parameters: {
    chromatic: {
      viewports: [899],
    },
  },
  tags: ['!dev'],
};

export const TestInPenaltiesAfterExtraTimeSecondLegPersian = {
  render: () => (
    <Component
      data={secondLegAETInPensData as unknown as HeadToHeadV2Data}
      service={'persian'}
    />
  ),
  parameters: {
    chromatic: {
      viewports: [899],
    },
  },
  tags: ['!dev'],
  globals: {},
};
