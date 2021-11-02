import React from 'react';
import { render } from '@testing-library/react';
import * as scripts from '@bbc/gel-foundations/scripts';
import ScheduleItemHeader from '.';
import '@testing-library/jest-dom/extend-expect';
import { ServiceContextProvider } from '#contexts/ServiceContext';

const script = scripts.arabic;
const service = 'arabic';
const dir = 'rtl';
const state = 'live';
const link = 'www.bbc.co.uk';
const brandTitle = 'BBC Xtra';
const startTime = 1566914061212;
const duration = 'PT30M';

const renderHeaderWithContext = () => (
  <ServiceContextProvider
    dir={dir}
    service={service}
    script={script}
    locale="ar"
  >
    <ScheduleItemHeader
      durationLabel="المدة %duration%"
      state={state}
      link={link}
      brandTitle={brandTitle}
      startTime={startTime}
      duration={duration}
    />
  </ServiceContextProvider>
);

it('should render the title', () => {
  const { getByText } = render(renderHeaderWithContext());

  expect(getByText('BBC Xtra')).toBeInTheDocument();
});

it('should aria-hide the Live label', () => {
  const { container } = render(renderHeaderWithContext());

  const hiddenDuration = container.querySelector('span[aria-hidden=true]');
  expect(hiddenDuration).toContainHTML('مباشر');
});

it('should render a span with role=text so content is read out in single swipe', () => {
  const { container } = render(renderHeaderWithContext());

  expect(container.querySelector('span[role=text]')).toBeInTheDocument();
});
