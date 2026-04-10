// This asset overrides the gunit assertion done in the moment codebase.
// Format and styling of this file has been keep consistent with the official moment tests.
// An example of these tests can be seen at https://github.com/moment/moment/blob/develop/src/test/locale/en-gb.js
import 'jest-expect-message';

export default {
  equal: (val1: string, val2: string, message?: string) =>
    expect(val1, message).toEqual(val2),
};
