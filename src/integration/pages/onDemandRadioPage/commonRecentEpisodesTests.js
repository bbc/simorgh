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

    it('should contain the list items', () => {
      recentEpisodesListItems.forEach(itemEl => {
        expect(itemEl).toBeInTheDocument();
        expect(itemEl.textContent).toBeTruthy();
        expect(itemEl.querySelector('a').getAttribute('href')).toBeTruthy();
      });
    });
  });
};
