import relativeTimestamp from './relativeTimestamp';

describe('relativeTimestamp', () => {
  it('returns a string which ends in ago', () => {
    const milliseconds = 1 * 60 * 1000;
    const timestamp = Date.now() - milliseconds;
    const result = relativeTimestamp(timestamp);
    expect(typeof result).toEqual('string');
    expect(result.split(' ').pop()).toEqual('ago');
  });

  it('returns 1 minute ago', () => {
    const milliseconds = 1 * 60 * 1000;
    const timestamp = Date.now() - milliseconds;
    const result = relativeTimestamp(timestamp);
    expect(result).toEqual('1 minute ago');
  });

  it('returns 5 minutes ago', () => {
    const milliseconds = 5 * 60 * 1000;
    const timestamp = Date.now() - milliseconds;
    const result = relativeTimestamp(timestamp);
    expect(result).toEqual('5 minutes ago');
  });

  it('returns 1 hour ago', () => {
    const milliseconds = 1 * 60 * 60 * 1000;
    const timestamp = Date.now() - milliseconds;
    const result = relativeTimestamp(timestamp);
    expect(result).toEqual('1 hour ago');
  });

  it('returns 5 hours ago', () => {
    const milliseconds = 5 * 60 * 60 * 1000;
    const timestamp = Date.now() - milliseconds;
    const result = relativeTimestamp(timestamp);
    expect(result).toEqual('5 hours ago');
  });

  it('returns hours when greater than 60 minutes', () => {
    const milliseconds = 94 * 60 * 60 * 1000;
    const timestamp = Date.now() - milliseconds;
    const result = relativeTimestamp(timestamp);
    expect(result).toEqual('94 hours ago');
  });

  it('returns 1 minute ago for 2 milliseconds', () => {
    const milliseconds = 2;
    const timestamp = Date.now() - milliseconds;
    const result = relativeTimestamp(timestamp);
    expect(result).toEqual('1 minute ago');
  });
});

// const timeStampGenerator(timeDifference) {
//   const currentTime = Date.now();
//   return (currentTime + timeDifference).toString();
// }
