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

  const bulletedListEl = document.querySelector('main ul[role="list"] > li');

  if (bulletedListEl) {
    it('I can see a bulleted list item', () => {
      expect(bulletedListEl).toBeInTheDocument();
      expect(bulletedListEl.textContent).toBeTruthy();
      expect(bulletedListEl.textContent).toMatchSnapshot();

      const link = document.querySelector('main ul[role="list"] > li > a');

      if (link) {
        expect(link.getAttribute('href')).toMatchSnapshot(
          `with link ${link.textContent}`,
        );
      }
    });
  }

  const relatedContentItems = document.querySelectorAll(
    'section [role="list"] a',
  );

  if (relatedContentItems) {
    it('I can see the related content', () => {
      relatedContentItems.forEach(relatedContent => {
        expect(relatedContent).toBeInTheDocument();
        expect(relatedContent.textContent).toBeTruthy();
        expect(relatedContent.getAttribute('href')).toMatchSnapshot(
          relatedContent.textContent,
        );
      });
    });
  }
};
