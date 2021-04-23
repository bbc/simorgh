import React from 'react';
import { render } from '@testing-library/react';
import * as scripts from '@bbc/gel-foundations/scripts';
import ScheduleItemHeader from '.';
import '@testing-library/jest-dom/extend-expect';

const listenLabelTranslations = {
  live: 'Listen Live',
  next: 'Listen Next',
  onDemand: 'Listen',
};

const props = {
  nextLabel: 'NEXT',
  liveLabel: 'LIVE',
  listenLabelTranslations,
  service: 'arabic',
  script: scripts.arabic,
  durationLabel: 'المدة %duration%',
};

const dir = 'rtl';
const state = 'live';
const link = 'www.bbc.co.uk';
const brandTitle = 'BBC Xtra';
const startTime = 1566914061212;
const duration = 'PT30M';

it('should render the title', () => {
  const { getByText } = render(
    <ScheduleItemHeader
      {...props}
      dir={dir}
      state={state}
      link={link}
      brandTitle={brandTitle}
      startTime={startTime}
      duration={duration}
    />,
  );

  expect(getByText('BBC Xtra')).toBeInTheDocument();
});

it('should render the formatted duration for screenreaders', () => {
  const { getByText } = render(
    <ScheduleItemHeader
      {...props}
      dir={dir}
      state={state}
      link={link}
      brandTitle={brandTitle}
      startTime={startTime}
      duration={duration}
    />,
  );

  expect(getByText(', المدة 30,00')).toBeInTheDocument();
});

it('should aria-hide the Live label', () => {
  const { container } = render(
    <ScheduleItemHeader
      {...props}
      dir={dir}
      state={state}
      link={link}
      brandTitle={brandTitle}
      startTime={startTime}
      duration={duration}
    />,
  );

  const hiddenDuration = container.querySelector('span[aria-hidden=true]');
  expect(hiddenDuration).toContainHTML('LIVE');
});

it('should render a span with role=text so content is read out in single swipe', () => {
  const { container } = render(
    <ScheduleItemHeader
      {...props}
      dir={dir}
      state={state}
      link={link}
      brandTitle={brandTitle}
      startTime={startTime}
      duration={duration}
    />,
  );

  expect(container.querySelector('span[role=text]')).toBeInTheDocument();
});
