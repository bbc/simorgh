import jsonClone from '#routes/utils/jsonClone';
import pidginPageData from '#data/pidgin/cpsAssets/world-23252817';

describe('jsonClone', () => {
  it('should return an equivalent object', () => {
    const clone = jsonClone(pidginPageData);

    expect(clone).toEqual(pidginPageData);
  });

  it('should not be the original object', () => {
    const clone = jsonClone(pidginPageData);

    expect(clone).not.toBe(pidginPageData);
  });

  it('Should return null when attempt to clone null', () => {
    const clone = jsonClone(null);

    expect(clone).toBeNull();
  });

  it.each`
    primitive
    ${1}
    ${2.3}
    ${'hello'}
  `(
    'Should return primitive when attempting to clone primitive: $primitive',
    ({ primitive }) => {
      const clone = jsonClone(primitive);

      expect(clone).toBe(primitive);
    },
  );
});
