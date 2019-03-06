import relativeTimestamp from './relativeTimestamp';

const timeStampGenerator = milliseconds =>
  Date.now() - milliseconds.timeDifference * milliseconds.magnitude;

const timestampWithDiffInHours = hours =>
  timeStampGenerator({
    timeDifference: hours,
    magnitude: 60 * 60 * 1000,
  });

const timestampWithDiffInMins = mins =>
  timeStampGenerator({
    timeDifference: mins,
    magnitude: 60 * 1000,
  });

const relativeBehaviour = (description, input, expectedOutput) => {
  it(description, () => {
    const result = relativeTimestamp(input);
    expect(result).toEqual(expectedOutput);
  });
};

describe('relativeTimestamp', () => {
  it('returns a string which ends in ago', () => {
    const timestamp = timestampWithDiffInMins(1);
    const result = relativeTimestamp(timestamp);
    expect(typeof result).toEqual('string');
    expect(result.split(' ').pop()).toEqual('ago');
  });

  relativeBehaviour(
    'returns 1 minute ago',
    timestampWithDiffInMins(1),
    '1 minute ago',
  );

  relativeBehaviour(
    'returns 5 minutes ago',
    timestampWithDiffInMins(5),
    '5 minutes ago',
  );

  relativeBehaviour(
    'returns 1 hour ago',
    timestampWithDiffInHours(1),
    '1 hour ago',
  );

  relativeBehaviour(
    'returns 5 hours ago',
    timestampWithDiffInHours(5),
    '5 hours ago',
  );

  relativeBehaviour(
    'returns 5 hours ago',
    timestampWithDiffInHours(5),
    '5 hours ago',
  );

  relativeBehaviour(
    'returns 1 minute ago for 2 milliseconds',
    timeStampGenerator({
      timeDifference: 2,
      magnitude: 1,
    }),
    '1 minute ago',
  );

  relativeBehaviour(
    'returns an empty string when greater than 10 hours ago',
    timestampWithDiffInHours(94),
    '',
  );

  relativeBehaviour(
    'returns an empty string for 60 milliseconds in the future',
    timeStampGenerator({
      timeDifference: -60,
      magnitude: 1,
    }),
    '',
  );
});
