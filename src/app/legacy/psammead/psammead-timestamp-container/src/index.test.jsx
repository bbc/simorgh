import React from 'react';
import {
  isNull,
  shouldMatchSnapshot,
} from '#psammead/psammead-test-helpers/src';
import { render } from '@testing-library/react';
import moment from 'moment';
import latin from '../../../../components/ThemeProvider/fontScripts/latin';
import '#psammead/psammead-locales/moment/ha';
import Timestamp from '.';

const defaultTimestamp = 1539969006000; // 19 October 2018
const elevenMonthsFromNow = moment(Date.now()).subtract(11, 'months').valueOf();

const noLeadingZeroTimestamp = 1530947227000; // 07 July 2018
const invalidData = '8640000000000001'; // A day holds 86,400,000 milliseconds - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#Description
const mockCalendar = {
  formatDate: momentLocale => {
    if (momentLocale) {
      return '27 مهر 1397';
    }
    return null;
  },
};

describe('Timestamp', () => {
  describe('with no data', () => {
    console.error = jest.fn(); // eslint-disable-line no-console
    isNull('should return null', <Timestamp />);
  });

  shouldMatchSnapshot(
    'should render without a leading zero on the day',
    <Timestamp
      timestamp={noLeadingZeroTimestamp}
      dateTimeFormat="YYYY-MM-DD"
      format="D MMMM YYYY"
      isRelative={false}
      script={latin}
      locale="fa"
      service="persian"
    />,
  );

  shouldMatchSnapshot(
    'should render correctly',
    <Timestamp
      timestamp={defaultTimestamp}
      dateTimeFormat="YYYY-MM-DD"
      format="D MMMM YYYY"
      isRelative={false}
      script={latin}
      service="news"
    />,
  );

  isNull(
    'should handle invalid date',
    <Timestamp
      timestamp={invalidData}
      dateTimeFormat="YYYY-MM-DD"
      format="D MMMM YYYY"
      isRelative={false}
      script={latin}
      service="news"
    />,
  );

  shouldMatchSnapshot(
    'should add prefix and suffix',
    <Timestamp
      timestamp={defaultTimestamp}
      dateTimeFormat="YYYY-MM-DD"
      format="D MMMM YYYY"
      isRelative={false}
      prefix="Prefix here"
      suffix="suffix here"
      script={latin}
      service="news"
    />,
  );

  describe('assertions', () => {
    describe('with alternative calendar props', () => {
      it('should add alternative calendar if timestamp is not relative', () => {
        const { container } = render(
          <Timestamp
            timestamp={defaultTimestamp}
            dateTimeFormat="YYYY-MM-DD"
            format="D MMMM YYYY"
            isRelative={false}
            script={latin}
            locale="fa"
            service="persian"
            altCalendar={mockCalendar}
          />,
        );

        const time = container.querySelector('time');
        expect(time.textContent).toEqual('27 مهر 1397 - ۱۹ اکتبر ۲۰۱۸');
      });

      it('should not add alternative calendar if timestamp is relative', () => {
        const { container } = render(
          <Timestamp
            timestamp={elevenMonthsFromNow}
            dateTimeFormat="YYYY-MM-DD"
            format="D MMMM YYYY"
            isRelative
            script={latin}
            locale="fa"
            service="persian"
            altCalendar={mockCalendar}
          />,
        );

        const time = container.querySelector('time');
        expect(time.textContent).toEqual('۱۱ ماه پیش');
      });
    });

    it('should render a hausa timestamp', () => {
      const { container } = render(
        <Timestamp
          timestamp={defaultTimestamp}
          dateTimeFormat="YYYY-MM-DD"
          format="D MMMM YYYY"
          isRelative={false}
          script={latin}
          locale="ha"
          service="hausa"
        />,
      );

      const time = container.querySelector('time');
      expect(time.textContent).toEqual('19 Oktoba 2018');
    });

    it('should render a hausa ISO timestamp', () => {
      const { container } = render(
        <Timestamp
          timestamp={new Date(defaultTimestamp).toISOString()}
          dateTimeFormat="YYYY-MM-DD"
          format="D MMMM YYYY"
          isRelative={false}
          script={latin}
          locale="ha"
          service="hausa"
        />,
      );

      const time = container.querySelector('time');
      expect(time.textContent).toEqual('19 Oktoba 2018');
    });

    it('should render a hausa relative timestamp', () => {
      const { container } = render(
        <Timestamp
          timestamp={elevenMonthsFromNow}
          dateTimeFormat="YYYY-MM-DD"
          format="D MMMM YYYY"
          isRelative
          script={latin}
          locale="ha"
          service="hausa"
        />,
      );

      const time = container.querySelector('time');
      expect(time.textContent).toEqual('11 months wuce');
    });
  });
});
