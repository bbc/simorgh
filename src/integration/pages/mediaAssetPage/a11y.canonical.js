export default ({ mediaPlayerTitle }) => {
  describe(`And using ${canonical.platform}`, () => {
    it('I can see the media player title', () => {
      const mediaPlayer = canonical.document.querySelector(
        `iframe[title="${mediaPlayerTitle}"]`,
      );

      expect(mediaPlayer).toBeInTheDocument();
    });
  });
};
