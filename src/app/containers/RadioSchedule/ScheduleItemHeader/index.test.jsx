import React from 'react';
import { render } from '@testing-library/react';
import * as scripts from '@bbc/gel-foundations/scripts';
import ScheduleItemHeader from '.';
import '@testing-library/jest-dom/extend-expect';
import { ServiceContextProvider } from '#contexts/ServiceContext';

const arabicProps = {
  durationLabel: 'المدة %duration%',
};

const englishProps = {
  durationLabel: 'Duration %duration%',
};

const state = 'live';
const link = 'www.bbc.co.uk';
const brandTitle = 'BBC Xtra';
const startTime = 1566914061212;
const duration = 'PT30M';

const arabicTranslations = {
  media: {
    listen: 'استمع',
    listenLive: 'استمع للبث المباشر',
    listenNext: 'واصل الاستماع',
  },
};

const englishTranslations = {
  media: {
    listen: 'Listen',
    listenLive: 'Listen Live',
    listenNext: 'Listen Next',
  },
};

it('should render the title', () => {
  const { getByText } = render(
    <ServiceContextProvider
      script={scripts.arabic}
      service="arabic"
      locale="ar"
      dir="rtl"
      timezone="GMT"
      translations={arabicTranslations}
    >
      <ScheduleItemHeader
        {...arabicProps}
        state={state}
        link={link}
        brandTitle={brandTitle}
        startTime={startTime}
        duration={duration}
      />
    </ServiceContextProvider>,
  );

  expect(getByText('BBC Xtra')).toBeInTheDocument();
});

it('should render the formatted duration for screenreaders', () => {
  const { getByText } = render(
    <ServiceContextProvider
      script={scripts.latin}
      service="news"
      locale="en_GB"
      dir="ltr"
      timezone="Europe/London"
      translations={englishTranslations}
    >
      <ScheduleItemHeader
        {...englishProps}
        state={state}
        link={link}
        brandTitle={brandTitle}
        startTime={startTime}
        duration={duration}
      />
    </ServiceContextProvider>,
  );

  expect(getByText(', Duration 30,00')).toBeInTheDocument();
});

it('should aria-hide the Live label', () => {
  const { container } = render(
    <ServiceContextProvider
      script={scripts.arabic}
      service="arabic"
      locale="ar"
      dir="rtl"
      timezone="GMT"
      translations={arabicTranslations}
    >
      <ScheduleItemHeader
        {...arabicProps}
        state={state}
        link={link}
        brandTitle={brandTitle}
        startTime={startTime}
        duration={duration}
      />
    </ServiceContextProvider>,
  );

  const hiddenDuration = container.querySelector('span[aria-hidden=true]');
  expect(hiddenDuration).toContainHTML('مباشر');
});

it('should render a span with role=text so content is read out in single swipe', () => {
  const { container } = render(
    <ServiceContextProvider
      script={scripts.arabic}
      service="arabic"
      locale="ar"
      dir="rtl"
      timezone="GMT"
      translations={arabicTranslations}
    >
      <ScheduleItemHeader
        {...arabicProps}
        state={state}
        link={link}
        brandTitle={brandTitle}
        startTime={startTime}
        duration={duration}
      />
    </ServiceContextProvider>,
  );

  expect(container.querySelector('span[role=text]')).toBeInTheDocument();
});
