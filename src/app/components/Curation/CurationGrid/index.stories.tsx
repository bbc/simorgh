import React from 'react';
import fixture from '#data/pidgin/topics/c95y35941vrt.json';
import CurationGrid from '.';
import { Summary } from '#app/models/types/curationData';

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
    <Component summaries={fixture.data?.curations[0].summaries as Summary[]} />
  );
};

export const HighImpactPromo = () => {
  return (
    <Component summaries={fixture.data?.curations[1].summaries as Summary[]} />
  );
};
