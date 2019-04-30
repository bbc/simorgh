import React from 'react';
import { render } from 'enzyme';
import ArticleTimestamp from '.';
import { isNull } from '../../helpers/tests/testHelpers';
import {
  timestampGenerator,
  isBritishSummerTime,
} from '../Timestamp/helpers/testHelpers';

const regexDate = /[0-9]{1,2} \w+ [0-9]{4}/;
const regexDatetime = /[0-9]{1,2} \w+ [0-9]{4}[,] [0-9]{2}[:][0-9]{2} \w+/;

const regexUpdatedDatetime = /Updated [0-9]{1,2} \w+ [0-9]{4}[,] [0-9]{2}[:][0-9]{2} \w+/;
const regexUpdatedDate = /^Updated [0-9]{1,2} \w+ [0-9]{4}$/;

const firstChild = wrapper => wrapper[0].children[0].data;
const secondChild = wrapper => wrapper[1].children[0].data;

const renderedTimestamps = jsx => render(jsx).get(0).children; // helper as output is wrapped in a grid

describe('ArticleTimestamp', () => {
  let originalDate;
  const inBritishSummerTime = isBritishSummerTime(Date.now());
  beforeEach(() => {
    originalDate = Date.now;
  });

  afterEach(() => {
    Date.now = originalDate;
  });

  describe('daylight savings time', () => {
    const daylightSavingsBehaviour = ({ descriptor, dateTime, longName }) => {
      it(`should produce ${descriptor} as a descriptor when in ${longName}`, () => {
        Date.now = jest.fn(() => dateTime);
        const moreThanTenHoursAgo = timestampGenerator({
          hours: 10,
          seconds: 25,
        });
        const renderedWrapper = renderedTimestamps(
          <ArticleTimestamp
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
    isNull('should return null', <ArticleTimestamp />);
  });

  it('should render one timestamp with relative time when firstPublished < 10 hours ago and lastUpdated === firstPublished', () => {
    const threeHoursAgo = timestampGenerator({ hours: 3 });
    const renderedWrapper = renderedTimestamps(
      <ArticleTimestamp
        firstPublished={threeHoursAgo}
        lastPublished={threeHoursAgo}
      />,
    );
    expect(renderedWrapper.length).toEqual(1);
    expect(firstChild(renderedWrapper)).toEqual('3 hours ago');
  });

  it('should render one timestamp with date & time when firstPublished today and > 10 hours ago and lastUpdated === firstPublished', () => {
    const timestamp = inBritishSummerTime ? 1496235600000 : 1483275600000;
    Date.now = jest.fn(() => timestamp);
    const elevenHoursAgo = timestampGenerator({
      hours: 11,
    });
    const renderedWrapper = renderedTimestamps(
      <ArticleTimestamp
        firstPublished={elevenHoursAgo}
        lastPublished={elevenHoursAgo}
      />,
    );
    expect(renderedWrapper.length).toEqual(1);
    expect(firstChild(renderedWrapper)).toMatch(regexDatetime);
  });

  it('should render one timestamp with date when firstPublished before today and lastUpdated === firstPublished', () => {
    const twentyFourHoursAgo = timestampGenerator({
      hours: 24,
      seconds: 1,
    });
    const renderedWrapper = renderedTimestamps(
      <ArticleTimestamp
        firstPublished={twentyFourHoursAgo}
        lastPublished={twentyFourHoursAgo}
      />,
    );
    expect(renderedWrapper.length).toEqual(1);
    expect(firstChild(renderedWrapper)).toMatch(regexDate);
  });

  it('should render two timestamps - published: date & time, updated: relative when both are today and < 10 hours ago', () => {
    const fiveHoursAgo = timestampGenerator({
      hours: 5,
    });
    const threeHoursAgo = timestampGenerator({ hours: 3 });
    const renderedWrapper = renderedTimestamps(
      <ArticleTimestamp
        firstPublished={fiveHoursAgo}
        lastPublished={threeHoursAgo}
      />,
    );
    expect(renderedWrapper.length).toEqual(2);
    expect(firstChild(renderedWrapper)).toMatch(regexDatetime);
    expect(secondChild(renderedWrapper)).toMatch('3 hours ago');
  });

  it('should render two timestamps - published: date & time, updated: date & time when both are today and > 10 hours ago', () => {
    const timestamp = inBritishSummerTime ? 1496235600000 : 1483275600000;
    Date.now = jest.fn(() => timestamp);
    const twelveHoursAgo = timestampGenerator({
      hours: 12,
    });
    const elevenHoursAgo = timestampGenerator({
      hours: 11,
    });
    const renderedWrapper = renderedTimestamps(
      <ArticleTimestamp
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
      <ArticleTimestamp
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
      <ArticleTimestamp
        firstPublished={threeDaysAgo}
        lastPublished={elevenHoursAgo}
      />,
    );
    expect(renderedWrapper.length).toEqual(2);
    expect(firstChild(renderedWrapper)).toMatch(regexDate);
    expect(secondChild(renderedWrapper)).toMatch(regexUpdatedDate);
  });
});
