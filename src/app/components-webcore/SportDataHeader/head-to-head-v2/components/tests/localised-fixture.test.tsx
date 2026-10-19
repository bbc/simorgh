import { renderToString } from 'react-dom/server';
import { render } from '#app/components/react-testing-library-with-providers';
import FixtureTime from '../fixture-time';
import HeadToHeadHeader from '../head-to-head-header';

const time = {
  displayTimeUK: '20:00',
  accessibleTime: '20:00 UK time',
};

describe('Localised fixture information', () => {
  beforeEach(() => {
    jest.spyOn(Temporal.Now, 'timeZoneId').mockReturnValue('Asia/Tokyo');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('keeps the UK fixture time on the server and localises after hydration', () => {
    const fixture = <FixtureTime date="Sat 15 Jun 2024" time={time} />;
    const container = document.createElement('div');
    container.innerHTML = renderToString(fixture);
    document.body.appendChild(container);
    expect(container.querySelector('time')).toHaveTextContent('20:00');
    const onRecoverableError = jest.fn();

    const { getAllByText } = render(fixture, {
      container,
      hydrate: true,
      onRecoverableError,
    });

    expect(getAllByText('04:00')).toHaveLength(2);
    expect(onRecoverableError).not.toHaveBeenCalled();
  });

  it('updates the visible and accessible times when the fixture changes', () => {
    const { getAllByText, rerender, queryByText } = render(
      <FixtureTime date="Sat 15 Jun 2024" time={time} />,
    );
    expect(getAllByText('04:00')).toHaveLength(2);

    rerender(
      <FixtureTime
        date="Sat 15 Jun 2024"
        time={{ ...time, displayTimeUK: '21:00' }}
      />,
    );

    expect(getAllByText('05:00')).toHaveLength(2);
    expect(queryByText('04:00')).not.toBeInTheDocument();
  });

  it('keeps the supplied date on the server and localises after hydration', () => {
    const header = (
      <HeadToHeadHeader
        date="Sat 15 Jun 2024"
        time={time}
        status="PreEvent"
        service="news"
        tournament="World Cup"
        stage="Final"
      />
    );
    const container = document.createElement('div');
    container.innerHTML = renderToString(header);
    document.body.appendChild(container);
    expect(container.querySelector('time')).toHaveTextContent(
      'Sat 15 Jun 2024',
    );
    const onRecoverableError = jest.fn();

    const { getByText } = render(header, {
      container,
      hydrate: true,
      onRecoverableError,
    });

    expect(container.querySelector('time')).toHaveTextContent('16');
    expect(getByText('World Cup')).toBeInTheDocument();
    expect(getByText('- Final')).toBeInTheDocument();
    expect(onRecoverableError).not.toHaveBeenCalled();
  });

  it('updates the calendar when the service changes', () => {
    const { container, rerender } = render(
      <HeadToHeadHeader
        date="Sat 15 Jun 2024"
        time={time}
        status="PreEvent"
        service="news"
      />,
    );
    expect(container.querySelector('time')).toHaveTextContent('2024');

    rerender(
      <HeadToHeadHeader
        date="Sat 15 Jun 2024"
        time={time}
        status="PreEvent"
        service="persian"
      />,
    );

    expect(container.querySelector('time')).toHaveTextContent('۱۴۰۳');
  });
});
