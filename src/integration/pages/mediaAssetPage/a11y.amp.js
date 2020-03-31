export default ({ mediaPlayerTitle }) => {
  describe(`And using ${amp.platform}`, () => {
    it('I can see the media player title', () => {
      const mediaPlayer = amp.document.querySelector(
        `amp-iframe[title="${mediaPlayerTitle}"]`,
      );

      expect(mediaPlayer).toBeInTheDocument();
    });
  });
};
