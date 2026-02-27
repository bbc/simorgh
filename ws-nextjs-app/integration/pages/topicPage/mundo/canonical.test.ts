/**
 * @service mundo
 * @pathname /mundo/topics/c1en6xwmpkvt
 */

import pageContentTests from '../../homePage/pageContentTests';

describe('Topic page with badge image, description and multiple curations with h2 headings', () => {
  pageContentTests();
  it('should display the topic badge image', () => {
    const topicBadge = document.querySelector('img[data-testid="topic-badge"]');
    expect(topicBadge).toBeInTheDocument();
    expect(topicBadge).toMatchSnapshot();
  });
  it('should display the topic description under the title', () => {
    const title = document.querySelector('h1#content');
    expect(title).toBeInTheDocument();

    const parent = title?.parentElement;
    const description = parent?.nextElementSibling;
    expect(description).toBeInTheDocument();
    expect(description?.textContent).toMatchSnapshot();
  });

  it('should display multiple curations each with a curation title', () => {
    const curationTitles = Array.from(document.querySelectorAll('h2'));
    const curationGrids = Array.from(
      document.querySelectorAll(
        '[data-testid="curation-grid-normal"], [data-testid="hierarchical-grid"]',
      ),
    );

    // There should be at least two curations with titles
    expect(curationTitles.length).toBeGreaterThan(1);
    expect(curationGrids.length).toBeGreaterThan(1);

    // Each curation grid should be preceded by a curation title (h2)
    curationGrids.forEach(grid => {
      let previous = grid.previousElementSibling;
      // Traverse back to find the h2 (skip over any non-h2 elements)
      while (previous && previous.tagName !== 'H2') {
        previous = previous.previousElementSibling;
      }
      expect(previous).not.toBeNull();
      expect(previous?.tagName).toBe('H2');
    });
  });
});
