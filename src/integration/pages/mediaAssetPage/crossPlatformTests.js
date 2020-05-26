import {
  runCommonCrossPlatformTests,
  runMediaPlayerEmbedTests,
} from '../../common';

export default () => {
  runCommonCrossPlatformTests();
  runMediaPlayerEmbedTests();

  it('I can see the headline', () => {
    const headlineEl = document.querySelector('h1[id="content"]');

    expect(headlineEl).toBeInTheDocument();
    expect(headlineEl.textContent).toBeTruthy();
    expect(headlineEl.textContent).toMatchSnapshot();
  });

  it('I can see the timestamp', () => {
    const timestampEl = document.querySelector('time');

    expect(timestampEl).toBeInTheDocument();
    expect(timestampEl.textContent).toBeTruthy();
    expect(timestampEl.textContent).toMatchSnapshot();
  });

  if (global.hasBulletedList) {
    it('I can see the bulleted list item', () => {
      const bulletedListEl = document.querySelector('main ul[role="list"]');

      expect(bulletedListEl).toBeInTheDocument();
      expect(bulletedListEl.textContent).toBeTruthy();
      expect(bulletedListEl.textContent).toMatchSnapshot();
    });
  }

  if (global.hasRelatedContent) {
    it('I can see the related content', () => {
      const releatedContentEl = document.querySelector('section [role="list"]');

      expect(releatedContentEl).toBeInTheDocument();
      expect(releatedContentEl.textContent).toBeTruthy();
      expect(releatedContentEl.textContent).toMatchSnapshot();
    });
  }
};
