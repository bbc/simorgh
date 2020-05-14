import {
  runCommonCrossPlatformTests,
  runMediaPlayerEmbedTests,
} from '../../common';

export default () => {
  runCommonCrossPlatformTests();
  runMediaPlayerEmbedTests();

  it('I can see the brand and episode title', () => {
    const brandTitleEl = document.querySelector('h1[id="content"]');

    expect(brandTitleEl).toBeInTheDocument();
    expect(brandTitleEl.textContent).toBeTruthy();
    expect(brandTitleEl.textContent).toMatchSnapshot();
  });

  it('I can see the episode summary', () => {
    const episodeSummaryEl = document.querySelector('main p');

    expect(episodeSummaryEl).toBeInTheDocument();
    expect(episodeSummaryEl.textContent).toBeTruthy();
    expect(episodeSummaryEl.textContent).toMatchSnapshot();
  });
};
