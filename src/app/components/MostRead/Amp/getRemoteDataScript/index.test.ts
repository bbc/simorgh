/* eslint-disable no-eval */
import { transformData } from '.';
import { WesternArabic } from '#legacy/psammead/psammead-locales/src/numerals';
import { data as pidginMostRead } from '#data/pidgin/mostRead/index.json';

describe('getRemoteDataScript', () => {
  it('transformData should append rankTranslation to each item', async () => {
    const data = pidginMostRead;

    const translations = WesternArabic;

    eval(transformData());

    data.items.forEach((item: object, index: number) => {
      expect(item).toHaveProperty('rankTranslation');
      // @ts-expect-error required for testing purposes
      expect(item.rankTranslation).toBe(translations[index + 1]);
    });
  });

  it('transformData should throw an error if there are empty items in the data response', async () => {
    const data = { ...pidginMostRead, items: [] };
    expect(data.items).toHaveLength(0);

    const translations = WesternArabic;
    expect(translations).toBeDefined();

    expect(() => eval(transformData())).toThrowError(
      'Empty records from mostread endpoint',
    );
  });
});
