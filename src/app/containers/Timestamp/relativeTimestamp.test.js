import relativeTimestamp from './relativeTimestamp';

const timeStampGenerator = (timeDifference, magnitude) =>
  Date.now() - timeDifference * magnitude;

const timestampWithDiffInHours = hours =>
  timeStampGenerator(hours, 60 * 60 * 1000);

const timestampWithDiffInMins = mins => timeStampGenerator(mins, 60 * 1000);

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
