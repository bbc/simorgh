import assocPath from 'ramda/src/assocPath';
import { data as legacyMAPData } from '#data/hausa/legacyAssets/multimedia/2012/07/120712_click';
import transformer from '.';

const { article: legacyPageData } = legacyMAPData;

describe('addAnalyticsCounterName', () => {
  it('should add an analytics counter name', async () => {
    const expected = assocPath(
      ['metadata', 'analyticsLabels', 'counterName'],
      'hausa.multimedia.2012.07.120712_click.page',
      legacyPageData,
    );
    expect(transformer(legacyPageData)).toEqual(expected);
  });
});
