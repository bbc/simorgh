import {
  runCommonCrossPlatformTests,
  runMediaPlayerEmbedTests,
  runHeadlineTests,
} from '../../common';

export default () => {
  runCommonCrossPlatformTests();
  runMediaPlayerEmbedTests();
  runHeadlineTests();

  describe('Timestamp', () => {
    const timestampEl = document.querySelector('time');

    it('should be in the document', () => {
      expect(timestampEl).toBeInTheDocument();
    });

    it('should have text', () => {
      expect(timestampEl.textContent).toBeTruthy();
    });

    it('should match text', () => {
      expect(timestampEl.textContent).toMatchSnapshot();
    });
  });

  if (global.hasBulletedList) {
    describe('Bulleted list item', () => {
      const bulletedListEl = document.querySelector('main ul[role="list"]');

      it('should be in the document', () => {
        expect(bulletedListEl).toBeInTheDocument();
      });

      it('should have text', () => {
        expect(bulletedListEl.textContent).toBeTruthy();
      });

      it('should match text', () => {
        expect(bulletedListEl.textContent).toMatchSnapshot();
      });
    });
  }

  if (global.hasRelatedContent) {
    describe('Related content', () => {
      const relatedContentEl = document.querySelector('section [role="list"]');

      it('should be in the document', () => {
        expect(relatedContentEl).toBeInTheDocument();
      });

      it('should have text', () => {
        expect(relatedContentEl.textContent).toBeTruthy();
      });

      it('should match text', () => {
        expect(relatedContentEl.textContent).toMatchSnapshot();
      });
    });
  }
};
