import React from 'react';
import fixture from '#data/pidgin/topics/c95y35941vrt.json';
import CurationGrid from '.';

const Component = () => {
  return <CurationGrid summaries={fixture.data.curations[0].summaries} />;
};

export default {
  title: 'Components/Curation/Grid - Normal',
  Component,
  parameters: { chromatic: { disable: true } },
};

export const Example = Component;
