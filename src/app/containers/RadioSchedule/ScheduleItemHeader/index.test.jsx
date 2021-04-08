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

/* eslint-disable react/prop-types */
const HeaderWithContext = ({
  service,
  script,
  locale,
  dir,
  translations,
  ...props
}) => (
  <ServiceContextProvider
    script={script}
    service={service}
    locale={locale}
    dir={dir}
    timezone="GMT"
    translations={translations}
  >
    <ScheduleItemHeader
      {...props}
      state={state}
      link={link}
      brandTitle={brandTitle}
      startTime={startTime}
      duration={duration}
    />
  </ServiceContextProvider>
);

it('should render the title', () => {
  const { getByText } = render(
    <HeaderWithContext
      service="arabic"
      script={scripts.arabic}
      locale="ar"
      dir="rtl"
      translations={arabicTranslations}
      {...arabicProps}
    />,
  );

  expect(getByText('BBC Xtra')).toBeInTheDocument();
});

it('should render the formatted duration for screenreaders', () => {
  const { getByText } = render(
    <HeaderWithContext
      service="news"
      script={scripts.latin}
      locale="en_GB"
      dir="ltr"
      translations={englishTranslations}
      {...englishProps}
    />,
  );

  expect(getByText(', Duration 30,00')).toBeInTheDocument();
});

it('should aria-hide the Live label', () => {
  const { container } = render(
    <HeaderWithContext
      service="arabic"
      script={scripts.arabic}
      locale="ar"
      dir="rtl"
      translations={arabicTranslations}
      {...arabicProps}
    />,
  );

  const hiddenDuration = container.querySelector('span[aria-hidden=true]');
  expect(hiddenDuration).toContainHTML('مباشر');
});

it('should render a span with role=text so content is read out in single swipe', () => {
  const { container } = render(
    <HeaderWithContext
      service="arabic"
      script={scripts.arabic}
      locale="ar"
      dir="rtl"
      translations={arabicTranslations}
      {...arabicProps}
    />,
  );

  expect(container.querySelector('span[role=text]')).toBeInTheDocument();
});
