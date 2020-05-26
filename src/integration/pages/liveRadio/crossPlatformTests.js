import {
  runCommonCrossPlatformTests,
  runMediaPlayerEmbedTests,
  runHeadlineTests,
} from '../../common';

export default () => {
  runCommonCrossPlatformTests();
  runMediaPlayerEmbedTests();
  runHeadlineTests();

  describe('Summary', () => {
    const summaryEl = document.querySelector('main p');

    it('should be in the document', () => {
      expect(summaryEl).toBeInTheDocument();
    });

    it('should have text', () => {
      expect(summaryEl.textContent).toBeTruthy();
    });

    it('should match text', () => {
      expect(summaryEl.textContent).toMatchSnapshot();
    });
  });
};
