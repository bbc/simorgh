export default pageData => {
  describe('Number of Curations on a Page', () => {
    it('should render the correct number of curations, including most read, radio schedule, portrait video & VJ embed', () => {
      const curationsWithSummaries = pageData.curations.filter(
        ({ summaries, mostRead, radioSchedule, embed, portraitVideo }) =>
          (summaries && summaries.length > 0) ||
          mostRead ||
          radioSchedule ||
          embed ||
          portraitVideo,
      );
      const h2s = Array.from(document.querySelectorAll('main h2'));
      const numberOfCurations = h2s.length;
      expect(numberOfCurations).toEqual(curationsWithSummaries.length);
    });
  });
};
