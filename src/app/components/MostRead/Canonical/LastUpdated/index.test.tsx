import '#psammead/psammead-locales/moment/pcm';
import { render, screen } from '../../../react-testing-library-with-providers';
import LastUpdated from '.';

describe('MostReadCanonical - LastUpdated', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should render LastUpdated correctly', () => {
    jest.setSystemTime(new Date('2026-11-12T12:00:00Z'));

    render(
      <LastUpdated
        timestamp={864691200}
        prefix="Last Updated:"
        locale="en-gb"
        timezone="Europe/London"
      />,
    );

    const time = screen.getByText('Last Updated: 11 January 1970');

    expect(time.tagName).toBe('TIME');
    expect(time).toHaveAttribute('datetime', '1970-01-11');
  });

  it('omits year for dates published this year', () => {
    jest.setSystemTime(new Date('1970-01-12T12:00:00Z'));

    render(
      <LastUpdated
        timestamp={864691200}
        prefix="Last Updated:"
        locale="en-gb"
        timezone="Europe/London"
      />,
    );

    expect(screen.getByText('Last Updated: 11 January')).toBeInTheDocument();
  });

  it('uses locale-specific same-year format for hungarian', () => {
    jest.setSystemTime(new Date('2026-11-12T12:00:00Z'));

    render(
      <LastUpdated
        timestamp="2026-11-03T05:17:09.393Z"
        prefix="Frissítve:"
        locale="hu"
        timezone="Europe/Budapest"
        datetimeMonthDayFormat="MMMM D."
      />,
    );

    expect(screen.getByText('Frissítve: november 3.')).toBeInTheDocument();
  });

  it('preserves the ordinal day suffix for pidgin when the year is omitted', () => {
    jest.setSystemTime(new Date('2026-11-12T12:00:00Z'));

    render(
      <LastUpdated
        timestamp="2026-11-03T05:17:09.393Z"
        prefix="De one we dem update for:"
        locale="pcm"
        timezone="Africa/Lagos"
      />,
    );

    expect(
      screen.getByText('De one we dem update for: 3rd November'),
    ).toBeInTheDocument();
  });
});
