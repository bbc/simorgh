export default () => {
  describe('Story Promo', () => {
    const storyPromo = document.querySelector('[data-e2e="story-promo"]');
    it('should be in the document', () => {
      expect(storyPromo).toBeInTheDocument();
    });

    describe('Image', () => {
      const imageEl = storyPromo.querySelector('img, amp-img');
      it('should be in the promo', () => {
        expect(imageEl).toBeInTheDocument();
      });

      it('should match image', () => {
        expect(imageEl).toMatchSnapshot();
      });
    });

    describe('Headline', () => {
      const h3El = storyPromo.querySelector('h3');
      it('should be in the promo', () => {
        expect(h3El).toBeInTheDocument();
      });

      it('should have text', () => {
        expect(h3El.textContent).toBeTruthy();
      });

      it('should match text', () => {
        expect(h3El.textContent).toMatchSnapshot();
      });
    });

    describe('Link', () => {
      const linkEl = storyPromo.querySelector('a');
      const text = linkEl.textContent;
      const url = linkEl.getAttribute('href');

      it('should be in the promo', () => {
        expect(linkEl).toBeInTheDocument();
      });

      it('should have text', () => {
        expect(text).toBeTruthy();
      });

      it('should match text and url', () => {
        expect({ text, url }).toMatchSnapshot();
      });
    });

    describe('Timestamp', () => {
      const timestampEl = storyPromo.querySelector('time');
      const text = timestampEl.textContent;
      const date = timestampEl.getAttribute('datetime');

      it('should be in the promo', () => {
        expect(timestampEl).toBeInTheDocument();
      });

      it('should have text', () => {
        expect(text).toBeTruthy();
      });

      it('should match text and date', () => {
        expect({ text, date }).toMatchSnapshot();
      });
    });
  });
};
