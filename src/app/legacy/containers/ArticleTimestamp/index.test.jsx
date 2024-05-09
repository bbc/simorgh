import React from 'react';
import {
  isNull,
  suppressPropWarnings,
} from '#psammead/psammead-test-helpers/src';
import { render } from '../../../components/react-testing-library-with-providers';
import { ServiceContextProvider } from '../../../contexts/ServiceContext';
import ArticleTimestamp from '.';
import {
  timestampGenerator,
  sameDayTimestampsGenerator,
  isBritishSummerTime,
} from './testHelpers';

const regexDate = /[0-9]{1,2} \w+ [0-9]{4}/;
const regexDatetime = /[0-9]{1,2} \w+ [0-9]{4}[,] [0-9]{2}[:][0-9]{2} \w+/;

const regexUpdatedDatetime =
  /Updated [0-9]{1,2} \w+ [0-9]{4}[,] [0-9]{2}[:][0-9]{2} \w+/;
const regexUpdatedDate = /^Updated [0-9]{1,2} \w+ [0-9]{4}$/;

const WrappedArticleTimestamp = ({ service = 'news', ...props }) => (
  <ServiceContextProvider service={service}>
    <ArticleTimestamp {...props} />
  </ServiceContextProvider>
);

describe('ArticleTimestamp', () => {
  let originalDate;
  const inBritishSummerTime = isBritishSummerTime(Date.now());
  beforeEach(() => {
    originalDate = Date.now;
  });

  afterEach(() => {
    Date.now = originalDate;
  });

  it("should render a 'created' Timestamp correctly", () => {
    const { container } = render(
      <WrappedArticleTimestamp
        firstPublished={1530947227000} // Sat Jul 07 2018 07:07:07 UTC
        lastPublished={1530947227000} // Sat Jul 07 2018 07:07:07 UTC
      />,
    );

    expect(container).toMatchSnapshot();
  });

  it("should render both a 'created' and an 'updated' Timestamp correctly", () => {
    const { container } = render(
      <WrappedArticleTimestamp
        firstPublished={1530947227000} // Sat Jul 07 2018 07:07:07
        lastPublished={1552666749637} // Fri Mar 15 2019 16:19:09
      />,
    );

    expect(container).toMatchSnapshot();
  });

  it('should render with a prefix', () => {
    const { container } = render(
      <WrappedArticleTimestamp
        firstPublished={1530947227000}
        lastPublished={1552666749637}
        service="mundo" // Prefix is Actualizado
      />,
    );

    expect(container).toMatchSnapshot();
  });

  it('should render with a suffix', () => {
    const { container } = render(
      <WrappedArticleTimestamp
        firstPublished={1530947227000}
        lastPublished={1552666749637}
        service="nepali" // Suffix is मा अद्यावधिक
      />,
    );

    expect(container).toMatchSnapshot();
  });

  it('should render with no suffix or prefix', () => {
    const { container } = render(
      <WrappedArticleTimestamp
        firstPublished={1530947227000}
        lastPublished={1530947227000}
        service="mundo"
      />,
    );

    expect(container).toMatchSnapshot();
  });

  describe('daylight savings time', () => {
    const daylightSavingsBehaviour = ({ descriptor, date, longName }) => {
      it(`should produce ${descriptor} as a descriptor when in ${longName}`, () => {
        const [moreThanTenHoursAgo, mockCurrentTimestamp] =
          sameDayTimestampsGenerator({
            date,
            intervals: [{ hours: 10, seconds: 25 }],
          });
        Date.now = jest.fn(() => mockCurrentTimestamp);
        const { getByText } = render(
          <WrappedArticleTimestamp
            firstPublished={moreThanTenHoursAgo}
            lastPublished={moreThanTenHoursAgo}
          />,
        );

        const timeEl = getByText(regexDatetime);

        expect(timeEl).toBeInTheDocument();
        expect(timeEl.textContent).toContain(descriptor);
      });
    };

    const testValues = [
      {
        descriptor: 'BST',
        date: '2017-05-31',
        longName: 'British Summer Time',
      },
      {
        descriptor: 'GMT',
        date: '2017-01-01',
        longName: 'Greenwich Mean Time',
      },
    ];

    for (let i = 0; i < testValues.length; i += 1) {
      daylightSavingsBehaviour(testValues[i]);
    }
  });

  describe('with no data', () => {
    suppressPropWarnings(['firstPublished', 'undefined']);
    suppressPropWarnings(['lastPublished', 'undefined']);
    isNull('should return null', <WrappedArticleTimestamp />);
  });

  describe('with invalid data', () => {
    isNull(
      'should return null',
      <WrappedArticleTimestamp
        firstPublished={8640000000000001} // undefined
        lastPublished={8640000000000001} // undefined
      />,
    );
  });

  it('should render one timestamp with relative time when firstPublished < 10 hours ago and lastPublished === firstPublished', () => {
    const [threeHoursAgo, mockCurrentTimestamp] = sameDayTimestampsGenerator({
      intervals: [{ hours: 3 }],
    });
    Date.now = jest.fn(() => mockCurrentTimestamp);
    const { getByText } = render(
      <WrappedArticleTimestamp
        firstPublished={threeHoursAgo}
        lastPublished={threeHoursAgo}
      />,
    );
    const timeEl = getByText(/hours ago/);

    expect(timeEl).toBeInTheDocument();
    expect(timeEl.textContent).toEqual('3 hours ago');
  });

  it('should render one timestamp with date & time when firstPublished today and > 10 hours ago and lastPublished === firstPublished', () => {
    const [elevenHoursAgo, mockCurrentTimestamp] = sameDayTimestampsGenerator({
      intervals: [{ hours: 11 }],
    });
    Date.now = jest.fn(() => mockCurrentTimestamp);
    const { getByText } = render(
      <WrappedArticleTimestamp
        firstPublished={elevenHoursAgo}
        lastPublished={elevenHoursAgo}
      />,
    );

    const timeEl = getByText(regexDatetime);

    expect(timeEl).toBeInTheDocument();
  });

  it('should render one timestamp with date when firstPublished before today and lastPublished === firstPublished', () => {
    const twentyFourHoursAgo = timestampGenerator({
      hours: 24,
      seconds: 1,
    });
    const { getByText } = render(
      <WrappedArticleTimestamp
        firstPublished={twentyFourHoursAgo}
        lastPublished={twentyFourHoursAgo}
      />,
    );

    const timeEl = getByText(regexDate);

    expect(timeEl).toBeInTheDocument();
  });

  it('should render one timestamp with date when firstPublished before today and lastPublished was published less than 1 minute after firstPublished', () => {
    const { getByText } = render(
      <WrappedArticleTimestamp
        firstPublished={1530947280000} // Sat Jul 07 2018 07:08:00 UTC
        lastPublished={1530947286000} // Sat Jul 07 2018 07:08:06 UTC
        minutesTolerance={1}
      />,
    );

    const timeEl = getByText(regexDate);

    expect(timeEl).toBeInTheDocument();
  });

  it('should render two timestamps with date when firstPublished before today and lastPublished was published more than 1 minute after firstPublished', () => {
    // this should be relative time rather than separating by different days
    const { getAllByText } = render(
      <WrappedArticleTimestamp
        firstPublished={1530947280000} // Sat Jul 07 2018 07:08:00 UTC
        lastPublished={1531047280000} // Sun Jul 08 2018 10:54:40 UTC
        minutesTolerance={1}
      />,
    );

    const timeEl = getAllByText(regexDate);

    expect(timeEl.length).toEqual(2);
  });

  it('should render two timestamps - published: date & time, updated: relative when both are today and < 10 hours ago', () => {
    const [fiveHoursAgo, threeHoursAgo, mockCurrentTimestamp] =
      sameDayTimestampsGenerator({
        intervals: [{ hours: 5 }, { hours: 3 }],
      });
    Date.now = jest.fn(() => mockCurrentTimestamp);
    const { getByText } = render(
      <WrappedArticleTimestamp
        firstPublished={fiveHoursAgo}
        lastPublished={threeHoursAgo}
      />,
    );

    const firstTimeEl = getByText(regexDatetime);
    const secondTimeEl = getByText(/3 hours ago/);

    expect(firstTimeEl).toBeInTheDocument();
    expect(secondTimeEl).toBeInTheDocument();
  });

  it('should render two timestamps - published: date & time, updated: date & time when both are today and > 10 hours ago', () => {
    const [twelveHoursAgo, elevenHoursAgo, mockCurrentTimestamp] =
      sameDayTimestampsGenerator({
        intervals: [{ hours: 12 }, { hours: 11 }],
      });
    Date.now = jest.fn(() => mockCurrentTimestamp);
    const { getAllByText } = render(
      <WrappedArticleTimestamp
        firstPublished={twelveHoursAgo}
        lastPublished={elevenHoursAgo}
      />,
    );

    const timeEls = getAllByText(regexDatetime);
    const firstTimeEl = timeEls[0];
    const secondTimeEl = timeEls[1];

    expect(firstTimeEl).toBeInTheDocument();
    expect(secondTimeEl.textContent).toMatch(regexUpdatedDatetime);
  });

  it('should render two timestamps - published: date, updated: date when firstPublished before today and lastPublished before today, but not same day as firstPublished', () => {
    const threeDaysAgo = timestampGenerator({
      days: 3,
    });
    const twoDaysAgo = timestampGenerator({ days: 2 });
    const { getAllByText } = render(
      <WrappedArticleTimestamp
        firstPublished={threeDaysAgo}
        lastPublished={twoDaysAgo}
      />,
    );

    const timeEls = getAllByText(regexDate);
    const firstTimeEl = timeEls[0];
    const secondTimeEl = timeEls[1];

    expect(firstTimeEl).toBeInTheDocument();
    expect(secondTimeEl.textContent).toMatch(regexUpdatedDate);
  });

  it('should render two timestamps - published: date, updated: date when firstPublished before today and lastPublished today and > 10 hrs ago', () => {
    const timestamp = inBritishSummerTime ? 1496235600000 : 1483275600000;
    Date.now = jest.fn(() => timestamp);
    const threeDaysAgo = timestampGenerator({
      days: 3,
    });
    const elevenHoursAgo = timestampGenerator({ hours: 11 });
    const { getAllByText } = render(
      <WrappedArticleTimestamp
        firstPublished={threeDaysAgo}
        lastPublished={elevenHoursAgo}
      />,
    );

    const timeEls = getAllByText(regexDate);
    const firstTimeEl = timeEls[0];
    const secondTimeEl = timeEls[1];

    expect(firstTimeEl).toBeInTheDocument();
    expect(secondTimeEl.textContent).toMatch(regexUpdatedDate);
  });

  it('should render one timestamp when firstPublished and lastPublished is the same day, and current time is outside of the lastPublished relative window', () => {
    const { getByText } = render(
      <WrappedArticleTimestamp
        firstPublished={1400140005000} // Thu May 15 2014 07:46:45 UTC
        lastPublished={1400153537000} // Thu May 15 2014 11:32:17 UTC
      />,
    );

    const timeEl = getByText(regexDate);

    expect(timeEl).toBeInTheDocument();
  });

  it('should render two timestamps when firstPublished and lastPublished is the same day, not today, and current time is within the lastPublished relative window', () => {
    Date.now = jest.fn(() => new Date('2020-02-28T08:20:00Z').getTime());
    const twentyFourHoursAgo = timestampGenerator({ days: 1 });
    const nineHoursAgo = timestampGenerator({ hours: 9 });
    const { getByText } = render(
      <WrappedArticleTimestamp
        firstPublished={twentyFourHoursAgo}
        lastPublished={nineHoursAgo}
      />,
    );

    const firstTimeEl = getByText(regexDate);
    const secondTimeEl = getByText(/hours ago/);

    expect(firstTimeEl).toBeInTheDocument();
    expect(secondTimeEl).toBeInTheDocument();
  });

  describe('With different timezones', () => {
    const props = {
      firstPublished: 1565380800000, // Fri Aug 09 2019 20:00:00 UTC
      lastPublished: 1565380800000, // Fri Aug 09 2019 20:00:00 UTC
    };

    it('should show the correct local date', () => {
      const { getByText } = render(
        <WrappedArticleTimestamp {...props} service="news" />,
      );
      const timeEl = getByText(/9 August 2019/);
      const time = timeEl.getAttribute('datetime');

      expect(time).toEqual('2019-08-09');
    });

    it('should show the correct local date for Bengali', () => {
      const { getByText } = render(
        <WrappedArticleTimestamp {...props} service="bengali" />,
      );
      const timeEl = getByText(/১০ অগাস্ট ২০১৯/);
      const time = timeEl.getAttribute('datetime');
      expect(time).toEqual('2019-08-10');
    });
  });
});
