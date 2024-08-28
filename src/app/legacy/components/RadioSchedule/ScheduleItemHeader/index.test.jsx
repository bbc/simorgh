import React from 'react';
import { render } from '../../../../components/react-testing-library-with-providers';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import arabic from '../../../../components/ThemeProvider/fontScripts/arabic';
import ScheduleItemHeader from '.';

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
    script={arabic}
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
