import fixtureData from '#data/afrique/live/c7gk1vjglxn1t.json';
import HeadToHeadV2 from './';
import type { HeadToHeadV2Data } from './head-to-head-v2';
import metadata from './metadata.json';
// import mdx from './head-to-head-v2.mdx'; // to do - TS does not like the naming of this file

type StoryData = HeadToHeadV2Data & {
  onwardJourneyLink?: string;
  tipoTopicId?: string;
};

interface ComponentProps {
  data: StoryData;
  isConciseView?: boolean;
  shouldShowActions?: boolean;
  maximumContainerScoreDigits?: string;
  teamBadgePlaceholderFallbackType?: 'badge' | 'flag';
}

// @ts-expect-error - PS copy and paste
const baseData = fixtureData.data.sportDataEventContent.content.data
  .sportDataEvent as StoryData;

const Component = ({
  data,
  isConciseView = false,
  shouldShowActions = true,
  maximumContainerScoreDigits,
  teamBadgePlaceholderFallbackType = 'badge',
}: ComponentProps) => {
  return (
    // @ts-expect-error - PS copy and paste
    <HeadToHeadV2
      data={data}
      isConciseView={isConciseView}
      shouldShowActions={shouldShowActions}
      maximumContainerScoreDigits={maximumContainerScoreDigits}
      teamBadgePlaceholderFallbackType={teamBadgePlaceholderFallbackType}
    />
  );
};

export default {
  title: 'Components/Live Page Sport Data Header/Head To Head V2 - General',
  Component,
  parameters: {
    metadata,
    docs: {
      description: {
        component:
          'The `Head To Head V2` component is used to render event data.',
      },
      // page: mdx,
    },
  },
};

export const Default = () => <Component data={baseData} />;

export const ConciseView = () => (
  <Component data={baseData} isConciseView shouldShowActions={false} />
);

export const WithOnwardJourneyLink = () => (
  <Component
    data={{
      ...baseData,
      tipoTopicId: 'cvp5j5ndx5nt',
      onwardJourneyLink: '/sport/football/live/cvp5j5ndx5nt',
    }}
    isConciseView
    shouldShowActions={false}
  />
);

export const WithFlagPlaceholderFallback = () => (
  <Component data={baseData} teamBadgePlaceholderFallbackType="flag" />
);
