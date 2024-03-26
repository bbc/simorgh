import { isDataStale, shouldRenderLastUpdated } from './isDataStale';

const epochTimeNow = Date.now();
const currentTime = new Date();

const calcTimestampMinutesAgo = minutes =>
  new Date(epochTimeNow - 60 * 1000 * minutes).toUTCString();

const calcTimestampDaysAgo = days =>
  new Date(epochTimeNow - 24 * 60 * 60 * 1000 * days);

describe('mostReadRecordIsFresh', () => {
  it('should return true if 60 minutes ago or less', () => {
    expect(isDataStale(currentTime.toUTCString())).toEqual(false);
    expect(isDataStale(calcTimestampMinutesAgo(59))).toEqual(false);
  });

  it('should return false if more than 60 minutes ago', () => {
    expect(isDataStale(calcTimestampMinutesAgo(61))).toEqual(true);
    expect(isDataStale(calcTimestampDaysAgo(1))).toEqual(true);
  });
});

describe('shouldRenderLastUpdated', () => {
  it.each`
    timestamp                                            | scenario                                               | shouldRender
    ${calcTimestampDaysAgo(61).getTime()}                | ${'date is 61 days ago and timestamp format is unix'}  | ${true}
    ${new Date(calcTimestampDaysAgo(61)).toISOString()}  | ${'date is 61 days ago and timestamp format is ISO'}   | ${true}
    ${calcTimestampDaysAgo(100).getTime()}               | ${'date is 100 days ago and timestamp format is unix'} | ${true}
    ${new Date(calcTimestampDaysAgo(100)).toISOString()} | ${'date is 100 days ago and timestamp format is ISO'}  | ${true}
    ${currentTime.getTime()}                             | ${'date is now and timestamp format is unix'}          | ${false}
    ${currentTime.toISOString()}                         | ${'date is now and timestamp format is ISO'}           | ${false}
    ${calcTimestampDaysAgo(59).getTime()}                | ${'date is 59 days ago and timestamp format is unix'}  | ${false}
    ${new Date(calcTimestampDaysAgo(59)).toISOString()}  | ${'date is 59 days ago and timestamp format is ISO'}   | ${false}
  `(
    'should return $shouldRender for $timestamp because $scenario',
    ({ timestamp, shouldRender }) => {
      expect(shouldRenderLastUpdated(timestamp)).toEqual(shouldRender);
    },
  );
});
