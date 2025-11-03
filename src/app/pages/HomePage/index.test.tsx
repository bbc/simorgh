import { fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { data as kyrgyzHomePageData } from '#data/kyrgyz/homePage/index.json';
import { data as afriqueHomePageDataFixture } from '#data/afrique/homePage/index.json';
import { data as pidginHomePageDataFixture } from '#data/pidgin/homePage/index.json';
import { data as portugueseHomePageDataFixture } from '#data/portuguese/homePage/index.json';
import { data as wsHomePageData } from '#data/ws/homePage/index.json';
import { service as pidginServiceConfig } from '#app/lib/config/services/pidgin';
import useOptimizelyVariation from '#app/hooks/useOptimizelyVariation';
import useViewTracker from '../../hooks/useViewTracker';
import useClickTrackerHandler from '../../hooks/useClickTrackerHandler';
import {
  render,
  screen,
} from '../../components/react-testing-library-with-providers';
import HomePage from './HomePage';
import { suppressPropWarnings } from '../../legacy/psammead/psammead-test-helpers/src';
import * as reorderCurations from './utils/reorderCurations';

jest.mock('#app/hooks/useOptimizelyVariation', () => ({
  __esModule: true,
  default: jest.fn(),
  ExperimentType: { CLIENT_SIDE: 'client_side' },
}));

jest.mock('../../hooks/useClickTrackerHandler', () => ({
  __esModule: true,
  default: jest.fn(),
}));

// Mock useViewTracker hook globally
jest.mock('../../hooks/useViewTracker', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('../../hooks/useClickTrackerHandler', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('../../components/ChartbeatAnalytics', () => {
  const ChartbeatAnalytics = () => <div>Chartbeat Analytics</div>;
  return ChartbeatAnalytics;
});

const mockUseOptimizelyVariation = useOptimizelyVariation as jest.Mock;

const basePageData = {
  title: 'Test Title',
  description: 'Test Description',
  metadata: { atiAnalytics: {}, type: 'home' },
  curations: [
    {
      curationId: 'id1',
      position: 0,
      visualStyle: 'BANNER',
      visualProminence: 'MAXIMUM',
    },
    {
      curationId: 'id2',
      position: 1,
      visualStyle: 'FEED',
      visualProminence: 'LOW',
    },
  ],
};

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
    // Set the translation so the h2 is rendered
    const originalMoreOnThis =
      pidginServiceConfig.default.translations.moreOnThis;
    pidginServiceConfig.default.translations.moreOnThis = 'More on this';

    // @ts-expect-error suppress pageData prop type conflicts
    const { container } = render(<HomePage pageData={pidginHomePageData} />, {
      service: 'pidgin',
    });
    // for some reason, most read headings are not showing as headings in the count or if I log them
    expect(container.querySelectorAll('h2').length).toBe(15);
    expect(container.querySelectorAll('h3').length).toBe(45);

    // Restore the original value - remove when pidgin moreOnThis translation is available
    pidginServiceConfig.default.translations.moreOnThis = originalMoreOnThis;
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

  describe('Viewability Analytics', () => {
    beforeEach(() => {
      (useViewTracker as jest.Mock).mockClear();
      (useClickTrackerHandler as jest.Mock).mockClear();
    });

    it('Hierarchical curation - calls useViewTracker with correct viewability event tracking data for the first curation', () => {
      render(<HomePage pageData={afriqueHomePageData} />, {
        service: 'afrique',
      });

      const firstCuration = afriqueHomePageData.curations[0];
      const expectedTrackingData = {
        groupTracker: {
          name: firstCuration.title,
          type: 'hierarchical-curation-grid',
          position: 1,
          resourceId: firstCuration.curationId,
          itemCount: 4, // if the fixture data changes this will fail
        },
        componentName: 'hierarchical-curation-grid',
        viewThreshold: 0.2,
      };

      const { calls } = (useViewTracker as jest.Mock).mock;
      // finds the calls that match the component name and group tracking data
      const matchingCalls = calls.filter(
        ([arg]) =>
          arg.componentName === expectedTrackingData.componentName &&
          JSON.stringify(arg.groupTracker) ===
            JSON.stringify(expectedTrackingData.groupTracker),
      );
      // expects there to be one of these calls
      expect(matchingCalls).toHaveLength(1);
    });

    it('Simple curation - calls useViewTracker with correct viewability event tracking data for the 7th curation', () => {
      // @ts-expect-error suppress pageData prop type conflicts due to missing imageAlt on selected historical test data for curations
      render(<HomePage pageData={pidginHomePageDataFixture} />, {
        service: 'pidgin',
      });

      const seventhCuration = pidginHomePageDataFixture.curations[6];
      const expectedTrackingData = {
        groupTracker: {
          name: seventhCuration.title,
          type: 'simple-curation-grid',
          position: seventhCuration.position + 1,
          link: seventhCuration.link,
          resourceId: seventhCuration.curationId,
          itemCount: seventhCuration.summaries?.length,
        },
        componentName: 'simple-curation-grid',
        viewThreshold: 0.2,
      };
      const { calls } = (useViewTracker as jest.Mock).mock;

      const matchingCalls = calls.filter(
        ([arg]) =>
          arg.componentName === expectedTrackingData.componentName &&
          JSON.stringify(arg.groupTracker) ===
            JSON.stringify(expectedTrackingData.groupTracker),
      );

      expect(matchingCalls).toHaveLength(1);
    });

    it('Message banner - calls useViewTracker with correct viewability event tracking data for each message banner', () => {
      // @ts-expect-error suppress pageData prop type conflicts due to missing imageAlt on selected historical test data for curations
      render(<HomePage pageData={pidginHomePageDataFixture} />, {
        service: 'pidgin',
      });

      // Find all banners in the fixture with visualProminence NORMAL and visualStyle BANNER
      const messageBanners = pidginHomePageDataFixture.curations.filter(
        curation =>
          curation.visualProminence === 'NORMAL' &&
          curation.visualStyle === 'BANNER',
      );

      const expectedTrackingData = messageBanners.map(curation => ({
        componentName: 'message-banner',
        groupTracker: {
          name: curation.title,
          type: 'message-banner',
          position: curation.position + 1,
          resourceId: curation.curationId,
        },
      }));

      const { calls } = (useViewTracker as jest.Mock).mock;

      expectedTrackingData.forEach(expected => {
        const matchingCall = calls.find(
          ([arg]) =>
            arg.componentName === expected.componentName &&
            JSON.stringify(arg.groupTracker) ===
              JSON.stringify(expected.groupTracker),
        );
        expect(matchingCall).toBeTruthy();
        const messageBannerCalls = calls.filter(
          ([arg]) => arg.componentName === 'message-banner',
        );

        expect(messageBannerCalls.length).toBe(messageBanners.length);
      });
    });

    it('Radio Schedule - calls useViewTracker with correct viewability event tracking data for each radio schedule', () => {
      render(<HomePage pageData={afriqueHomePageData} />, {
        service: 'afrique',
        toggles: {
          homePageRadioSchedule: { enabled: true },
        },
      });

      const radioSchedules = afriqueHomePageData.curations.filter(
        curation => curation.radioSchedule,
      );

      const expectedTrackingData = radioSchedules.map(schedule => ({
        componentName: 'radio-schedule',
        groupTracker: {
          name: schedule.title,
          type: 'radio-schedule',
          position: schedule.position + 1,
          resourceId: schedule.curationId,
          itemCount: schedule.radioSchedule?.length,
        },
      }));

      const { calls } = (useViewTracker as jest.Mock).mock;

      expectedTrackingData.forEach(expected => {
        const matchingCall = calls.find(
          ([arg]) =>
            arg.componentName === expected.componentName &&
            JSON.stringify(arg.groupTracker) ===
              JSON.stringify(expected.groupTracker),
        );
        expect(matchingCall).toBeTruthy();
      });
    });

    it('Useful Links - calls useViewTracker with correct viewability event tracking data for Useful Links curation', () => {
      // @ts-expect-error suppress pageData prop type conflicts due to missing imageAlt on selected historical test data for curations
      render(<HomePage pageData={homePageData} />, {
        service: 'kyrgyz',
      });

      const usefulLinksCuration =
        homePageData.curations[homePageData.curations.length - 1];
      const expectedTrackingData = {
        groupTracker: {
          name: usefulLinksCuration.title,
          type: 'useful-links',
          position: usefulLinksCuration.position + 1,
          resourceId: usefulLinksCuration.curationId,
          itemCount: usefulLinksCuration.summaries?.length,
        },
        componentName: 'useful-links',
        viewThreshold: 0.2,
      };

      const { calls } = (useViewTracker as jest.Mock).mock;
      const matchingCalls = calls.filter(
        ([arg]) =>
          arg.componentName === expectedTrackingData.componentName &&
          JSON.stringify(arg.groupTracker) ===
            JSON.stringify(expectedTrackingData.groupTracker),
      );
      expect(matchingCalls).toHaveLength(1);
    });

    it('Portrait Video Carousel - calls useViewTracker with correct viewability event tracking data for each portrait video carousel', async () => {
      // @ts-expect-error - sample homepage data
      render(<HomePage pageData={portugueseHomePageDataFixture} />, {
        service: 'portuguese',
      });

      const portraitVideoCarousels =
        portugueseHomePageDataFixture.curations.filter(
          curation => curation.portraitVideo,
        );

      const expectedTrackingData = portraitVideoCarousels.map(carousel => ({
        componentName: 'portrait-video-carousel',
        groupTracker: {
          name: carousel.title,
          type: 'portrait-video-carousel',
          position: carousel.position + 1,
          resourceId: carousel.curationId,
          itemCount: carousel.portraitVideo?.blocks.length,
        },
      }));

      const { calls } = (useViewTracker as jest.Mock).mock;

      expectedTrackingData.forEach(expected => {
        const matchingCall = calls.find(
          ([arg]) =>
            arg.componentName === expected.componentName &&
            JSON.stringify(arg.groupTracker) ===
              JSON.stringify(expected.groupTracker),
        );
        expect(matchingCall).toBeTruthy();
      });
    });

    it('Social Links - calls useViewTracker with correct viewability event tracking data for Social Links', () => {
      const socialLinks = wsHomePageData.curations.find(
        curation =>
          curation.visualProminence === 'NORMAL' &&
          curation.visualStyle === 'LINKS',
      );
      const pidginHomePageDataWithSocialLinks = {
        ...pidginHomePageDataFixture,
        curations: [...pidginHomePageDataFixture.curations, socialLinks],
      };
      // @ts-expect-error suppress pageData prop type conflicts due to missing imageAlt on selected historical test data for curations
      render(<HomePage pageData={pidginHomePageDataWithSocialLinks} />, {
        service: 'pidgin',
      });

      const expectedTrackingData = {
        groupTracker: {
          name: socialLinks?.title,
          type: 'social-links',
          position: socialLinks?.position
            ? socialLinks.position + 1
            : undefined,
          resourceId: socialLinks?.curationId,
          itemCount: socialLinks?.summaries?.length,
        },
        componentName: 'social-links',
        viewThreshold: 0.2,
      };

      const { calls } = (useViewTracker as jest.Mock).mock;
      const matchingCalls = calls.filter(
        ([arg]) =>
          arg.componentName === expectedTrackingData.componentName &&
          JSON.stringify(arg.groupTracker) ===
            JSON.stringify(expectedTrackingData.groupTracker),
      );
      expect(matchingCalls).toHaveLength(1);
    });

    describe('Hierarchical curation - click tracking', () => {
      it.each([
        {
          description: 'promo link',
          getElement: () =>
            document.querySelector(
              '[data-testid="hierarchical-grid"] ul[role="list"] a',
            ) as HTMLAnchorElement,
          getExpectedData: (data: typeof afriqueHomePageData) => {
            const curation = data.curations[0];
            const promo = curation?.summaries?.[0];
            // using objectContaining allows some flexibility for extra properties added to not break the tests
            // we only care that the properties we want are present
            return expect.objectContaining({
              componentName: 'hierarchical-curation-grid',
              groupTracker: expect.objectContaining({
                name: curation.title,
                type: 'hierarchical-curation-grid',
                position: curation.position + 1,
                resourceId: curation.curationId,
                itemCount: curation.summaries?.length,
              }),
              itemTracker: expect.objectContaining({
                type: 'hierarchical-curation-grid-promo',
                text: promo?.title,
                position: 1,
                resourceId: promo?.id,
              }),
            });
          },
          click: true,
        },
        {
          description: 'curation subheading link',
          getElement: () => {
            const section = document.querySelector(
              'section[aria-labelledby="high-collection-2"]',
            );
            const subheading = section?.querySelector('h2#high-collection-2');
            return subheading?.querySelector('a') as HTMLAnchorElement;
          },
          getExpectedData: (data: typeof afriqueHomePageData) => {
            const curation = data.curations[3];
            return expect.objectContaining({
              groupTracker: expect.objectContaining({
                name: curation.title,
                type: 'hierarchical-curation-grid',
                link: curation.link,
                position: 4,
                resourceId: curation.curationId,
              }),
              componentName: 'hierarchical-curation-grid',
            });
          },
          click: true,
        },
      ])(
        'calls click tracking handler with correct data for $description',
        ({ getElement, getExpectedData, click }) => {
          render(<HomePage pageData={afriqueHomePageData} />, {
            service: 'afrique',
          });

          const element = getElement();
          expect(element).toBeInTheDocument();

          if (click) {
            fireEvent.click(element);
          }

          expect(useClickTrackerHandler as jest.Mock).toHaveBeenCalledWith(
            getExpectedData(afriqueHomePageData),
          );
        },
      );
    });

    describe('Simple curation - click tracking', () => {
      it.each([
        {
          description: 'promo link',
          getElement: () =>
            document.querySelector(
              '[data-testid="curation-grid-normal"] ul[role="list"] a',
            ) as HTMLAnchorElement,
          getExpectedData: (data: typeof pidginHomePageDataFixture) => {
            const promo = data.curations[6]?.summaries?.[0];
            return expect.objectContaining({
              componentName: 'simple-curation-grid',
              groupTracker: expect.objectContaining({
                name: data.curations[6].title,
                type: 'simple-curation-grid',
                link: data.curations[6].link,
                position: data.curations[6].position + 1,
                resourceId: data.curations[6].curationId,
                itemCount: data.curations[6].summaries?.length,
              }),
              itemTracker: expect.objectContaining({
                type: 'simple-curation-grid-promo',
                text: promo?.title,
                position: 1,
                resourceId: promo?.id,
                mediaType: 'video',
                duration: 137000,
              }),
            });
          },
          click: true,
        },
        {
          description: 'curation subheading link',
          getElement: () => {
            const subheading = document.querySelector('h2#low-feed-1');
            return subheading?.querySelector('a') as HTMLAnchorElement;
          },
          getExpectedData: (data: typeof pidginHomePageDataFixture) => {
            const curation = data.curations[6];
            return expect.objectContaining({
              componentName: 'simple-curation-grid',
              groupTracker: expect.objectContaining({
                name: curation.title,
                type: 'simple-curation-grid',
                link: curation.link,
                position: curation.position + 1,
                resourceId: curation.curationId,
                itemCount: curation.summaries?.length,
              }),
            });
          },
          click: true,
        },
      ])(
        'calls click tracking handler with correct data for $description',
        ({ getElement, getExpectedData, click }) => {
          // @ts-expect-error suppress pageData prop type conflicts due to missing imageAlt on selected historical test data for curations
          render(<HomePage pageData={pidginHomePageDataFixture} />, {
            service: 'pidgin',
          });

          const element = getElement();
          expect(element).toBeInTheDocument();
          if (click) {
            fireEvent.click(element);
          }

          const calls = (useClickTrackerHandler as jest.Mock).mock.calls
            .map(([arg]) => arg)
            .filter(Boolean);

          const expected = getExpectedData(pidginHomePageDataFixture);

          // Use asymmetricMatch if using expect.objectContaining, else fallback to deep match
          const matchingCall = calls.find(call =>
            expected.asymmetricMatch
              ? expected.asymmetricMatch(call)
              : call.componentName === expected.componentName &&
                call.itemTracker &&
                call.groupTracker &&
                call.itemTracker.text === expected.itemTracker.text,
          );

          expect(matchingCall).toBeTruthy();
        },
      );
    });
    describe('Useful Links - click tracking', () => {
      beforeEach(() => {
        (useViewTracker as jest.Mock).mockClear();
        (useClickTrackerHandler as jest.Mock).mockClear?.();
      });

      it('calls click tracking handler with correct data for Useful Links promo link', () => {
        // @ts-expect-error suppress pageData prop type conflicts due to missing imageAlt on selected historical test data for curations
        render(<HomePage pageData={homePageData} />, {
          service: 'kyrgyz',
        });

        const usefulLinksSection = screen.getByTestId('useful-links-1');
        const firstUsefulLink = usefulLinksSection?.querySelector(
          'ul[role="list"] a',
        ) as HTMLAnchorElement;

        expect(firstUsefulLink).toBeInTheDocument();

        fireEvent.click(firstUsefulLink);

        const usefulLinksCuration =
          homePageData.curations[homePageData.curations.length - 1];
        const promo = usefulLinksCuration.summaries?.[0];

        const expectedTrackingData = expect.objectContaining({
          componentName: 'useful-links',
          groupTracker: expect.objectContaining({
            name: usefulLinksCuration.title,
            type: 'useful-links',
            position: usefulLinksCuration.position + 1,
            resourceId: usefulLinksCuration.curationId,
            itemCount: usefulLinksCuration.summaries?.length,
          }),
          itemTracker: expect.objectContaining({
            type: 'useful-link-promo',
            text: promo?.title,
            position: 1,
            resourceId: promo?.id,
          }),
        });

        expect(useClickTrackerHandler as jest.Mock).toHaveBeenCalledWith(
          expectedTrackingData,
        );
      });
      it('calls click tracking handler with correct data when Useful Links curation has only one summary', () => {
        const singleSummaryHomePageData = {
          ...homePageData,
          curations: [
            ...homePageData.curations.slice(0, -1),
            {
              ...homePageData.curations[homePageData.curations.length - 1],
              summaries: [
                homePageData.curations[homePageData.curations.length - 1]
                  .summaries?.[0],
              ],
            },
          ],
        };

        // @ts-expect-error suppress pageData prop type conflicts due to missing imageAlt on selected historical test data for curations
        render(<HomePage pageData={singleSummaryHomePageData} />, {
          service: 'kyrgyz',
        });

        const usefulLinksSection = screen.getByTestId('useful-links-1');
        const singleUsefulLink = usefulLinksSection?.querySelector(
          'div[role="listitem"] a, div a',
        ) as HTMLAnchorElement;

        expect(singleUsefulLink).toBeInTheDocument();

        fireEvent.click(singleUsefulLink);

        const usefulLinksCuration =
          singleSummaryHomePageData.curations[
            singleSummaryHomePageData.curations.length - 1
          ];
        const promo = usefulLinksCuration.summaries?.[0];

        const expectedTrackingData = expect.objectContaining({
          componentName: 'useful-links',
          groupTracker: expect.objectContaining({
            name: usefulLinksCuration.title,
            type: 'useful-links',
            position: usefulLinksCuration.position + 1,
            resourceId: usefulLinksCuration.curationId,
            itemCount: usefulLinksCuration.summaries?.length,
          }),
          itemTracker: expect.objectContaining({
            type: 'useful-link-promo',
            text: promo?.title,
            position: 1,
            resourceId: promo?.id,
          }),
        });

        // Only count calls for the Useful Links component
        const usefulLinksCalls = (
          useClickTrackerHandler as jest.Mock
        ).mock.calls
          .map(([arg]) => arg)
          .filter(call => call?.componentName === 'useful-links');

        expect(usefulLinksCalls).toHaveLength(1);
        expect(usefulLinksCalls[0]).toMatchObject(expectedTrackingData);
      });
    });
    // this can be changed later to check the number of calls by filtering by component name
    // but will be easier to do this after the billboard work as the billboard currently has undefined componentNames
    // which cause problems in this kind of test on the click tracker
    describe('Message banner - click tracking', () => {
      // @ts-expect-error suppress pageData prop type conflicts due to missing imageAlt on selected historical test data for curations
      render(<HomePage pageData={pidginHomePageDataFixture} />, {
        service: 'pidgin',
      });

      // Find the first message banner (with visualProminence NORMAL and visualStyle BANNER)
      const firstMessageBanner = pidginHomePageDataFixture.curations.find(
        curation =>
          curation.visualProminence === 'NORMAL' &&
          curation.visualStyle === 'BANNER',
      );

      // Find the call to action link in the rendered DOM
      const ctaLink = document.querySelector(
        '[data-testid="message-banner-1"] a',
      ) as HTMLAnchorElement;

      expect(ctaLink).toBeInTheDocument();

      fireEvent.click(ctaLink);

      // The eventTrackingData for the CTA link should match the message banner's tracking data
      const expectedTrackingData = expect.objectContaining({
        componentName: 'message-banner',
        groupTracker: expect.objectContaining({
          name: firstMessageBanner?.title,
          type: 'message-banner',
          position: (firstMessageBanner?.position ?? -1) + 1, // if there is no message banner on the page the position is 0 and this will fail. It needs a fallback value for TS
          resourceId: firstMessageBanner?.curationId,
        }),
      });

      expect(useClickTrackerHandler as jest.Mock).toHaveBeenCalledWith(
        expectedTrackingData,
      );
    });

    describe('Radio Schedule promo - click tracking', () => {
      render(<HomePage pageData={afriqueHomePageData} />, {
        service: 'afrique',
        toggles: {
          homePageRadioSchedule: { enabled: true },
        },
      });

      const radioSchedule = afriqueHomePageData.curations.find(
        curation => curation.radioSchedule,
      );

      const radioSchedulePromo = document.querySelector(
        '[aria-labelledby^="scheduleItem-"]',
      ) as HTMLAnchorElement;

      expect(radioSchedulePromo).toBeInTheDocument();

      fireEvent.click(radioSchedulePromo);

      const expectedTrackingData = expect.objectContaining({
        componentName: 'radio-schedule',
        groupTracker: expect.objectContaining({
          name: radioSchedule?.title,
          type: 'radio-schedule',
          position: (radioSchedule?.position ?? 0) + 1,
          resourceId: radioSchedule?.curationId,
        }),
      });

      expect(useClickTrackerHandler as jest.Mock).toHaveBeenCalledWith(
        expectedTrackingData,
      );
    });

    describe('Social Links - click tracking', () => {
      beforeEach(() => {
        (useViewTracker as jest.Mock).mockClear();
        (useClickTrackerHandler as jest.Mock).mockClear?.();
      });
      it('calls click tracking handler with correct data for Social Links promo link', () => {
        const socialLinks = wsHomePageData.curations.find(
          curation =>
            curation.visualProminence === 'NORMAL' &&
            curation.visualStyle === 'LINKS',
        );

        const pidginHomePageDataWithSocialLinks = {
          ...pidginHomePageDataFixture,
          curations: [...pidginHomePageDataFixture.curations, socialLinks],
        };

        // @ts-expect-error suppress pageData prop type conflicts due to missing imageAlt on selected historical test data for curations
        render(<HomePage pageData={pidginHomePageDataWithSocialLinks} />, {
          service: 'pidgin',
        });

        const socialLinksSection = screen.getByTestId('social-links-1');
        const firstSocialLink = socialLinksSection?.querySelector(
          'ul[role="list"] a',
        ) as HTMLAnchorElement;

        expect(firstSocialLink).toBeInTheDocument();

        fireEvent.click(firstSocialLink);

        const promo = socialLinks?.summaries?.[0];

        const expectedTrackingData = expect.objectContaining({
          componentName: 'social-links',
          groupTracker: expect.objectContaining({
            name: socialLinks?.title,
            type: 'social-links',
            position: socialLinks?.position
              ? socialLinks.position + 1
              : undefined,
            resourceId: socialLinks?.curationId,
            itemCount: socialLinks?.summaries?.length,
          }),
          itemTracker: expect.objectContaining({
            type: 'social-link-promo',
            text: promo?.title,
            position: 1,
            resourceId: promo?.id,
          }),
        });

        const socialLinksCalls = (
          useClickTrackerHandler as jest.Mock
        ).mock.calls
          .map(([arg]) => arg)
          .filter(call => call?.componentName === 'social-links');

        expect(socialLinksCalls).toContainEqual(expectedTrackingData);
      });
    });
  });

  describe('HomePage - Optimizely time of day adaptive curations experiment', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it.each(['homepage_time_of_day_a', 'homepage_time_of_day_b'])(
      'calls reorderCurations with correct arguments when variation is %s',
      variant => {
        const spy = jest.spyOn(reorderCurations, 'default');
        mockUseOptimizelyVariation.mockReturnValue(variant);
        render(<HomePage pageData={basePageData} />, { service: 'hindi' });

        expect(spy).toHaveBeenCalledTimes(1);

        const [callArgs] = spy.mock.calls;
        const { service, curations } = callArgs[0];
        expect(service).toBe('hindi');
        expect(Array.isArray(curations)).toBe(true);
        expect(curations).toEqual(basePageData.curations);

        spy.mockRestore();
      },
    );

    it.each(['control', null, undefined])(
      'does not call reorderCurations when variation is %s',
      variant => {
        const spy = jest.spyOn(reorderCurations, 'default');
        mockUseOptimizelyVariation.mockReturnValue(variant);
        render(<HomePage pageData={basePageData} />, { service: 'hindi' });
        expect(spy).not.toHaveBeenCalled();
        spy.mockRestore();
      },
    );
  });
});
