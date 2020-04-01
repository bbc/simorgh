export default ({ audioPlayerTitle }) => {
  describe(`And using ${amp.platform}`, () => {
    it('It can read the audio player title', () => {
      const audioPlayer = amp.document.querySelector(
        `amp-iframe[title="${audioPlayerTitle}"]`,
      );

      expect(audioPlayer).toBeInTheDocument();
    });
  });
};
