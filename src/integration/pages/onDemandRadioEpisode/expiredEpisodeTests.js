export default () => {
  describe('Expired Episode', () => {
    it('I can see the brand title', () => {
      const brandTitleEl = document.querySelector('h1 span span:first-child');

      expect(brandTitleEl).toBeInTheDocument();
      expect(brandTitleEl.textContent).toBeTruthy();
      expect(brandTitleEl.textContent).toMatchSnapshot();
    });

    it('I can see the episode title', () => {
      const brandTitleEl = document.querySelector('h1 span span:last-child');

      expect(brandTitleEl).toBeInTheDocument();
      expect(brandTitleEl.textContent).toBeTruthy();
      expect(brandTitleEl.textContent).toMatchSnapshot();
    });

    it('I can see the episode summary', () => {
      const episodeSummaryEl = document.querySelector('main p');

      expect(episodeSummaryEl).toBeInTheDocument();
      expect(episodeSummaryEl.textContent).toBeTruthy();
      expect(episodeSummaryEl.textContent).toMatchSnapshot();
    });

    it(`I can see the 'Content is not available' placeholder`, () => {
      const contentNotAvailableEl = document.querySelector('main div strong');

      expect(contentNotAvailableEl).toBeInTheDocument();
      expect(contentNotAvailableEl.textContent).toBeTruthy();
      expect(contentNotAvailableEl.textContent).toMatchSnapshot();
    });
  });
};
