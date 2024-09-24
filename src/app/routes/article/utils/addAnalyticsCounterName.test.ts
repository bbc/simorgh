import assocPath from 'ramda/src/assocPath';

import { data as legacyFIXData } from '#data/urdu/cpsAssets/science-51314202.json';
import { Article } from '#app/models/types/optimo';
import transformer from './addAnalyticsCounterName';

const { article: legacyPageData } = legacyFIXData;

describe('addAnalyticsCounterName', () => {
  it('should add an analytics counter name', async () => {
    const expected = assocPath(
      ['metadata', 'analyticsLabels', 'counterName'],
      'urdu.science.feature_index.51314202.page',
      legacyPageData,
    );
    expect(transformer(legacyPageData as unknown as Article)).toEqual(expected);
  });
});
