import clone from 'ramda/src/clone';
import assocPath from 'ramda/src/assocPath';

import pageIsSame from '.';

const exampleProps = {
  pageData: {
    metadata: {
      id: 'some-id',
    },
  },
};

describe('pageIsSame', () => {
  it('should return true when props are the same object', () => {
    expect(pageIsSame(exampleProps, exampleProps)).toBe(true);
  });
  it('should return true when props have the same assetId', () => {
    expect(pageIsSame(exampleProps, clone(exampleProps))).toBe(true);
  });
  it('should return false when props have a different assetId', () => {
    expect(
      pageIsSame(
        exampleProps,
        assocPath(['pageData', 'metadata', 'id'], 'different-id', exampleProps),
      ),
    ).toBe(false);
  });
});
