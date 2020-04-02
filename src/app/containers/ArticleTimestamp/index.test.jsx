import React from 'react';
import { render, mount } from 'enzyme';
import {
  isNull,
  suppressPropWarnings,
  shouldMatchSnapshot,
} from '@bbc/psammead-test-helpers';
import ArticleTimestamp from '.';
import {
  timestampGenerator,
  sameDayTimestampsGenerator,
  isBritishSummerTime,
} from './testHelpers';
import { ServiceContextProvider } from '#contexts/ServiceContext';

const regexDate = /[0-9]{1,2} \w+ [0-9]{4}/;
const regexDatetime = /[0-9]{1,2} \w+ [0-9]{4}[,] [0-9]{2}[:][0-9]{2} \w+/;

const regexUpdatedDatetime = /Updated [0-9]{1,2} \w+ [0-9]{4}[,] [0-9]{2}[:][0-9]{2} \w+/;
const regexUpdatedDate = /^Updated [0-9]{1,2} \w+ [0-9]{4}$/;

const firstChild = (wrapper) => wrapper[0].children[0].data;
const secondChild = (wrapper) => wrapper[1].children[0].children[0].data;

const renderedTimestamps = (jsx) => render(jsx).get(0).children; // helper as output is wrapped in a grid

// eslint-disable-next-line react/prop-types
const WrappedArticleTimestamp = ({ service, ...props }) => (
  <ServiceContextProvider service={service}>
    <ArticleTimestamp {...props} />
  </ServiceContextProvider>
);

WrappedArticleTimestamp.defaultProps = {
  service: 'news',
};

describe('ArticleTimestamp', () => {
  let originalDate;
  const inBritishSummerTime = isBritishSummerTime(Date.now());
  beforeEach(() => {
    originalDate = Date.now;
  });

  afterEach(() => {
    Date.now = originalDate;
  });

  shouldMatchSnapshot(
    "should render a 'created' Timestamp correctly",
    <WrappedArticleTimestamp
      firstPublished={1530947227000} // Sat Jul 07 2018 07:07:07 UTC
      lastPublished={1530947227000} // Sat Jul 07 2018 07:07:07 UTC
    />,
  );

  shouldMatchSnapshot(
    "should render both a 'created' and an 'updated' Timestamp correctly",
    <WrappedArticleTimestamp
      firstPublished={1530947227000} // Sat Jul 07 2018 07:07:07
      lastPublished={1552666749637} // Fri Mar 15 2019 16:19:09
    />,
  );

  describe('daylight savings time', () => {
    const daylightSavingsBehaviour = ({ descriptor, date, longName }) => {
      it(`should produce ${descriptor} as a descriptor when in ${longName}`, () => {
        const [
          moreThanTenHoursAgo,
          mockCurrentTimestamp,
        ] = sameDayTimestampsGenerator({
          date,
          intervals: [{ hours: 10, seconds: 25 }],
        });
        Date.now = jest.fn(() => mockCurrentTimestamp);
        const renderedWrapper = renderedTimestamps(
          <WrappedArticleTimestamp
            firstPublished={moreThanTenHoursAgo}
            lastPublished={moreThanTenHoursAgo}
          />,
        );

        expect(renderedWrapper.length).toEqual(1);
        expect(renderedWrapper[0].children[0].data).toMatch(regexDatetime);
        expect(renderedWrapper[0].children[0].data).toContain(descriptor);
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
    const renderedWrapper = renderedTimestamps(
      <WrappedArticleTimestamp
        firstPublished={threeHoursAgo}
        lastPublished={threeHoursAgo}
      />,
    );
    expect(renderedWrapper.length).toEqual(1);
    expect(firstChild(renderedWrapper)).toEqual('3 hours ago');
  });

  it('should render one timestamp with date & time when firstPublished today and > 10 hours ago and lastPublished === firstPublished', () => {
    const [elevenHoursAgo, mockCurrentTimestamp] = sameDayTimestampsGenerator({
      intervals: [{ hours: 11 }],
    });
    Date.now = jest.fn(() => mockCurrentTimestamp);
    const renderedWrapper = renderedTimestamps(
      <WrappedArticleTimestamp
        firstPublished={elevenHoursAgo}
        lastPublished={elevenHoursAgo}
      />,
    );
    expect(renderedWrapper.length).toEqual(1);
    expect(firstChild(renderedWrapper)).toMatch(regexDatetime);
  });

  it('should render one timestamp with date when firstPublished before today and lastPublished === firstPublished', () => {
    const twentyFourHoursAgo = timestampGenerator({
      hours: 24,
      seconds: 1,
    });
    const renderedWrapper = renderedTimestamps(
      <WrappedArticleTimestamp
        firstPublished={twentyFourHoursAgo}
        lastPublished={twentyFourHoursAgo}
      />,
    );
    expect(renderedWrapper.length).toEqual(1);
    expect(firstChild(renderedWrapper)).toMatch(regexDate);
  });

  it('should render one timestamp with date when firstPublished before today and lastPublished was published less than 1 minute after firstPublished', () => {
    const renderedWrapper = renderedTimestamps(
      <WrappedArticleTimestamp
        firstPublished={1530947280000} // Sat Jul 07 2018 07:08:00 UTC
        lastPublished={1530947286000} // Sat Jul 07 2018 07:08:06 UTC
        minutesTolerance={1}
      />,
    );
    expect(renderedWrapper.length).toEqual(1);
    expect(firstChild(renderedWrapper)).toMatch(regexDate);
  });

  it('should render two timestamps with date when firstPublished before today and lastPublished was published more than 1 minute after firstPublished', () => {
    // this should be relative time rather than separating by different days
    const renderedWrapper = renderedTimestamps(
      <WrappedArticleTimestamp
        firstPublished={1530947280000} // Sat Jul 07 2018 07:08:00 UTC
        lastPublished={1531047280000} // Sun Jul 08 2018 10:54:40 UTC
        minutesTolerance={1}
      />,
    );
    expect(renderedWrapper.length).toEqual(2);
    expect(firstChild(renderedWrapper)).toMatch(regexDate);
  });

  it('should render two timestamps - published: date & time, updated: relative when both are today and < 10 hours ago', () => {
    const [
      fiveHoursAgo,
      threeHoursAgo,
      mockCurrentTimestamp,
    ] = sameDayTimestampsGenerator({
      intervals: [{ hours: 5 }, { hours: 3 }],
    });
    Date.now = jest.fn(() => mockCurrentTimestamp);
    const renderedWrapper = renderedTimestamps(
      <WrappedArticleTimestamp
        firstPublished={fiveHoursAgo}
        lastPublished={threeHoursAgo}
      />,
    );
    expect(renderedWrapper.length).toEqual(2);
    expect(firstChild(renderedWrapper)).toMatch(regexDatetime);
    expect(secondChild(renderedWrapper)).toMatch('3 hours ago');
  });

  it('should render two timestamps - published: date & time, updated: date & time when both are today and > 10 hours ago', () => {
    const [
      twelveHoursAgo,
      elevenHoursAgo,
      mockCurrentTimestamp,
    ] = sameDayTimestampsGenerator({
      intervals: [{ hours: 12 }, { hours: 11 }],
    });
    Date.now = jest.fn(() => mockCurrentTimestamp);
    const renderedWrapper = renderedTimestamps(
      <WrappedArticleTimestamp
        firstPublished={twelveHoursAgo}
        lastPublished={elevenHoursAgo}
      />,
    );
    expect(renderedWrapper.length).toEqual(2);
    expect(firstChild(renderedWrapper)).toMatch(regexDatetime);
    expect(secondChild(renderedWrapper)).toMatch(regexUpdatedDatetime);
  });

  it('should render two timestamps - published: date, updated: date when firstPublished before today and lastPublished before today, but not same day as firstPublished', () => {
    const threeDaysAgo = timestampGenerator({
      days: 3,
    });
    const twoDaysAgo = timestampGenerator({ days: 2 });
    const renderedWrapper = renderedTimestamps(
      <WrappedArticleTimestamp
        firstPublished={threeDaysAgo}
        lastPublished={twoDaysAgo}
      />,
    );
    expect(renderedWrapper.length).toEqual(2);
    expect(firstChild(renderedWrapper)).toMatch(regexDate);
    expect(secondChild(renderedWrapper)).toMatch(regexUpdatedDate);
  });

  it('should render two timestamps - published: date, updated: date when firstPublished before today and lastPublished today and > 10 hrs ago', () => {
    const timestamp = inBritishSummerTime ? 1496235600000 : 1483275600000;
    Date.now = jest.fn(() => timestamp);
    const threeDaysAgo = timestampGenerator({
      days: 3,
    });
    const elevenHoursAgo = timestampGenerator({ hours: 11 });
    const renderedWrapper = renderedTimestamps(
      <WrappedArticleTimestamp
        firstPublished={threeDaysAgo}
        lastPublished={elevenHoursAgo}
      />,
    );
    expect(renderedWrapper.length).toEqual(2);
    expect(firstChild(renderedWrapper)).toMatch(regexDate);
    expect(secondChild(renderedWrapper)).toMatch(regexUpdatedDate);
  });

  it('should render one timestamp when firstPublished and lastPublished is the same day, and current time is outside of the lastPublished relative window', () => {
    const renderedWrapper = renderedTimestamps(
      <WrappedArticleTimestamp
        firstPublished={1400140005000} // Thu May 15 2014 07:46:45 UTC
        lastPublished={1400153537000} // Thu May 15 2014 11:32:17 UTC
      />,
    );

    expect(renderedWrapper.length).toEqual(1);
    expect(firstChild(renderedWrapper)).toMatch(regexDate);
  });

  it('should render two timestamps when firstPublished and lastPublished is the same day, not today, and current time is within the lastPublished relative window', () => {
    Date.now = jest.fn(() => new Date('2020-02-28T08:20:00Z').getTime());
    const twentyFourHoursAgo = timestampGenerator({ days: 1 });
    const nineHoursAgo = timestampGenerator({ hours: 9 });
    const renderedWrapper = renderedTimestamps(
      <WrappedArticleTimestamp
        firstPublished={twentyFourHoursAgo}
        lastPublished={nineHoursAgo}
      />,
    );

    expect(renderedWrapper.length).toEqual(2);
    expect(firstChild(renderedWrapper)).toMatch(regexDate);
  });

  describe('With different timezones', () => {
    it('should show the correct local date', () => {
      const props = {
        firstPublished: 1565380800000, // Fri Aug 09 2019 20:00:00 UTC
        lastPublished: 1565380800000, // Fri Aug 09 2019 20:00:00 UTC
      };
      const newsContainer = mount(
        <WrappedArticleTimestamp {...props} service="news" />,
      );

      const time = newsContainer.find('time').props().dateTime;
      expect(time).toEqual('2019-08-09');

      const bengaliContainer = mount(
        <WrappedArticleTimestamp {...props} service="bengali" />,
      );
      const bengaliTime = bengaliContainer.find('time').props().dateTime;
      expect(bengaliTime).toEqual('2019-08-10');
    });
  });
});
