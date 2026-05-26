import type { Toggles } from '#app/models/types/global';
import getToggleDefinitions from '.';

describe('getToggleDefinitions', () => {
  it('should return toggle definitions without _environment property', () => {
    const toggles: Toggles = {
      _environment: 'test',
      featureToggle1: {
        enabled: true,
        value: 'some-value',
      },
      featureToggle2: {
        enabled: false,
        value: 'another-value',
      },
    };

    const result = getToggleDefinitions(toggles);

    expect(result).toEqual({
      featureToggle1: {
        enabled: true,
        value: 'some-value',
      },
      featureToggle2: {
        enabled: false,
        value: 'another-value',
      },
    });
    expect(result).not.toHaveProperty('_environment');
  });

  it('should return empty object when empty toggles object is provided', () => {
    const result = getToggleDefinitions({});

    expect(result).toEqual({});
  });

  it('should return only _environment excluded when only _environment is present', () => {
    const toggles: Toggles = {
      _environment: 'production',
    };

    const result = getToggleDefinitions(toggles);

    expect(result).toEqual({});
  });
});
