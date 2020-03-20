import getHeadlineElement from '../utilities/getHeadlineElement';

const { amp, canonical } = global;

export default ({ skipToContentText, headlineText }) => {
  [amp, canonical].forEach(page => {
    it('I can see a skip to content link that links to the main content of the page', () => {
      const skipToContentEl = page.getByText(skipToContentText);
      const mainContentEl = getHeadlineElement(page, headlineText);

      expect(skipToContentEl.getAttribute('href')).toBe('#content');
      expect(mainContentEl.getAttribute('id')).toBe('content');
      expect(mainContentEl.getAttribute('tabindex')).toBe('-1');
    });
  });
};
