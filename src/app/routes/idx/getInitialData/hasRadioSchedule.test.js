import hasRadioSchedule from './hasRadioSchedule';

describe('hasRadioSchedule', () => {
  it('should expect false', () => {
    expect(hasRadioSchedule('ukrainian', 'default')).resolves.toBeFalsy();
  });

  it('should expect true', () => {
    expect(hasRadioSchedule('persian', 'default')).resolves.toBeTruthy();
  });
});
