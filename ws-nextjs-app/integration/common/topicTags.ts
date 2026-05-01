export default () => {
  describe('Topic Tags', () => {
    const topicTags = Array.from(
      document.querySelectorAll(`aside[aria-labelledby*='related-topics'] a`),
    );

    if (topicTags.length > 0) {
      topicTags.forEach(tag => {
        it('should be in the document', () => {
          expect(tag).toBeInTheDocument();
        });

        it('should have text', () => {
          expect(tag.textContent).toBeTruthy();
        });

        it('should match text and href', () => {
          expect({
            text: tag.textContent,
            href: tag.getAttribute('href'),
          }).toMatchSnapshot();
        });
      });
    } else {
      it('should not render any topic tags', () => {
        expect(topicTags.length).toBe(0);
      });
    }
  });
};
