import { runCommonCrossPlatformTests, runTimestampTests } from '../../common';

export default service => {
  runCommonCrossPlatformTests(service);
  runTimestampTests();

  describe(`Related Content`, () => {
    const relatedContentLinks = document.querySelectorAll(
      '[data-e2e="related-content-heading"] a',
    );

    if (relatedContentLinks) {
      relatedContentLinks.forEach(relatedContentLink => {
        const relatedContentText = relatedContentLink.textContent;
        const relatedContentUrl = relatedContentLink.getAttribute('href');

        it('should be in the document', () => {
          expect(relatedContentLink).toBeInTheDocument();
        });

        it('should contain text', () => {
          expect(relatedContentText).toBeTruthy();
        });

        it('should match text and url', () => {
          expect({
            text: relatedContentText,
            url: relatedContentUrl,
          }).toMatchSnapshot();
        });
      });
    }
  });

  describe('Latest Media', () => {
    const latestMediaLinks = document.querySelectorAll(
      '[data-testid="latest-media"] a',
    );

    if (latestMediaLinks) {
      latestMediaLinks.forEach(latestMediaLink => {
        const latestMediaText = latestMediaLink.textContent;
        const latestMediaUrl = latestMediaLink.getAttribute('href');

        it('should be in the document', () => {
          expect(latestMediaLink).toBeInTheDocument();
        });

        it('should contain text', () => {
          expect(latestMediaText).toBeTruthy();
        });

        it('should match text and url', () => {
          expect({
            text: latestMediaText,
            url: latestMediaUrl,
          }).toMatchSnapshot();
        });
      });
    }
  });
};
