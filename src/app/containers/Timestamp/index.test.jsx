import React from 'react';
import { render } from 'enzyme';
import { isNull, shouldMatchSnapshot } from '../../helpers/tests/testHelpers';
import { timestampGenerator, isBritishSummerTime } from './helpers/testHelpers';
import Timestamp from '.';

const defaultTimestamp = 1539969006000; // 19 October 2018
const noLeadingZeroTimestamp = 1530947227000; // 07 July 2018
const invalidTimestamp = 8640000000000001; // A day holds 86,400,000 milliseconds - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#Description

const fifthJan = 1546707084472; // 2019-01-05T16:51:24.472Z

const regexDate = /[0-9]{1,2} \w+ [0-9]{4}/;
const regexDatetime = /[0-9]{1,2} \w+ [0-9]{4}[,] [0-9]{2}[:][0-9]{2} \w+/;

const renderedTimestamps = jsx => render(jsx).get(0).children; // helper as output is wrapped in a grid

describe('Timestamp', () => {
  const inBritishSummerTime = isBritishSummerTime(Date.now());
  const timeZoneString = inBritishSummerTime ? 'BST' : 'GMT';

  describe('with no data', () => {
    isNull('should return null', <Timestamp />);
  });

  describe('daylight savings time', () => {
    const daylightSavingsBehaviour = ({ descriptor, dateTime, longName }) => {
      it(`should produce ${descriptor} as a descriptor when in ${longName}`, () => {
        const originalDateNow = Date.now;
        Date.now = jest.fn(() => dateTime);
        const twentyThreeHoursAgo = timestampGenerator({
          hours: 10,
          seconds: 25,
        });
        const renderedWrapper = renderedTimestamps(
          <Timestamp
            firstPublished={twentyThreeHoursAgo}
            lastPublished={twentyThreeHoursAgo}
          />,
        );

        Date.now = originalDateNow;

        expect(renderedWrapper.length).toEqual(1);
        expect(renderedWrapper[0].children[0].data).toMatch(regexDate);
      });
    };

    const testValues = [
      {
        descriptor: 'BST',
        dateTime: 1496235600000,
        longName: 'British Summer Time',
      },
      {
        descriptor: 'GMT',
        dateTime: 1483275600000,
        longName: 'Greenwich Mean Time',
      },
    ];

    for (let i = 0; i < testValues.length; i += 1) {
      daylightSavingsBehaviour(testValues[i]);
    }
  });

  shouldMatchSnapshot(
    'should render without a leading zero on the day',
    <Timestamp
      firstPublished={noLeadingZeroTimestamp}
      lastPublished={noLeadingZeroTimestamp}
    />,
  );
  shouldMatchSnapshot(
    'should render correctly',
    <Timestamp
      lastPublished={defaultTimestamp}
      firstPublished={defaultTimestamp}
    />,
  );
  shouldMatchSnapshot(
    'should handle an invalid timestamp',
    <Timestamp
      firstPublished={invalidTimestamp}
      lastPublished={invalidTimestamp}
    />,
  );

  it('should render one timestamp with date only when firstPublished today and never updated', () => {
    const renderedWrapper = renderedTimestamps(
      <Timestamp firstPublished={fifthJan} lastPublished={fifthJan} />,
    );
    expect(renderedWrapper[0].children[0].data).toEqual('5 January 2019');
    expect(renderedWrapper.length).toEqual(1);
  });

  it('should render one timestamp with relative time when firstPublished < 10 hours ago and never updated', () => {
    const sixHoursAgo = timestampGenerator({ hours: 6 });
    const renderedWrapper = renderedTimestamps(
      <Timestamp firstPublished={sixHoursAgo} lastPublished={sixHoursAgo} />,
    );

    expect(renderedWrapper.length).toEqual(1);
    expect(renderedWrapper[0].children[0].data).toEqual('6 hours ago');
  });

  it('should render one timestamp with date & time when firstPublished and lastUpdated before today', () => {
    const firstPublishedMoreThanADayAgo = timestampGenerator({
      days: 1,
      hours: 3,
    });

    const lastPublishedADayAgo = timestampGenerator({ days: 1 });

    const renderedWrapper = renderedTimestamps(
      <Timestamp
        firstPublished={firstPublishedMoreThanADayAgo}
        lastPublished={lastPublishedADayAgo}
      />,
    );

    expect(renderedWrapper.length).toEqual(1);
    expect(renderedWrapper[0].children[0].data).toMatch(regexDate);
  });

  it('should render one timestamp with date & time when firstPublished > 10 hours ago && today', () => {
    const timestamp = inBritishSummerTime ? 1496235600000 : 1483275600000;
    Date.now = jest.fn(() => timestamp);
    const twentyThreeHoursAgo = timestampGenerator({
      hours: 10,
      seconds: 25,
    });
    const renderedWrapper = renderedTimestamps(
      <Timestamp
        firstPublished={twentyThreeHoursAgo}
        lastPublished={twentyThreeHoursAgo}
      />,
    );

    expect(renderedWrapper.length).toEqual(1);
    expect(renderedWrapper[0].children[0].data).toMatch(regexDatetime);
  });

  it('should render two timestamps - one with relative time for lastPublished if < 10 hrs ago, but date only timestamp for firstPublished', () => {
    const firstPublishedEightHoursAgo = timestampGenerator({ hours: 8 });
    const lastPublishedFourHoursAgo = timestampGenerator({ hours: 4 });
    const renderedWrapper = renderedTimestamps(
      <Timestamp
        firstPublished={firstPublishedEightHoursAgo}
        lastPublished={lastPublishedFourHoursAgo}
      />,
    );

    expect(renderedWrapper.length).toEqual(2);
    expect(renderedWrapper[0].children[0].data).toMatch(regexDate);
    expect(renderedWrapper[1].children[0].data).toEqual('Updated 4 hours ago');
  });

  it('should render two timestamps - one with date & time for lastPublished and one with date & time for firstPublished if published today > 10 hrs ago', () => {
    const firstPublishedTwelveHoursAgo = timestampGenerator({
      hours: 12,
    });
    const lastPublishedElevenHoursAgo = timestampGenerator({
      hours: 11,
    });
    const renderedWrapper = renderedTimestamps(
      <Timestamp
        firstPublished={firstPublishedTwelveHoursAgo}
        lastPublished={lastPublishedElevenHoursAgo}
      />,
    );

    expect(renderedWrapper.length).toEqual(2);
    expect(renderedWrapper[0].children[0].data).toMatch(regexDate);
    expect(renderedWrapper[1].children[0].data).toMatch(
      /Updated [0-9]{1,2} \w+ [0-9]{4}[,] [0-9]{2}[:][0-9]{2} \w+/,
    );
    expect(renderedWrapper[1].children[0].data).toContain(timeZoneString);
  });
});
