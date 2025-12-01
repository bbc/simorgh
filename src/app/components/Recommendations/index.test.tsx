import React from 'react';
import { render } from '#app/components/react-testing-library-with-providers';
import Recommendations from '.';
import recommendationsFixtures, { topStoriesContentFixture } from './fixtures';

describe('Recommendations', () => {
  it('should render a single recommendation', () => {
    const { getByText } = render(
      <Recommendations data={recommendationsFixtures} />,
      {
        service: 'pidgin',
        toggles: { midArticleOnwardJourney: { enabled: true } },
      },
    );
    const title = getByText(recommendationsFixtures[0].title);
    expect(title).toBeInTheDocument();
  });

  it('should render multiple recommendations', () => {
    const { getByText } = render(
      <Recommendations data={recommendationsFixtures} />,
      {
        service: 'pidgin',
        toggles: { midArticleOnwardJourney: { enabled: true } },
      },
    );

    const listEl = document.querySelector('ul');
    expect(listEl).toBeInTheDocument();

    recommendationsFixtures.forEach(({ title }) => {
      const recommendationTitle = getByText(title);
      expect(recommendationTitle).toBeInTheDocument();
    });
  });

  it('should not render recommendations when toggle is disabled', () => {
    render(<Recommendations data={recommendationsFixtures} />, {
      service: 'pidgin',
      toggles: { midArticleOnwardJourney: { enabled: false } },
    });

    const listEl = document.querySelector('ul');
    expect(listEl).not.toBeInTheDocument();
  });

  it('should not render recommendations for a service that has Most Read disabled', () => {
    render(<Recommendations data={recommendationsFixtures} />, {
      service: 'cymrufyw',
    });

    const listEl = document.querySelector('ul');
    expect(listEl).not.toBeInTheDocument();
  });
  it('should render both top stories with title, href, image, and alt text when referrerVariant is adaptive_direct', () => {
    render(
      <Recommendations
        data={[]}
        topStoriesContent={topStoriesContentFixture}
        referrerVariant="adaptive_direct"
      />,
      {
        service: 'mundo',
        toggles: { midArticleOnwardJourney: { enabled: true } },
      },
    );
    const sectionTitle = document.querySelector(
      '[id="recommendations-heading"]',
    );
    expect(sectionTitle).toBeInTheDocument();
    expect(sectionTitle?.textContent).toBe('Principales noticias');
    const listItems = document.querySelectorAll('li[role="listitem"]');
    expect(listItems).toHaveLength(topStoriesContentFixture.length);

    listItems.forEach((item, index) => {
      const story = topStoriesContentFixture[index];
      const title =
        story.headlines.promoHeadline.blocks[0].model.blocks[0].model.text;
      const href = story.locators.canonicalUrl;

      // Extract alt text from fixture
      const altText =
        story.images?.defaultPromoImage?.blocks?.find(
          block => block.type === 'altText',
        )?.model?.blocks?.[0]?.model?.blocks?.[0]?.model?.text || '';

      const link = item.querySelector('a');
      expect(link).toBeInTheDocument();
      expect(link?.getAttribute('href')).toBe(href);
      expect(link?.textContent).toContain(title);

      const image = item.querySelector('img');
      expect(image).toBeInTheDocument();
      expect(image?.getAttribute('src')).toBeTruthy();
      expect(image?.getAttribute('alt')).toBe(altText);
    });
  });
});
