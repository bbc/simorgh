import relativeTimestamp from './relativeTimestamp';

const timeStampGenerator = (timeDifference, magnitude) =>
  Date.now() - timeDifference * magnitude;

const timestampWithDiffInHours = hours =>
  timeStampGenerator(hours, 60 * 60 * 1000);

const timestampWithDiffInMins = mins => timeStampGenerator(mins, 60 * 1000);

describe('relativeTimestamp', () => {
  it('returns a string which ends in ago', () => {
    const timestamp = timestampWithDiffInMins(1);
    const result = relativeTimestamp(timestamp);
    expect(typeof result).toEqual('string');
    expect(result.split(' ').pop()).toEqual('ago');
  });

  it('returns 1 minute ago', () => {
    const timestamp = timestampWithDiffInMins(1);
    const result = relativeTimestamp(timestamp);
    expect(result).toEqual('1 minute ago');
  });

  it('returns 5 minutes ago', () => {
    const timestamp = timestampWithDiffInMins(5);
    const result = relativeTimestamp(timestamp);
    expect(result).toEqual('5 minutes ago');
  });

  it('returns 1 hour ago', () => {
    const timestamp = timestampWithDiffInHours(1);
    const result = relativeTimestamp(timestamp);
    expect(result).toEqual('1 hour ago');
  });

  it('returns 5 hours ago', () => {
    const timestamp = timestampWithDiffInHours(5);
    const result = relativeTimestamp(timestamp);
    expect(result).toEqual('5 hours ago');
  });

  it('returns hours when greater than 60 minutes', () => {
    const timestamp = timestampWithDiffInHours(94);
    const result = relativeTimestamp(timestamp);
    expect(result).toEqual('94 hours ago');
  });

  it('returns 1 minute ago for 2 milliseconds', () => {
    const timestamp = timeStampGenerator(2, 1);
    const result = relativeTimestamp(timestamp);
    expect(result).toEqual('1 minute ago');
  });
});
