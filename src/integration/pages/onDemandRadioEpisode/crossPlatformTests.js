import {
  runCommonCrossPlatformTests,
  runMediaPlayerEmbedTests,
} from '../../common';

export default () => {
  runCommonCrossPlatformTests();
  runMediaPlayerEmbedTests();

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
};
