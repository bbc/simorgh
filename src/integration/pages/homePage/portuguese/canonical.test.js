/**
 * @service portuguese
 * @pathname /portuguese
 */

import numberOfCurationsTest from '#src/integration/pages/homePage/numberOfCurations';
import portugueseData from '#data/portuguese/homePage/index.json';

describe('Canonical', () => {
  const { data: pageData } = portugueseData;

  numberOfCurationsTest(pageData);

  const portraitVideoCurations = pageData.curations.filter(
    curation =>
      curation.portraitVideo && Array.isArray(curation.portraitVideo.blocks),
  );

  const getPortraitCarousels = () =>
    Array.from(
      document.querySelectorAll(
        '[data-testid="portrait-video-carousel"] ul[data-testid="pv-carousel"]',
      ),
    );

  it('should have an unordered list of videos with the correct number of promos for each portrait video carousel', () => {
    const videoCarousels = Array.from(
      document.querySelectorAll('[data-testid="portrait-video-carousel"] ul'),
    );

    expect(videoCarousels.length).toEqual(portraitVideoCurations.length);

    portraitVideoCurations.forEach((curation, index) => {
      const videoList = videoCarousels[index];
      const numberOfItems = curation.portraitVideo.blocks.length;

      expect(videoList).toBeInTheDocument();
      expect(videoList.tagName).toBe('UL');
      expect(videoList.children.length).toBeGreaterThan(6);
      expect(videoList.children.length).toEqual(numberOfItems);
    });
  });

  it('should have left and right scroll buttons', () => {
    const carousels = Array.from(
      document.querySelectorAll('[data-testid="portrait-video-carousel"]'),
    );
    carousels.forEach(carousel => {
      const scrollLeftButton = carousel.querySelector(
        '[data-testid="pv-scroll-left"]',
      );
      const scrollRightButton = carousel.querySelector(
        '[data-testid="pv-scroll-right"]',
      );
      expect(scrollLeftButton).toBeInTheDocument();
      expect(scrollRightButton).toBeInTheDocument();
      // cannot test the scroll functionality in a JSDOM environment with no rendering or actual scrolling
      // also cannot test whether these appear or disappear due to screen width, as although they are in the document,
      // these tests always sees them as not visible, as well as always disabled
    });
  });

  it('should render each video promo item with a button containing the correct text', () => {
    const carousels = getPortraitCarousels();

    carousels.forEach((carousel, carouselIndex) => {
      const promoButtons = Array.from(
        carousel.querySelectorAll('[data-testid="promo-button"]'),
      );
      const videoItems =
        portraitVideoCurations[carouselIndex]?.portraitVideo?.blocks || [];

      promoButtons.forEach((button, buttonIndex) => {
        const textContents = button.querySelector(
          '[data-testid="text-contents"]',
        );
        expect(textContents).toBeInTheDocument();
        const expectedTitle = videoItems[buttonIndex]?.model?.video?.title;

        expect(textContents?.textContent).toContain(expectedTitle);
      });
    });
  });

  it('should render each video promo item with a duration element', () => {
    const carousels = getPortraitCarousels();

    carousels.forEach(carousel => {
      const promoButtons = Array.from(
        carousel.querySelectorAll('[data-testid="promo-button"]'),
      );
      promoButtons.forEach(button => {
        const duration = button.querySelector('time > span');
        expect(duration).toBeInTheDocument();
        expect(duration.textContent).toMatch(/\d{2}:\d{2}/);
      });
    });
  });

  it('should render each video promo item with an image', () => {
    const carousels = getPortraitCarousels();

    carousels.forEach((carousel, carouselIndex) => {
      const promoItems = Array.from(carousel.querySelectorAll('li'));
      const videoItems =
        portraitVideoCurations[carouselIndex]?.portraitVideo?.blocks || [];

      promoItems.forEach((item, itemIndex) => {
        const image = item.querySelector('img');
        expect(image).toBeInTheDocument();

        const [expectedImage] = videoItems[itemIndex]?.model?.images || [];
        const { altText } = expectedImage || {};
        expect(image?.getAttribute('alt')).toBe(altText);
      });
    });
  });
});
