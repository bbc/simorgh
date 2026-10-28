import { render } from '../../../../components/react-testing-library-with-providers';
import { ServiceContextProvider } from '../../../../contexts/ServiceContext';
import ScheduleItemHeader from '.';

const dir = 'rtl';
const state = 'live';
const link = 'www.bbc.co.uk';
const brandTitle = 'BBC Xtra';
const startTime = 1566914061212;
const duration = 'PT30M';

const renderHeaderWithContext = () => (
  <ServiceContextProvider service="arabic" dir={dir} locale="ar">
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

it('should include the visible Live label in the accessible name of a live item', () => {
  const { container } = render(renderHeaderWithContext());

  const label = container.querySelector('span[role=text]');

  expect(label.querySelector('[class*="liveLabelText"]')).not.toHaveAttribute(
    'aria-hidden',
  );
  expect(label.textContent).toMatch(/^استمع, مباشر BBC Xtra /);
});

it('should render a span with role=text so content is read out in single swipe', () => {
  const { container } = render(renderHeaderWithContext());

  expect(container.querySelector('span[role=text]')).toBeInTheDocument();
});
