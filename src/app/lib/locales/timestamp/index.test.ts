import fs from 'fs';
import path from 'path';
import { getTimestampLocaleRules, registerTimestampLocale } from './registry';

const isLocaleRuleFile = (fileName: string) =>
  fileName.endsWith('.ts') &&
  !fileName.endsWith('.test.ts') &&
  fileName !== 'registry.ts';

const localeKeys = fs
  .readdirSync(__dirname)
  .filter(isLocaleRuleFile)
  .map(fileName => path.basename(fileName, '.ts'));

describe('timestamp locale rules', () => {
  beforeAll(() => {
    localeKeys.forEach(localeKey => {
      jest.requireActual(`./${localeKey}`);
    });
  });

  it.each(localeKeys)('registers rules for %s', localeKey => {
    expect(getTimestampLocaleRules(localeKey)).toBeDefined();
  });

  it.each(localeKeys)('provides 12 month names for %s when set', localeKey => {
    const months = getTimestampLocaleRules(localeKey)?.months;

    if (months) expect(months).toHaveLength(12);
  });

  it.each(localeKeys)(
    'only uses supported tokens in the %s long date pattern',
    localeKey => {
      const longDate = getTimestampLocaleRules(localeKey)?.longDate;

      if (longDate) {
        expect(longDate.replace(/\[[^\]]*\]|MMMM|YYYY|D|\s/g, '')).toEqual('');
      }
    },
  );

  describe('getTimestampLocaleRules', () => {
    it('matches case-insensitively', () => {
      expect(getTimestampLocaleRules('PT-br')).toBe(
        getTimestampLocaleRules('pt-br'),
      );
    });

    it('falls back to the language when the region has no rules', () => {
      expect(getTimestampLocaleRules('ru-RU')).toBe(
        getTimestampLocaleRules('ru'),
      );
    });

    it('prefers the full locale over the language', () => {
      registerTimestampLocale('xx', { months: [] });
      registerTimestampLocale('xx-yy', { months: ['a'] });

      expect(getTimestampLocaleRules('xx-YY')?.months).toEqual(['a']);
    });

    it('returns undefined when no rules are registered', () => {
      expect(getTimestampLocaleRules('de')).toBeUndefined();
    });
  });
});
