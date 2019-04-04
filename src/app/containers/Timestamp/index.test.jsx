import React from 'react';
import { render } from 'enzyme';
import lolex from 'lolex';
import { isNull, shouldMatchSnapshot } from '../../helpers/tests/testHelpers';
import { timestampGenerator, isBritishSummerTime } from './helpers/testHelpers';
import Timestamp from '.';

const defaultTimestamp = 1539969006000; // 19 October 2018
const noLeadingZeroTimestamp = 1530947227000; // 07 July 2018
const invalidTimestamp = 8640000000000001; // A day holds 86,400,000 milliseconds - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#Description

const fifthJan = 1546707084472; // 2019-01-05T16:51:24.472Z

const dateOnlyRegex = /[0-9]{1,2} \w+ [0-9]{4}/;
const datetimeRegex = /[0-9]{1,2} \w+ [0-9]{4}[,] [0-9]{2}[:][0-9]{2} \w+/;

const renderedTimestamps = jsx => render(jsx).get(0).children; // helper as output is wrapped in a grid

describe('Timestamp', () => {
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

  it('should render one date when published before today and never updated', () => {
    const renderedWrapper = renderedTimestamps(
      <Timestamp firstPublished={fifthJan} lastPublished={fifthJan} />,
    );
    expect(renderedWrapper[0].children[0].data).toEqual('5 January 2019');
    expect(renderedWrapper.length).toEqual(1);
  });

  it('should render one relative timestamp when published < 10 hours ago and never updated', () => {
    const sixHoursAgo = timestampGenerator({ hours: 6 });
    const renderedWrapper = renderedTimestamps(
      <Timestamp firstPublished={sixHoursAgo} lastPublished={sixHoursAgo} />,
    );

    expect(renderedWrapper.length).toEqual(1);
    expect(renderedWrapper[0].children[0].data).toEqual('6 hours ago');
  });

  it('should render one absolute timestamp (without datetime) when published yesterday or before', () => {
    const oneDayAgo = timestampGenerator({ days: 1 });
    const renderedWrapper = renderedTimestamps(
      <Timestamp firstPublished={oneDayAgo} lastPublished={oneDayAgo} />,
    );

    expect(renderedWrapper.length).toEqual(1);
    expect(renderedWrapper[0].children[0].data).toMatch(dateOnlyRegex);
  });

  it('should render relative time for lastPublished if < 10 hrs ago, but absolute time for firstPublished', () => {
    const firstPublishedEightHoursAgo = timestampGenerator({ hours: 8 });
    const lastPublishedFourHoursAgo = timestampGenerator({ hours: 4 });
    const renderedWrapper = renderedTimestamps(
      <Timestamp
        firstPublished={firstPublishedEightHoursAgo}
        lastPublished={lastPublishedFourHoursAgo}
      />,
    );

    expect(renderedWrapper.length).toEqual(2);
    expect(renderedWrapper[0].children[0].data).toMatch(dateOnlyRegex);
    expect(renderedWrapper[1].children[0].data).toEqual('Updated 4 hours ago');
  });

  it('should render two dates (without time) when published and updated before today', () => {
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

    expect(renderedWrapper.length).toEqual(2);
    expect(renderedWrapper[0].children[0].data).toMatch(dateOnlyRegex);
    expect(renderedWrapper[1].children[0].data).toMatch(
      /Updated [0-9]{1,2} \w+ [0-9]{4}/,
    );
  });

  describe('time dependent tests', () => {
    // eslint-disable-next-line no-unused-vars
    let clock;
    describe('tests after 10 am', () => {
      const inBritishSummerTime = isBritishSummerTime(Date.now());
      const timeZoneString = inBritishSummerTime ? 'BST' : 'GMT';

      beforeEach(() => {
        // sets time to 2017-05-31T13:00:00.000Z BST
        // or 2017-01-01T13:00:00.000Z GMT
        // needs to be after 10am at least so the > 10 hour logic can be tested
        const timestamp = inBritishSummerTime ? 1496235600000 : 1483275600000;
        clock = lolex.install({
          shouldAdvanceTime: true,
          now: timestamp,
        });
      });

      it('should render one absolute timestamp (with datetime) when published > 10 hours ago && today', () => {
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
        expect(renderedWrapper[0].children[0].data).toMatch(datetimeRegex);
      });

      it('should render absolute time (with datetime) for lastPublished and for firstPublished if published today > 10 hrs ago', () => {
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
        expect(renderedWrapper[0].children[0].data).toMatch(datetimeRegex);
        expect(renderedWrapper[1].children[0].data).toMatch(
          /Updated [0-9]{1,2} \w+ [0-9]{4}[,] [0-9]{2}[:][0-9]{2} \w+/,
        );
        expect(renderedWrapper[1].children[0].data).toContain(timeZoneString);
      });
    });

    describe('daylight savings time', () => {
      // beforeEach(() => {
      //   // sets time to 2017-05-31T13:00:00.000Z BST
      //   // or 2017-01-01T13:00:00.000Z GMT
      //   const timestamp = inBritishSummerTime
      //     ? 1496235600000
      //     : 1483275600000;
      //   clock = lolex.install({
      //     shouldAdvanceTime: true,
      //     now: timestamp,
      //   });
      // });

      const daylightSavingsBehaviour = ({ descriptor, dateTime, longName }) => {
        it(`should produce ${descriptor} as a descriptor when in ${longName}`, () => {
          clock = lolex.install({
            shouldAdvanceTime: true,
            now: dateTime,
          });

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
          expect(renderedWrapper[0].children[0].data).toMatch(datetimeRegex);

          clock.uninstall();
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
  });
});
