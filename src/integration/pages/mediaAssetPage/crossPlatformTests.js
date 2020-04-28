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

  const bulletedListItem = document.querySelector('main ul[role="list"] > li');

  if (bulletedListItem) {
    it('I can see a bulleted list item', () => {
      expect(bulletedListItem).toBeInTheDocument();
      expect(bulletedListItem.textContent).toBeTruthy();
      expect(bulletedListItem.textContent).toMatchSnapshot();
    });
  }

  const bulletedListItemWithLink = document.querySelector(
    'main ul[role="list"] > li > a',
  );

  if (bulletedListItemWithLink) {
    it('I can see a bulleted list item with link', () => {
      expect(bulletedListItemWithLink.getAttribute('href')).toMatchSnapshot(
        bulletedListItemWithLink.textContent,
      );
    });
  }

  const relatedContentLinks = document.querySelectorAll(
    'section [role="list"] a',
  );

  if (relatedContentLinks) {
    it('I can see related content', () => {
      relatedContentLinks.forEach(relatedContentLink => {
        expect(relatedContentLink).toBeInTheDocument();
        expect(relatedContentLink.textContent).toBeTruthy();
        expect(relatedContentLink.getAttribute('href')).toMatchSnapshot(
          relatedContentLink.textContent,
        );
      });
    });
  }
};
