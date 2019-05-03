import relativeTime from './relativeTimestamp';
import { timestampGenerator } from './helpers/testHelpers';

const relativeBehaviour = (description, input, expectedOutput) => {
  it(description, () => {
    const result = relativeTime(input);
    expect(result).toEqual(expectedOutput);
  });
};

describe('relativeTime', () => {
  it('returns a string which ends in ago', () => {
    const testTimestamp = timestampGenerator({ minutes: 1 });
    const result = relativeTime(testTimestamp);
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
    'returns days when greater than 24 hours ago',
    timestampGenerator({ hours: 94 }),
    '3 days ago',
  );

  relativeBehaviour(
    'returns null for 10 seconds in the future',
    timestampGenerator({ seconds: -10 }),
    null,
  );
});
