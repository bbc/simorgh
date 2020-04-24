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

  const bulletedListEl = document.querySelectorAll('main ul[role="list"] > li');

  if (bulletedListEl) {
    it('I can see the bulleted list item', () => {
      bulletedListEl.forEach(bullet => {
        expect(bullet).toBeInTheDocument();
        expect(bullet.textContent).toBeTruthy();

        const link = bullet.querySelector('a');

        if (link) {
          expect(link.getAttribute('href')).toMatchSnapshot(
            `with text '${link.textContent}' and link`,
          );
        } else {
          expect(bullet.textContent).toMatchSnapshot('with text');
        }
      });
    });
  }

  const releatedContentEl = document.querySelector('section [role="list"]');

  if (releatedContentEl) {
    it('I can see the related content', () => {
      expect(releatedContentEl).toBeInTheDocument();
      expect(releatedContentEl.textContent).toBeTruthy();
      expect(releatedContentEl.textContent).toMatchSnapshot();
    });
  }
};
