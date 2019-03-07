import relativeTimestamp from './relativeTimestamp';

const timestampGenerator = timeDifference => {
  const magnitudes = {
    hours: 60 * 60 * 1000,
    minutes: 60 * 1000,
    seconds: 1000,
    milliseconds: 1,
  };
  let timestamp = Date.now();
  const keyNames = Object.keys(timeDifference);

  keyNames.forEach(diff => {
    timestamp -= timeDifference[diff] * magnitudes[diff];
  });

  return timestamp;
};

const relativeBehaviour = (description, input, expectedOutput) => {
  it(description, () => {
    const result = relativeTimestamp(input);
    expect(result).toEqual(expectedOutput);
  });
};

describe('relativeTimestamp', () => {
  it('returns a string which ends in ago', () => {
    const timestamp = timestampGenerator({ minutes: 1 });
    const result = relativeTimestamp(timestamp);
    expect(typeof result).toEqual('string');
    expect(result.split(' ').pop()).toEqual('ago');
  });

  relativeBehaviour(
    'returns 1 minute ago',
    timestampGenerator({ minutes: 1 }),
    '1 minute ago',
  );

  relativeBehaviour(
    'returns 5 minutes ago',
    timestampGenerator({ minutes: 5 }),
    '5 minutes ago',
  );

  relativeBehaviour(
    'returns 5 mins ago for 5 mins 50 seconds',
    timestampGenerator({ minutes: 5, seconds: 50 }),
    '5 minutes ago',
  );

  relativeBehaviour(
    'returns 1 hour ago',
    timestampGenerator({ hours: 1 }),
    '1 hour ago',
  );

  relativeBehaviour(
    'returns 5 hours ago',
    timestampGenerator({ hours: 5 }),
    '5 hours ago',
  );

  relativeBehaviour(
    'returns 5 hours ago for 5 hours 30 mins',
    timestampGenerator({ hours: 5, minutes: 30 }),
    '5 hours ago',
  );

  relativeBehaviour(
    'returns 1 minute ago for 10 seconds',
    timestampGenerator({ milliseconds: 10 }),
    '1 minute ago',
  );

  relativeBehaviour(
    'returns null when greater than 10 hours ago',
    timestampGenerator({ hours: 94 }),
    null,
  );

  relativeBehaviour(
    'returns null for 10 seconds in the future',
    timestampGenerator({ seconds: -10 }),
    null,
  );
});
