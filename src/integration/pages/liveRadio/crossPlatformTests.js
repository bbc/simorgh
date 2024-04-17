import {
  runCommonCrossPlatformTests,
  runMediaPlayerEmbedLegacyTests,
} from '../../common';

export default service => {
  runCommonCrossPlatformTests(service);
  runMediaPlayerEmbedLegacyTests();

  describe('Summary', () => {
    const summaryEl = document.querySelector('main p');
    const summaryText = summaryEl.textContent;

    it('should be in the document', () => {
      expect(summaryEl).toBeInTheDocument();
    });

    it('should contain text', () => {
      expect(summaryText).toBeTruthy();
    });

    it('should match text', () => {
      expect(summaryText).toMatchSnapshot();
    });
  });
};
