import getSecondaryColumnUrl from '.';

describe('getSecondaryColumnEndpoint', () => {
  it('should return endpoint when passed service', () => {
    expect(getSecondaryColumnUrl({ service: 'mundo' })).toBe(
      '/mundo/sty-secondary-column.json',
    );
  });
  it('should return endpoint when passed service and variant', () => {
    expect(
      getSecondaryColumnUrl({ service: 'zhongwen', variant: 'trad' }),
    ).toBe('/zhongwen/sty-secondary-column/trad.json');
  });
});
