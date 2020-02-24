import assocPath from 'ramda/src/assocPath';
import transformer from '.';
import legacyPageData from '#data/hausa/legacyAssets/multimedia/2012/07/120712_click';

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
