export default () => {
  describe('Page content', () => {
    const pageData = window.SIMORGH_DATA.pageData;
    // console.log(pageData);
    const numberOfItems = pageData.curations.length;
    // console.log(`lenght of curations: ${numberOfItems}`);
    const firstItemHeadline = document.querySelector(
      '[data-testid="topic-promos"] > li  h3 a',
    );
    // console.log(`First headline: ${firstItemHeadline}`);

    const h1 = document.querySelector('h1');
    const hierarchicalGrid = document.querySelector(
      '[data-testid="hierarchical-grid"]',
    );
    const numberOfcurations = document.querySelectorAll('h2').length;

    it('H1 is displayed', () => {
      expect(h1).toBeInTheDocument();
    });

    it('hierarchical grid is displayed', () => {
      expect(hierarchicalGrid).toBeInTheDocument();
      expect(numberOfcurations).toEqual(18);
    });

    it('First item in the first curation is the correct headline', () => {
      expect(firstItemHeadline).toBeInTheDocument();
      console.log(firstItemHeadline.textContent);
      expect(firstItemHeadline.textContent).toMatch(
        '13:31 - “Баланы сабады деп аялымды камап салышарын өзүм да билген эмесмин”. Кадамжайда токмоктолгон наристенин атасы',
      );
    });
  });
};
