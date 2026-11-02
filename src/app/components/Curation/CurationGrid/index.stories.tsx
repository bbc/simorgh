import fixture from '#data/pidgin/topics/c95y35941vrt.json';
import highImpactPromoFixture from '#data/ws/homePage/index.json';
import videoFixture from '#data/arabic/topics/cz9mm6r1q5et.json';
import { Summary } from '#app/models/types/curationData';

import CurationGrid from '.';

const eventTrackingData = {
  componentName: 'curation-grid-normal',
};

const Component = ({
  summaries,
  isVideoCollection = false,
}: {
  summaries: Summary[];
  isVideoCollection?: boolean;
}) => {
  return (
    <CurationGrid
      summaries={summaries}
      eventTrackingData={eventTrackingData}
      isVideoCollection={isVideoCollection}
    />
  );
};

export default {
  title: 'Components/Curation/Grid - Normal',
  Component,
  parameters: { chromatic: { disable: true } },
};

export const Example = () => {
  return <Component summaries={fixture.data?.curations[0].summaries} />;
};

export const HighImpactPromo = () => {
  return (
    <Component
      summaries={
        highImpactPromoFixture.data.curations[0].summaries as Summary[]
      }
    />
  );
};

export const isVideoCollection = () => {
  return (
    <Component
      summaries={videoFixture.data?.curations[1].summaries as Summary[]}
      isVideoCollection
    />
  );
};
