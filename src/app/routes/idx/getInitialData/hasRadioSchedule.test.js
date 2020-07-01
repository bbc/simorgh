import hasRadioSchedule from './hasRadioSchedule';

describe('hasRadioSchedule', () => {
  it('should retrun false for ukrainian', () => {
    expect(hasRadioSchedule('ukrainian', 'default')).resolves.toBeFalsy();
  });

  it('should return true for persian', () => {
    expect(hasRadioSchedule('persian', 'default')).resolves.toBeTruthy();
  });
});
