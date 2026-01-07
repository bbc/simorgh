export default () => {
  describe('Page content', () => {
    describe('First item in the first curation', () => {
      it('is the correct headline', () => {
        const firstItemHeadline = document.querySelector(
          '[data-testid="topic-promos"] > li  h3 a',
        );
        expect(firstItemHeadline).toBeInTheDocument();

        if (firstItemHeadline) {
          expect(firstItemHeadline.textContent).toMatchSnapshot();
        }
      });

      it('is the correct image', () => {
        const firstImage = document.querySelector(
          '[data-testid="topic-promos"] > li  img, amp-img',
        );
        expect(firstImage).toBeInTheDocument();
        expect(firstImage).toMatchSnapshot();
      });
    });

    it('should display a simple curation grid', () => {
      const simpleCurationGrid = document.querySelector(
        '[data-testid="curation-grid-normal"]',
      );

      expect(simpleCurationGrid).toBeInTheDocument();
    });

    it('should render the main html tag with an attribute of role with the value of main', () => {
      const mainTag = document.querySelector("main[role='main']");
      expect(mainTag).toBeInTheDocument();
    });
  });
};
