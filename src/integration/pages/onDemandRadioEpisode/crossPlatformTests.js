import {
  // runCommonCrossPlatformTests, linked data missing
  runMediaPlayerEmbedTests,
} from '../../common';

export default () => {
  // runCommonCrossPlatformTests(); linked data missing

  if (global.isExpired) {
    describe('Expired Episode', () => {
      describe('Expired message', () => {
        const contentNotAvailableEl = document.querySelector('main div strong');

        it('should be in the document', () => {
          expect(contentNotAvailableEl).toBeInTheDocument();
        });

        it('should have text', () => {
          expect(contentNotAvailableEl.textContent).toBeTruthy();
        });

        it('should match text', () => {
          expect(contentNotAvailableEl.textContent).toMatchSnapshot();
        });
      });
    });
  } else {
    runMediaPlayerEmbedTests();

    describe('Brand title', () => {
      const brandTitleEl = document.querySelector('h1 span span:first-child');

      it('should be in the document', () => {
        expect(brandTitleEl).toBeInTheDocument();
      });

      it('should have text', () => {
        expect(brandTitleEl.textContent).toBeTruthy();
      });

      it('should match text', () => {
        expect(brandTitleEl.textContent).toMatchSnapshot();
      });
    });

    describe('Episode title', () => {
      const episodeTitleEl = document.querySelector('h1 span span:last-child');

      it('should be in the document', () => {
        expect(episodeTitleEl).toBeInTheDocument();
      });

      it('should have text', () => {
        expect(episodeTitleEl.textContent).toBeTruthy();
      });

      it('should match text', () => {
        expect(episodeTitleEl.textContent).toMatchSnapshot();
      });
    });

    describe('Episode summary', () => {
      const episodeSummaryEl = document.querySelector('main p');

      it('should be in the document', () => {
        expect(episodeSummaryEl).toBeInTheDocument();
      });

      it('should have text', () => {
        expect(episodeSummaryEl.textContent).toBeTruthy();
      });

      it('should match text', () => {
        expect(episodeSummaryEl.textContent).toMatchSnapshot();
      });
    });

    describe('a11y', () => {
      describe('Assistive technology reads the brand and episode title as the headline', () => {
        // TODO how does the following test this?
        const headlineEl = document.querySelector(
          'h1[id="content"][tabindex="-1"]',
        );

        it('should be in the document', () => {
          expect(headlineEl).toBeInTheDocument();
        });

        it('should have text', () => {
          expect(headlineEl.textContent).toBeTruthy();
        });

        it('should match text', () => {
          expect(headlineEl.textContent).toMatchSnapshot();
        });
      });
    });
  }
};
