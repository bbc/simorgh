import React from 'react';
import { render } from 'enzyme';
import { isNull, shouldMatchSnapshot } from '../../helpers/tests/testHelpers';
import { timestampGenerator, isBritishSummerTime } from './helpers/testHelpers';
import Timestamp from '.';

const defaultTimestamp = 1539969006000; // 19 October 2018
const noLeadingZeroTimestamp = 1530947227000; // 07 July 2018
const invalidTimestamp = 8640000000000001; // A day holds 86,400,000 milliseconds - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#Description

const fifthJan = 1546707084472; // 2019-01-05T16:51:24.472Z

const regexDate = /^[0-9]{1,2} \w+ [0-9]{4}$/;
const regexDatetime = /[0-9]{1,2} \w+ [0-9]{4}[,] [0-9]{2}[:][0-9]{2} \w+/;
const regexUpdatedDateTime = /Updated [0-9]{1,2} \w+ [0-9]{4}[,] [0-9]{2}[:][0-9]{2} \w+/;

const renderedTimestamps = jsx => render(jsx).get(0).children; // helper as output is wrapped in a grid

describe('Timestamp', () => {
  const inBritishSummerTime = isBritishSummerTime(Date.now());
  const timeZoneString = inBritishSummerTime ? 'BST' : 'GMT';

  describe('daylight savings time', () => {
    let originalDate;

    beforeEach(() => {
      originalDate = Date.now;
    });

    afterEach(() => {
      Date.now = originalDate;
    });

    const daylightSavingsBehaviour = ({ descriptor, dateTime, longName }) => {
      it(`should produce ${descriptor} as a descriptor when in ${longName}`, () => {
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
        expect(renderedWrapper.length).toEqual(1);
        expect(renderedWrapper[0].children[0].data).toMatch(regexDatetime);
        expect(renderedWrapper[0].children[0].data).toContain(descriptor);
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
  describe('with no data', () => {
    isNull('should return null', <Timestamp />);
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

  it('should render one timestamp with relative time when firstPublished < 10 hours ago and lastUpdated === firstPublished', () => {});

  it('should render one timestamp with date & time when firstPublished today and > 10 hours ago and lastUpdated === firstPublished', () => {});

  it('should render one timestamp with date when firstPublished before today and and lastUpdated === firstPublished', () => {});

  it('should render two timestamps - published: date & time, updated: relative when both are today and < 10 hours ago', () => {});

  it('should render two timestamps - published: date & time, updated: date & time when both are today and > 10 hours ago', () => {});

  it('should render two timestamps - published: date, updated: date when firstPublished before today and lastPublished beforeToday but not same day as firstPublished', () => {});

  it('should render two timestamps - published: date, updated: date when firstPublished before today and lastPublished today and > 10 hrs ago', () => {});
});
