import moment from 'moment';
import { render, screen } from '../react-testing-library-with-providers';
import '#lib/locales/moment/ha';
import Timestamp from '.';

const defaultTimestamp = 1539969006000; // 19 October 2018
const elevenMonthsFromNow = moment(Date.now()).subtract(11, 'months').valueOf();

const noLeadingZeroTimestamp = 1530947227000; // 07 July 2018
const invalidData = '8640000000000001'; // A day holds 86,400,000 milliseconds - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#Description
const mockCalendar = {
  formatDate: (momentLocale: moment.Moment) => {
    if (momentLocale) {
      return '27 مهر 1397';
    }
    return null;
  },
};

describe('Timestamp', () => {
  it.each([
    { isAmp: false, isLite: false },
    { isAmp: true, isLite: false },
    { isAmp: false, isLite: true },
  ])('preserves Persian text and machine-readable dates in %j', options => {
    render(
      <Timestamp
        timestamp="2018-10-19T17:10:06.000Z"
        dateTimeFormat="YYYY-MM-DD"
        format="D MMMM YYYY"
        timezone="GMT"
        locale="fa"
        altCalendar={mockCalendar}
        prefix="به روز شده در"
        suffix="."
        className="consumer"
        padding={false}
      />,
      { service: 'persian', ...options },
    );
    const time = screen.getByRole('time');
    expect(time).toHaveTextContent(
      'به روز شده در 27 مهر 1397 - ۱۹ اکتبر ۲۰۱۸ .',
    );
    expect(time).toHaveAttribute('datetime', '2018-10-19');
    expect(time).toHaveClass('consumer');
  });

  it('keeps timezone rollover consistent between visible and semantic dates', () => {
    render(
      <Timestamp
        timestamp="2021-06-15T23:30:00.000Z"
        dateTimeFormat="YYYY-MM-DD"
        format="D MMMM YYYY, HH:mm"
        timezone="Asia/Kathmandu"
        locale="en-gb"
      />,
    );
    const time = screen.getByRole('time');
    expect(time).toHaveTextContent('16 June 2021, 05:15');
    expect(time).toHaveAttribute('datetime', '2021-06-16');
  });
  it('returns null with no data', () => {
    const { container } = render(<Timestamp />);
    expect(container).toBeEmptyDOMElement();
  });

  it('should render without a leading zero on the day', () => {
    render(
      <Timestamp
        timestamp={noLeadingZeroTimestamp}
        dateTimeFormat="YYYY-MM-DD"
        format="D MMMM YYYY"
        isRelative={false}
        locale="fa"
      />,
      { service: 'persian' },
    );
    const time = screen.getByRole('time');
    expect(time).toBeInTheDocument();
    expect(time.textContent).not.toMatch(/^۰/);
  });

  it('should render correctly', () => {
    render(
      <Timestamp
        timestamp={defaultTimestamp}
        dateTimeFormat="YYYY-MM-DD"
        format="D MMMM YYYY"
        isRelative={false}
      />,
    );
    const time = screen.getByRole('time');
    expect(time.textContent).toEqual('19 October 2018');
  });

  it('returns null for an invalid date', () => {
    const { container } = render(
      <Timestamp
        timestamp={invalidData}
        dateTimeFormat="YYYY-MM-DD"
        format="D MMMM YYYY"
        isRelative={false}
      />,
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('should add prefix and suffix', () => {
    render(
      <Timestamp
        timestamp={defaultTimestamp}
        dateTimeFormat="YYYY-MM-DD"
        format="D MMMM YYYY"
        isRelative={false}
        prefix="Prefix here"
        suffix="suffix here"
      />,
    );
    const time = screen.getByRole('time');
    expect(time.textContent).toContain('Prefix here');
    expect(time.textContent).toContain('suffix here');
  });

  describe('assertions', () => {
    describe('with alternative calendar props', () => {
      it('should add alternative calendar if timestamp is not relative', () => {
        render(
          <Timestamp
            timestamp={defaultTimestamp}
            dateTimeFormat="YYYY-MM-DD"
            format="D MMMM YYYY"
            isRelative={false}
            locale="fa"
            altCalendar={mockCalendar}
          />,
          { service: 'persian' },
        );

        const time = screen.getByRole('time');
        expect(time.textContent).toEqual('27 مهر 1397 - ۱۹ اکتبر ۲۰۱۸');
      });

      it('should not add alternative calendar if timestamp is relative', () => {
        render(
          <Timestamp
            timestamp={elevenMonthsFromNow}
            dateTimeFormat="YYYY-MM-DD"
            format="D MMMM YYYY"
            isRelative
            locale="fa"
            altCalendar={mockCalendar}
          />,
          { service: 'persian' },
        );

        const time = screen.getByRole('time');
        expect(time.textContent).toEqual('۱۱ ماه پیش');
      });
    });

    it('should render a hausa timestamp', () => {
      render(
        <Timestamp
          timestamp={defaultTimestamp}
          dateTimeFormat="YYYY-MM-DD"
          format="D MMMM YYYY"
          isRelative={false}
          locale="ha"
        />,
        { service: 'hausa' },
      );

      const time = screen.getByRole('time');
      expect(time.textContent).toEqual('19 Oktoba 2018');
    });

    it('should render a hausa ISO timestamp', () => {
      render(
        <Timestamp
          timestamp={new Date(defaultTimestamp).toISOString()}
          dateTimeFormat="YYYY-MM-DD"
          format="D MMMM YYYY"
          isRelative={false}
          locale="ha"
        />,
        { service: 'hausa' },
      );

      const time = screen.getByRole('time');
      expect(time.textContent).toEqual('19 Oktoba 2018');
    });

    it('should render a hausa relative timestamp', () => {
      render(
        <Timestamp
          timestamp={elevenMonthsFromNow}
          dateTimeFormat="YYYY-MM-DD"
          format="D MMMM YYYY"
          isRelative
          locale="ha"
        />,
        { service: 'hausa' },
      );

      const time = screen.getByRole('time');
      expect(time.textContent).toEqual('11 months wuce');
    });
  });
});
