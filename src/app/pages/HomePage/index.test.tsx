import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { data as kyrgyzHomePageData } from '#data/kyrgyz/homePage/index.json';
import { data as afriqueHomePageDataFixture } from '#data/afrique/homePage/index.json';
import { data as pidginHomePageDataFixture } from '#data/pidgin/homePage/index.json';
import {
  render,
  screen,
} from '../../components/react-testing-library-with-providers';
import HomePage from './HomePage';
import { suppressPropWarnings } from '../../legacy/psammead/psammead-test-helpers/src';

jest.mock('../../components/ChartbeatAnalytics', () => {
  const ChartbeatAnalytics = () => <div>Chartbeat Analytics</div>;
  return ChartbeatAnalytics;
});

const homePageData = {
  ...kyrgyzHomePageData,
  metadata: {
    ...kyrgyzHomePageData.metadata,
    type: 'home',
  },
};

const afriqueHomePageData = {
  ...afriqueHomePageDataFixture,
  metadata: {
    ...afriqueHomePageDataFixture.metadata,
    type: 'home',
  },
};

const pidginHomePageData = {
  ...pidginHomePageDataFixture,
  metadata: {
    ...pidginHomePageDataFixture.metadata,
    type: 'home',
  },
};

describe('Home Page', () => {
  suppressPropWarnings(['children', 'string', 'MediaIcon']);

  it('should render a section for each curation with summaries', () => {
    const { container } = render(<HomePage pageData={afriqueHomePageData} />, {
      service: 'afrique',
      toggles: {
        mostRead: { enabled: true },
        homePageRadioSchedule: { enabled: true },
      },
    });
    const curationsWithSummaries = afriqueHomePageDataFixture.curations.filter(
      ({ summaries, mostRead, radioSchedule }) =>
        (summaries && summaries?.length > 0) || mostRead || radioSchedule,
    );
    expect(container).not.toBeEmptyDOMElement();
    expect(container.getElementsByTagName('section').length).toEqual(
      curationsWithSummaries.length,
    );
  });

  it('should have h2s for curation heading levels and h3 for summary heading levels', () => {
    // @ts-expect-error suppress pageData prop type conflicts
    const { container } = render(<HomePage pageData={pidginHomePageData} />, {
      service: 'pidgin',
    });
    // for some reason, most read headings are not showing as headings in the count or if I log them
    expect(container.querySelectorAll('h2').length).toBe(10);
    expect(container.querySelectorAll('h3').length).toBe(40);
  });

  it('should apply provided margin size to the main element', () => {
    // @ts-expect-error suppress pageData prop type conflicts due to missing imageAlt on selected historical test data for curations
    const { getByRole } = render(<HomePage pageData={homePageData} />, {
      service: 'kyrgyz',
    });
    expect(getByRole('main')).toHaveStyle({
      margin: '0px 0.5rem',
    });
  });

  it('should have visually hidden text with the localised product, service - home as the H1', () => {
    // @ts-expect-error suppress pageData prop type conflicts due to missing imageAlt on selected historical test data for curations
    const { container } = render(<HomePage pageData={homePageData} />, {
      service: 'kyrgyz',
    });

    const h1 = container.querySelector('h1');
    expect(h1).toBeInTheDocument();

    const content = h1?.getAttribute('id');
    const tabIndex = h1?.getAttribute('tabIndex');

    expect(content).toEqual('content');
    expect(tabIndex).toBe('-1');

    const span = h1?.querySelector('span');
    expect(span?.getAttribute('role')).toEqual('text');
    expect(span?.textContent).toEqual(
      'BBC News, Кыргыз КызMATы - Башталгыч бет',
    );

    const langSpan = span?.querySelector('span');
    expect(langSpan?.getAttribute('lang')).toEqual('en-GB');
    expect(langSpan?.textContent).toEqual('BBC News');
  });

  it('should have a visually hidden h2 title for the first curation on the home page that matches the curationTitle', () => {
    const { curations } = afriqueHomePageData;
    const firstCurationTitle = curations[0]?.title;

    const { container } = render(<HomePage pageData={afriqueHomePageData} />, {
      service: 'afrique',
    });

    // Select the visually hidden h2 element by matching a class containing 'visuallyHiddenText'
    const visuallyHiddenH2 = container.querySelector(
      'h2[class*="visuallyHiddenText"]',
    );

    expect(visuallyHiddenH2).toBeInTheDocument();
    expect(visuallyHiddenH2?.textContent).toBe(firstCurationTitle);
  });

  it('should have a metadata title', () => {
    // @ts-expect-error suppress pageData prop type conflicts due to missing imageAlt on selected historical test data for curations
    render(<HomePage pageData={homePageData} />, {
      service: 'kyrgyz',
    });
    expect(Helmet.peek().title).toEqual(
      'Кабарлар, акыркы мүнөттөгү кабарлар, талдоо, видео - BBC News Кыргыз Кызматы',
    );
  });

  it('should have a metadata description', () => {
    // @ts-expect-error suppress pageData prop type conflicts due to missing imageAlt on selected historical test data for curations
    render(<HomePage pageData={homePageData} />, {
      service: 'kyrgyz',
    });
    const helmetContent = Helmet.peek();
    const findDescription = helmetContent.metaTags.find(
      ({ name }) => name === 'description',
    );
    expect(findDescription?.content).toEqual(kyrgyzHomePageData.description);
  });

  it('should correctly render linked data for home pages', () => {
    // @ts-expect-error suppress pageData prop type conflicts due to missing imageAlt on selected historical test data for curations
    render(<HomePage pageData={homePageData} />, {
      service: 'kyrgyz',
    });

    const getLinkedDataOutput = () => {
      return JSON.parse(Helmet.peek().scriptTags[0].innerHTML);
    };

    expect(getLinkedDataOutput()).toMatchSnapshot();
  });

  it('should render images with the .webp image extension', () => {
    const path = homePageData.curations[0].summaries?.[0].imageUrl
      ?.split('{width}')[1]
      .slice(0, -5);

    const imageURL = `https://ichef.bbci.co.uk/ace/ws/240${path}.webp`;
    const expectedWebpSrcSetURLs = [
      `https://ichef.bbci.co.uk/ace/ws/85${path}.webp 85w`,
      `https://ichef.bbci.co.uk/ace/ws/120${path}.webp 120w`,
      `https://ichef.bbci.co.uk/ace/ws/170${path}.webp 170w`,
      `https://ichef.bbci.co.uk/ace/ws/232${path}.webp 232w`,
      `https://ichef.bbci.co.uk/ace/ws/325${path}.webp 325w`,
      `https://ichef.bbci.co.uk/ace/ws/450${path}.webp 450w`,
      `https://ichef.bbci.co.uk/ace/ws/660${path}.webp 660w`,
      `https://ichef.bbci.co.uk/ace/ws/800${path}.webp 800w`,
    ].join(', ');

    const expectedPNGSrcSetURLs = [
      `https://ichef.bbci.co.uk/ace/ws/85${path} 85w`,
      `https://ichef.bbci.co.uk/ace/ws/120${path} 120w`,
      `https://ichef.bbci.co.uk/ace/ws/170${path} 170w`,
      `https://ichef.bbci.co.uk/ace/ws/232${path} 232w`,
      `https://ichef.bbci.co.uk/ace/ws/325${path} 325w`,
      `https://ichef.bbci.co.uk/ace/ws/450${path} 450w`,
      `https://ichef.bbci.co.uk/ace/ws/660${path} 660w`,
      `https://ichef.bbci.co.uk/ace/ws/800${path} 800w`,
    ].join(', ');

    // @ts-expect-error suppress pageData prop type conflicts due to missing imageAlt on selected historical test data for curations
    const { container } = render(<HomePage pageData={homePageData} />, {
      service: 'kyrgyz',
      pageType: 'home',
    });

    const promoImage = container.querySelectorAll('div.promo-image picture')[0];

    const [webpSource, pngSource, img] = promoImage.childNodes as unknown as [
      HTMLSourceElement,
      HTMLSourceElement,
      HTMLImageElement,
    ];

    expect(webpSource.srcset).toEqual(expectedWebpSrcSetURLs);
    expect(pngSource.srcset).toEqual(expectedPNGSrcSetURLs);
    expect(img.src).toEqual(imageURL);
  });

  describe('Analytics', () => {
    it('should render a Chartbeat component', () => {
      // @ts-expect-error suppress pageData prop type conflicts due to missing imageAlt on selected historical test data for curations
      const { getByText } = render(<HomePage pageData={homePageData} />, {
        service: 'kyrgyz',
      });

      expect(getByText('Chartbeat Analytics')).toBeInTheDocument();
    });
  });

  describe('Lazy Loading', () => {
    it('All images in message banners are eagerly loaded', () => {
      // @ts-expect-error suppress pageData prop type conflicts due to missing imageAlt on selected historical test data for curations
      render(<HomePage pageData={homePageData} />, {
        service: 'kyrgyz',
      });

      const messageBannerImages = document.querySelectorAll(
        '[data-testid^="message-banner"] img',
      );

      messageBannerImages.forEach(image => {
        expect(image.getAttribute('loading')).toBe('eager');
      });
    });

    it('Only the main billboard image is eagerly loaded, all billboard grid images are lazy loaded', () => {
      // @ts-expect-error suppress pageData prop type conflicts
      render(<HomePage pageData={pidginHomePageData} />, {
        service: 'kyrgyz',
      });

      const billboardSections = screen.queryAllByTestId(/billboard-\d+/);

      billboardSections.forEach(billboardSection => {
        const allImages = Array.from(billboardSection.querySelectorAll('img'));
        const grid = billboardSection.querySelector(
          '[data-testid="billboard-curation-grid"]',
        );
        const gridImages = grid ? Array.from(grid.querySelectorAll('img')) : [];

        // The main billboard image is the first image in the section that is not in the grid
        const mainBillboardImage = allImages.find(
          img => !gridImages.includes(img),
        );

        expect(mainBillboardImage).toBeTruthy();
        if (mainBillboardImage) {
          expect(mainBillboardImage.getAttribute('loading')).toBe('eager');
        }

        gridImages.forEach(image => {
          expect(image.getAttribute('loading')).toBe('lazy');
        });
      });
    });

    it('For images not in billboards or message banners, only the first image on the page is eagerly loaded', () => {
      // @ts-expect-error suppress pageData prop type conflicts due to missing imageAlt on selected historical test data for curations
      render(<HomePage pageData={homePageData} />, {
        service: 'kyrgyz',
      });

      const allImages = Array.from(document.querySelectorAll('img'));
      const billboardImages = Array.from(
        document.querySelectorAll('[data-testid^="billboard"] img'),
      );
      const messageBannerImages = Array.from(
        document.querySelectorAll('[data-testid^="message-banner"] img'),
      );
      const billboardAndBannerImages = new Set([
        ...billboardImages,
        ...messageBannerImages,
      ]);

      const nonBillboardBannerImages = allImages.filter(
        img => !billboardAndBannerImages.has(img),
      );

      nonBillboardBannerImages.forEach((image, index) => {
        if (index === 0) {
          expect(image.getAttribute('loading')).toBe('eager');
        } else {
          expect(image.getAttribute('loading')).toBe('lazy');
        }
      });
    });
  });

  describe('Ads', () => {
    const getBootstrapScript = () =>
      Helmet.peek().scriptTags.find(({ innerHTML }) =>
        innerHTML?.includes('window.dotcom'),
      );

    it('should display ads when ads toggle is enabled and showAdsBased on location is true', () => {
      const { container } = render(
        <BrowserRouter>
          {/* @ts-expect-error suppress pageData prop type conflicts due to missing imageAlt on selected historical test data for curations */}
          <HomePage pageData={homePageData} />
        </BrowserRouter>,
        {
          service: 'kyrgyz',
          toggles: {
            ads: { enabled: true },
          },
          showAdsBasedOnLocation: true,
        },
      );

      const homePageAds = container.querySelectorAll(`[id^="dotcom-"]`);
      expect(homePageAds).toHaveLength(2);

      expect(getBootstrapScript()).toBeTruthy();
    });
    it('should display the MPU ad in the correct location', () => {
      const { container } = render(
        <BrowserRouter>
          {/* @ts-expect-error suppress pageData prop type conflicts due to missing imageAlt on selected historical test data for curations */}
          <HomePage pageData={homePageData} />
        </BrowserRouter>,
        {
          service: 'kyrgyz',
          toggles: {
            ads: { enabled: true },
          },
          showAdsBasedOnLocation: true,
        },
      );
      const sections = container.querySelectorAll(`section`);
      const sectionIds: (string | null)[] = Array.from(sections).map(
        section =>
          section.getAttribute('aria-labelledby') ||
          section.getAttribute('data-e2e'),
      );
      const mpuIndex = sectionIds.lastIndexOf('advertisement');
      const firstNonBannerIndex = sectionIds.findIndex(
        sectionId =>
          sectionId !== 'advertisement' &&
          !sectionId?.startsWith('billboard') &&
          !sectionId?.startsWith('message-banner'),
      );
      expect(mpuIndex).toBe(firstNonBannerIndex + 1);
    });

    it.each`
      adsEnabled | showAdsBasedOnLocation | scenario
      ${true}    | ${false}               | ${'showAdsBasedOnLocation is false'}
      ${false}   | ${true}                | ${'adsEnabled is false'}
      ${false}   | ${true}                | ${'both adsEnabled and showAdsBasedOnLocation are false'}
    `(
      'should not display ads because $scenario',
      ({ adsEnabled, showAdsBasedOnLocation }) => {
        const { container } = render(
          <BrowserRouter>
            {/* @ts-expect-error suppress pageData prop type conflicts due to missing imageAlt on selected historical test data for curations */}
            <HomePage pageData={homePageData} />
          </BrowserRouter>,
          {
            service: 'kyrgyz',
            toggles: {
              ads: { enabled: adsEnabled },
            },
            showAdsBasedOnLocation,
          },
        );

        const homePageAds = container.querySelectorAll(`[id^="dotcom-"]`);
        expect(homePageAds).toHaveLength(0);

        expect(getBootstrapScript()).toBeUndefined();
      },
    );
  });
  it('should not have amphtml in the metadata', () => {
    // @ts-expect-error suppress pageData prop type conflicts due to missing imageAlt on selected historical test data for curations
    render(<HomePage pageData={homePageData} />, {
      service: 'kyrgyz',
    });

    const amphtml = Helmet.peek().linkTags.find(
      linkTag => linkTag.rel === 'amphtml',
    );
    expect(amphtml).toBeUndefined();
  });
});
