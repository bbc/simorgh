/* eslint-disable no-eval */
import { omit } from 'ramda';
import { transformData } from '.';
import { WesternArabic } from '../../../../legacy/psammead/psammead-locales/src/numerals';
import pidginMostRead from '../../../../../../data/pidgin/mostRead/index.json';

describe('getRemoteDataScript', () => {
  it('transformData should append rankTranslation to each item', async () => {
    const data = {
      ...pidginMostRead,
      items: pidginMostRead.records.slice(0, 10),
    };
    expect(data).toHaveProperty('items');

    const translations = WesternArabic;

    eval(transformData());

    data.items.forEach((item: object, index: number) => {
      expect(item).toHaveProperty('rankTranslation');
      // @ts-expect-error required for testing purposes
      expect(item.rankTranslation).toBe(translations[index + 1]);
    });
  });

  it('transformData should throw an error if there are no items in the data response', async () => {
    const data = omit(['records'], pidginMostRead);
    expect(data).not.toHaveProperty('items');

    const translations = WesternArabic;
    expect(translations).toBeDefined();

    expect(() => eval(transformData())).toThrowError(
      'Empty records from mostread endpoint',
    );
  });
});
