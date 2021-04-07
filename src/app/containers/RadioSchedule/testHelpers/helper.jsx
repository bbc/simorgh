/* eslint-disable react/prop-types */
import { TEXT_VARIANTS } from '@bbc/psammead-storybook-helpers';
import { boolean } from '@storybook/addon-knobs';
import React from 'react';
import ProgramCard from '../ProgramCard';
import { ServiceContextProvider } from '#contexts/ServiceContext';

// Will remove and clean up in future PRs
export const stateTypes = ['live', 'onDemand', 'onDemand', 'next'];
export const uniqueStates = ['live', 'onDemand', 'next'];

export const renderProgramCard = ({
  state,
  script,
  service = 'news',
  duration = 'PT30M',
  durationLabel = 'Duration %duration%',
  startTime = 1566914061212,
  displaySummary = boolean('show summary', true),
  linkComponent = 'a',
  linkComponentAttr = 'href',
}) => {
  const { text, articlePath, longText, dir } = TEXT_VARIANTS[service];

  const props = {
    durationLabel: dir === 'rtl' ? 'المدة الزمنية %duration%' : durationLabel,
    linkComponent,
    linkComponentAttr,
  };

  const program = {
    state,
    link: articlePath,
    startTime,
    brandTitle: text,
    summary: displaySummary ? longText : null,
    duration,
  };

  return (
    <ServiceContextProvider
      script={script}
      service={service}
      locale="en-gb"
      dir={dir}
      timezone="Europe/London"
    >
      <ProgramCard program={program} {...props} />
    </ServiceContextProvider>
  );
};
