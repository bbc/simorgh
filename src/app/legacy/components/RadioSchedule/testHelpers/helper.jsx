import React from 'react';
import TEXT_VARIANTS from '#storybook/withServicesDecorator/text-variants';
import { ServiceContextProvider } from '../../../../contexts/ServiceContext';
import latin from '../../../../components/ThemeProvider/fontScripts/latin';
import arabic from '../../../../components/ThemeProvider/fontScripts/arabic';
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
    id: `p${index}`,
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
  displaySummary = true,
  linkComponent = 'a',
  linkComponentAttr = 'href',
  id,
}) => {
  const { text, articlePath, longText, dir, timezone } = TEXT_VARIANTS[service];

  const script = dir === 'rtl' ? arabic : latin;

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
    id,
  };

  return (
    <ServiceContextProvider
      dir={dir}
      service={service}
      script={script}
      locale="ar"
      timezone={timezone}
    >
      <ProgramCard program={program} id={id} {...props} />
    </ServiceContextProvider>
  );
};

export const renderRadioSchedule = ({
  withLongSummary = false,
  linkComponent = 'a',
  linkComponentAttr = 'href',
  service,
  locale = 'en-gb',
  timezone = 'Europe/London',
  script = latin,
  dir = 'ltr',
  selectedService = 'news',
}) => {
  const nextLabel = dir === 'rtl' ? 'مباشر' : 'NEXT';
  const liveLabel = dir === 'rtl' ? 'مباشر' : 'LIVE';
  const durationLabel =
    dir === 'rtl' ? 'المدة الزمنية %duration%' : 'Duration %duration%';

  return (
    <RadioSchedule
      schedule={getSchedule(selectedService, withLongSummary)}
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
