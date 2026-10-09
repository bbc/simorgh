import getToggle from '.';

describe('getToggle', () => {
  it('returns the toggle when present', () => {
    const toggles = {
      account: { enabled: true, value: 'mundo|arabic' },
    };

    expect(getToggle(toggles, 'account')).toEqual({
      enabled: true,
      value: 'mundo|arabic',
    });
  });

  it('returns a disabled default when the toggle is missing', () => {
    const toggles = {
      account: { enabled: true },
    };

    expect(getToggle(toggles, 'ads')).toEqual({ enabled: false });
  });

  it('returns a disabled default when toggles has no matching key', () => {
    expect(getToggle({ _environment: 'test' }, 'account')).toEqual({
      enabled: false,
    });
  });
});
