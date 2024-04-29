import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { data as kyrgyzHomePageData } from '#data/kyrgyz/homePage/index.json';
import { data as afriqueHomePageDataFixture } from '#data/afrique/homePage/index.json';
import { render } from '../../components/react-testing-library-with-providers';
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

describe('Home Page', () => {
  suppressPropWarnings(['children', 'string', 'MediaIcon']);

  it('should render a section for each curation with summaries', () => {
    const { container } = render(<HomePage pageData={afriqueHomePageData} />, {
      service: 'afrique',
      toggles: {
        mostRead: { enabled: true },
        radioSchedule: { enabled: true },
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
      return Helmet.peek().scriptTags.map(({ innerHTML }) =>
        JSON.parse(innerHTML),
      );
    };

    expect(getLinkedDataOutput()).toMatchSnapshot();
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
    it('Only the first image, message banner, and billboard on the homepage are not lazy loaded, but all others are', () => {
      // @ts-expect-error suppress pageData prop type conflicts due to missing imageAlt on selected historical test data for curations
      render(<HomePage pageData={homePageData} />, {
        service: 'kyrgyz',
      });

      const nonLazyLoadImages: string[] = [];
      document
        .querySelectorAll(
          `[data-testid^="billboard"] img, [data-testid^="message-banner"] img`,
        )
        .forEach(image =>
          nonLazyLoadImages.push(image.getAttribute(`src`) || ''),
        );

      const imageList = document.querySelectorAll('img');

      imageList.forEach((image, index) => {
        const src = image.getAttribute('src') || '';

        if (index === 0 || nonLazyLoadImages.includes(src)) {
          expect(image.getAttribute('loading')).toBeNull();
        } else {
          expect(image.getAttribute('loading')).toBe('lazy');
        }
      });
    });

    it('Only the first image on a homepage and all Billboard images have Fetch Priority set to high', () => {
      // @ts-expect-error suppress pageData prop type conflicts due to missing imageAlt on selected historical test data for curations
      render(<HomePage pageData={homePageData} />, {
        service: 'kyrgyz',
      });

      const highFetchPriorityImages: string[] = [];
      document
        .querySelectorAll(`[data-testid^="billboard"] img`)
        .forEach(image =>
          highFetchPriorityImages.push(image.getAttribute(`src`) || ''),
        );

      const imageList = document.querySelectorAll('img');

      imageList.forEach((image, index) => {
        const src = image.getAttribute('src') || '';
        if (index === 0 || highFetchPriorityImages.includes(src)) {
          expect(image.getAttribute('fetchpriority')).toBe('high');
        } else {
          expect(image.getAttribute('fetchpriority')).toBeNull();
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
