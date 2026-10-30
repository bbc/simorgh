import excludeCurrentArticle from '.';

describe('excludeCurrentArticle', () => {
  const promos = [
    { id: 'c0000000001o', title: 'Promo 1' },
    { id: 'c0000000002o', title: 'Promo 2' },
    { id: 'c0000000003o', title: 'Promo 3' },
  ];

  it('removes the promo whose id matches the current article id', () => {
    expect(excludeCurrentArticle(promos, 'c0000000002o')).toEqual([
      { id: 'c0000000001o', title: 'Promo 1' },
      { id: 'c0000000003o', title: 'Promo 3' },
    ]);
  });

  it('matches a bare promo id against a fully qualified URN', () => {
    expect(
      excludeCurrentArticle(promos, 'urn:bbc:ares::article:c0000000002o'),
    ).toEqual([
      { id: 'c0000000001o', title: 'Promo 1' },
      { id: 'c0000000003o', title: 'Promo 3' },
    ]);
  });

  it('matches a fully qualified promo URN against a bare current article id', () => {
    const urnPromos = [
      { id: 'urn:bbc:ares::article:c0000000001o', title: 'Promo 1' },
      { id: 'urn:bbc:ares::article:c0000000002o', title: 'Promo 2' },
    ];

    expect(excludeCurrentArticle(urnPromos, 'c0000000002o')).toEqual([
      { id: 'urn:bbc:ares::article:c0000000001o', title: 'Promo 1' },
    ]);
  });

  it('does not remove promos referencing different content, even with a similar URN scheme', () => {
    const cpsPromos = [
      { id: 'urn:bbc:ares::asset:sport/23313187', title: 'Sport promo' },
    ];

    expect(
      excludeCurrentArticle(cpsPromos, 'urn:bbc:ares::article:23313187'),
    ).toEqual(cpsPromos);
  });

  it('returns all promos unchanged when currentArticleId is not provided', () => {
    expect(excludeCurrentArticle(promos)).toEqual(promos);
  });

  it('returns all promos unchanged when no promo matches', () => {
    expect(excludeCurrentArticle(promos, 'c0000000099o')).toEqual(promos);
  });

  it('ignores promos without an id', () => {
    const promosWithMissingIds = [
      { title: 'Promo without id' },
      { id: 'c0000000002o', title: 'Promo 2' },
    ];

    expect(excludeCurrentArticle(promosWithMissingIds, 'c0000000002o')).toEqual(
      [{ title: 'Promo without id' }],
    );
  });

  it('defaults to an empty array when promos is not provided', () => {
    expect(excludeCurrentArticle(undefined, 'c0000000001o')).toEqual([]);
  });
});
