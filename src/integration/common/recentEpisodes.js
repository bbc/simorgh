export default () => {
  describe('Recent Episodes', () => {
    const recentEpisodesList = document.querySelector(
      '[data-e2e="recent-episodes-list"]',
    );

    const recentEpisodesListItems = document.querySelectorAll(
      '[data-e2e="recent-episodes-list-item"]',
    );

    it('should be in the document', () => {
      expect(recentEpisodesList).toBeInTheDocument();
    });

    describe('List items', () => {
      recentEpisodesListItems.forEach(listItemEl => {
        const text = listItemEl.textContent.trim();
        const url = listItemEl.querySelector('a').getAttribute('href');

        it('should match text and url', () => {
          expect({
            text,
            url,
          }).toMatchSnapshot();
        });
      });
    });
  });
};
