export default ({ mediaPlayerTitle }) => {
  describe(`And using ${amp.platform}`, () => {
    it('It can read the media player title', () => {
      const mediaPlayer = amp.document.querySelector(
        `amp-iframe[title="${mediaPlayerTitle}"]`,
      );

      expect(mediaPlayer).toBeInTheDocument();
    });
  });
};
