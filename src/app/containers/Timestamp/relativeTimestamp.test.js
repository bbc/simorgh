import relativeTimestamp from './relativeTimestamp';

const timestampGenerator = timedifference =>
  Date.now() - timedifference.milliseconds * timedifference.magnitude;

const timestampWithDiffInHours = hours =>
  timestampGenerator({
    milliseconds: hours,
    magnitude: 60 * 60 * 1000,
  });

const timestampWithDiffInMins = mins =>
  timestampGenerator({
    milliseconds: mins,
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
    'returns 1 minute ago for 10 seconds',
    timestampGenerator({
      milliseconds: 10,
      magnitude: 1000,
    }),
    '1 minute ago',
  );

  relativeBehaviour(
    'returns null when greater than 10 hours ago',
    timestampWithDiffInHours(94),
    null,
  );

  relativeBehaviour(
    'returns null for 10 seconds in the future',
    timestampGenerator({
      milliseconds: -10,
      magnitude: 1000,
    }),
    null,
  );
});
