export default () => {
  describe('Recent Episodes', () => {
    const recentEpisodesList = document.querySelector(
      '[data-e2e="recent-episodes-list"]',
    );

    const recentEpisodesListItem = document.querySelector(
      '[data-e2e="recent-episodes-list-item"]',
    );

    it('should be in the document', () => {
      expect(recentEpisodesList).toBeInTheDocument();
    });

    it('should contain the list items', () => {
      expect(recentEpisodesListItem).toBeInTheDocument();
    });
  });
};
