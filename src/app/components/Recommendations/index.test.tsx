import React from 'react';
import { render } from '#app/components/react-testing-library-with-providers';
import { OptimoBlock } from '#app/models/types/optimo';
import Recommendations from '.';
import recommendationsFixtures, {
  topStoriesContentFixture,
  featuresContentFixture,
  relatedContentBlocksFixture,
} from './fixtures';

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
  it('should render features with title, href, image, and alt text when referrerVariant is adaptive_social', () => {
    const { debug } = render(
      <Recommendations
        data={[]}
        featuresContent={featuresContentFixture}
        referrerVariant="adaptive_social"
      />,
      {
        service: 'mundo',
        toggles: { midArticleOnwardJourney: { enabled: true } },
      },
    );

    debug(); // This will print the rendered DOM to the test output

    const sectionTitle = document.querySelector(
      '[id="recommendations-heading"]',
    );
    expect(sectionTitle).toBeInTheDocument();
    expect(sectionTitle?.textContent).toBe('No te lo pierdas');

    const listItems = document.querySelectorAll('li[role="listitem"]');

    expect(listItems).toHaveLength(featuresContentFixture.length);

    listItems.forEach((item, index) => {
      const story = featuresContentFixture[index];
      const title =
        story.headlines.promoHeadline.blocks[0].model.blocks[0].model.text;
      const href = story.locators.canonicalUrl;

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
  it('should render related content with title, href, image, and alt text when referrerVariant is adaptive_search', () => {
    render(
      <Recommendations
        data={[]}
        blocks={relatedContentBlocksFixture}
        referrerVariant="adaptive_search"
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

    const listItems = document.querySelectorAll('li[role="listitem"]');
    expect(listItems.length).toBe(2);

    const firstLink = listItems[0].querySelector('a');
    expect(firstLink).toBeInTheDocument();
    expect(firstLink?.getAttribute('href')).toBe(
      'https://www.bbc.com/mundo/articles/c629n28z490o',
    );
    expect(firstLink?.textContent).toContain(
      'Gran Museo Egipcio, la gigantesca obra que exhibe los secretos de Tutankamón y que se inaugura tras décadas de trabajos',
    );

    const firstImage = listItems[0].querySelector('img');
    expect(firstImage).toBeInTheDocument();
    expect(firstImage?.getAttribute('src')).toBeTruthy();
    expect(firstImage?.getAttribute('alt')).toBe(
      "Visitors walk past Tutankhamun's gold-and-turquoise funerary mask on display at the Egyptian Museum in Cairo, on 2 December 2024.",
    );

    const secondLink = listItems[1].querySelector('a');
    expect(secondLink).toBeInTheDocument();
    expect(secondLink?.getAttribute('href')).toBe(
      'https://www.bbc.com/mundo/articles/c629n28z491p',
    );
    expect(secondLink?.textContent).toContain('Second related content title');

    const secondImage = listItems[1].querySelector('img');
    expect(secondImage).toBeInTheDocument();
    expect(secondImage?.getAttribute('src')).toBeTruthy();
    expect(secondImage?.getAttribute('alt')).toBe(
      'Second related content alt text.',
    );
  });
  it('should render a single related content item without a list when only one item is present', () => {
    const singleRelatedContentBlocks = [
      ...relatedContentBlocksFixture.slice(0, 3),
      relatedContentBlocksFixture[3]
        ? {
            ...relatedContentBlocksFixture[3],
            model: {
              blocks: relatedContentBlocksFixture[3]?.model?.blocks
                ? [relatedContentBlocksFixture[3].model.blocks[0]]
                : [],
            },
          }
        : undefined,
    ].filter(Boolean) as OptimoBlock[];

    const { getByText } = render(
      <Recommendations
        data={[]}
        blocks={singleRelatedContentBlocks}
        referrerVariant="adaptive_search"
      />,
      {
        service: 'mundo',
        toggles: { midArticleOnwardJourney: { enabled: true } },
      },
    );

    // Should not render a list
    const listItems = document.querySelectorAll('li[role="listitem"]');
    expect(listItems.length).toBe(0);

    // Should render the single promo directly
    const link = getByText(
      'Gran Museo Egipcio, la gigantesca obra que exhibe los secretos de Tutankamón y que se inaugura tras décadas de trabajos',
    ).closest('a');
    expect(link).toBeInTheDocument();
    expect(link?.getAttribute('href')).toBe(
      'https://www.bbc.com/mundo/articles/c629n28z490o',
    );

    const image = document.querySelector('img');
    expect(image).toBeInTheDocument();
    expect(image?.getAttribute('src')).toBeTruthy();
    expect(image?.getAttribute('alt')).toBe(
      "Visitors walk past Tutankhamun's gold-and-turquoise funerary mask on display at the Egyptian Museum in Cairo, on 2 December 2024.",
    );
  });
});
