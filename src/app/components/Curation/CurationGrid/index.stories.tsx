import fixture from '#data/pidgin/topics/c95y35941vrt.json';
import highImpactPromoFixture from '#data/ws/homePage/index.json';
import { Summary } from '#app/models/types/curationData';

import CurationGrid from '.';

const eventTrackingData = {
  componentName: 'curation-grid-normal',
};

const Component = ({ summaries }: { summaries: Summary[] }) => {
  return (
    <CurationGrid summaries={summaries} eventTrackingData={eventTrackingData} />
  );
};

export default {
  title: 'Components/Curation/Grid - Normal',
  Component,
  parameters: { chromatic: { disable: true } },
};

export const Example = () => {
  return (
    <Component summaries={fixture.data?.curations[0].summaries} />
  );
};


export const HighImpactPromo = () => {
  return (
    <Component summaries={highImpactPromoFixture.data.curations[0].summaries as Summary[]} />
  );
};
