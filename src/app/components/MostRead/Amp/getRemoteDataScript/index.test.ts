/* eslint-disable no-eval */
import { getInnerScript } from '.';
import { WesternArabic } from '../../../../legacy/psammead/psammead-locales/src/numerals';
import pidginMostRead from '../../../../../../data/pidgin/mostRead/index.json';

describe('getRemoteDataScript', () => {
  it('getInnerScript should append rankTranslation to each item', async () => {
    const data = {
      ...pidginMostRead,
      items: pidginMostRead.records.slice(0, 10),
    };
    expect(data).toHaveProperty('items');

    const translations = WesternArabic;

    const response = eval(getInnerScript());

    response.forEach((item: { rankTranslation: number }, index: number) => {
      expect(item).toHaveProperty('rankTranslation');
      expect(item.rankTranslation).toBe(translations[index + 1]);
    });
  });

  it('getInnerScript should throw an error if there are no items in the data response', async () => {
    const data = pidginMostRead;
    expect(data).not.toHaveProperty('items');

    const translations = WesternArabic;
    expect(translations).toBeDefined();

    expect(() => eval(getInnerScript())).toThrowError(
      'Empty records from mostread endpoint',
    );
  });
});
