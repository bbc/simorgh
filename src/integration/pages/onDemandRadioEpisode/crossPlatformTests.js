import {
  // runCommonCrossPlatformTests, linked data missing
  runMediaPlayerEmbedTests,
} from '../../common';

export default () => {
  // runCommonCrossPlatformTests(); linked data missing

  if (global.isExpired) {
    describe('Expired Episode', () => {
      it(`I can see the 'Content is not available' placeholder`, () => {
        const contentNotAvailableEl = document.querySelector('main div strong');

        expect(contentNotAvailableEl).toBeInTheDocument();
        expect(contentNotAvailableEl.textContent).toBeTruthy();
        expect(contentNotAvailableEl.textContent).toMatchSnapshot();
      });
    });
  } else {
    runMediaPlayerEmbedTests();
  }

  it('I can see the brand title', () => {
    const brandTitleEl = document.querySelector('h1 span span:first-child');

    expect(brandTitleEl).toBeInTheDocument();
    expect(brandTitleEl.textContent).toBeTruthy();
    expect(brandTitleEl.textContent).toMatchSnapshot();
  });

  it('I can see the episode title', () => {
    const episodeTitleEl = document.querySelector('h1 span span:last-child');

    expect(episodeTitleEl).toBeInTheDocument();
    expect(episodeTitleEl.textContent).toBeTruthy();
    expect(episodeTitleEl.textContent).toMatchSnapshot();
  });

  it('I can see the episode summary', () => {
    const episodeSummaryEl = document.querySelector('main p');

    expect(episodeSummaryEl).toBeInTheDocument();
    expect(episodeSummaryEl.textContent).toBeTruthy();
    expect(episodeSummaryEl.textContent).toMatchSnapshot();
  });

  describe('a11y', () => {
    it('Assistive technology reads the brand and episode title as the headline', () => {
      const headlineEl = document.querySelector(
        'h1[id="content"][tabindex="-1"]',
      );

      expect(headlineEl).toBeInTheDocument();
      expect(headlineEl.textContent).toBeTruthy();
      expect(headlineEl.textContent).toMatchSnapshot();
    });
  });
};
