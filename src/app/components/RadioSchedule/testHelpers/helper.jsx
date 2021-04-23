/* eslint-disable react/prop-types */
import { TEXT_VARIANTS } from '@bbc/psammead-storybook-helpers';
import { arabic, latin } from '@bbc/gel-foundations/scripts';
import { boolean } from '@storybook/addon-knobs';
import React from 'react';
import ProgramCard from '../ProgramCard';
import RadioSchedule from '../index';

// Will remove and clean up in future PRs
export const stateTypes = ['live', 'onDemand', 'onDemand', 'next'];
export const uniqueStates = ['live', 'onDemand', 'next'];

const listenLabelTranslations = {
  live: 'Listen Live',
  next: 'Listen Next',
  onDemand: 'Listen',
};

const getSchedule = (service, withLongSummary) => {
  const { text, articlePath, longText, timezone } = TEXT_VARIANTS[service];
  const programDurationLabel =
    service === 'arabic' ? 'المدة الزمنية %duration%' : 'Duration %duration%';

  return stateTypes.map((state, index) => ({
    id: index,
    state,
    startTime: 1566914061212,
    link: articlePath,
    brandTitle: text,
    summary:
      withLongSummary && state === 'live'
        ? `${longText} ${longText}`
        : longText,
    duration: 'PT1H',
    durationLabel: programDurationLabel,
    timezone,
  }));
};

export const renderProgramCard = ({
  state,
  service = 'news',
  duration = 'PT30M',
  durationLabel = 'Duration %duration%',
  startTime = 1566914061212,
  displaySummary = boolean('show summary', true),
  linkComponent = 'a',
  linkComponentAttr = 'href',
}) => {
  const { text, articlePath, longText, dir, locale, timezone } = TEXT_VARIANTS[
    service
  ];

  const props = {
    service,
    script: dir === 'rtl' ? arabic : latin,
    durationLabel: dir === 'rtl' ? 'المدة الزمنية %duration%' : durationLabel,
    nextLabel: dir === 'rtl' ? 'مباشر' : 'NEXT',
    liveLabel: dir === 'rtl' ? 'مباشر' : 'LIVE',
    listenLabelTranslations,
    timezone,
    locale,
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

  return <ProgramCard dir={dir} program={program} {...props} />;
};

export const renderRadioSchedule = ({
  service = 'news',
  locale = 'en-gb',
  timezone = 'Europe/London',
  script = latin,
  dir = 'ltr',
  withLongSummary = false,
  selectedService = 'news',
  linkComponent = 'a',
  linkComponentAttr = 'href',
}) => {
  const nextLabel = dir === 'rtl' ? 'مباشر' : 'NEXT';
  const liveLabel = dir === 'rtl' ? 'مباشر' : 'LIVE';
  const durationLabel =
    dir === 'rtl' ? 'المدة الزمنية %duration%' : 'Duration %duration%';

  return (
    <RadioSchedule
      schedules={getSchedule(selectedService, withLongSummary)}
      locale={locale}
      timezone={timezone}
      script={script}
      service={service}
      nextLabel={nextLabel}
      liveLabel={liveLabel}
      listenLabelTranslations={listenLabelTranslations}
      durationLabel={durationLabel}
      dir={dir}
      linkComponent={linkComponent}
      linkComponentAttr={linkComponentAttr}
    />
  );
};
