import assocPath from 'ramda/src/assocPath';
import legacyPageData from '#data/hausa/legacyAssets/multimedia/2012/07/120712_click';
import transformer from '.';

describe('addAnalyticsCounterName', () => {
  it('should add an analytics counter name', async () => {
    const expected = assocPath(
      ['metadata', 'analyticsLabels', 'counterName'],
      'hausa.multimedia.2012.07.120712_click.page',
      legacyPageData.data.article,
    );
    expect(transformer(legacyPageData.data.article)).toEqual(expected);
  });
});
