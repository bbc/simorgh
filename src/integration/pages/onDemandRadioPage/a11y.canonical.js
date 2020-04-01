export default ({ audioPlayerTitle }) => {
  describe(`And using ${canonical.platform}`, () => {
    it('It can read the audio player title', () => {
      const audioPlayer = canonical.document.querySelector(
        `iframe[title="${audioPlayerTitle}"]`,
      );

      expect(audioPlayer).toBeInTheDocument();
    });
  });
};
