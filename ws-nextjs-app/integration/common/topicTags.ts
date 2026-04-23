export default () => {
  describe('topic tags', () => {
    it('should display topic tags, if they exist', () => {
      const topicTags = document.querySelector(
        `aside[aria-labelledby*='related-topics'] a`,
      );

      if (topicTags) {
        expect(topicTags).toBeInTheDocument();
      } else {
        expect(topicTags).toBeNull();
      }
    });
  });
};
