import React from 'react';
import { data as kyrgyzHomePageData } from '#data/kyrgyz/homePage/index.json';
import { Helmet } from 'react-helmet';
import { render } from '../../components/react-testing-library-with-providers';
import HomePage from './HomePage';

jest.mock('../../components/ChartbeatAnalytics', () => {
  const ChartbeatAnalytics = () => <div>Chartbeat Analytics</div>;
  return ChartbeatAnalytics;
});

const homePageData = {
  title: kyrgyzHomePageData.title,
  description: kyrgyzHomePageData.description,
  curations: kyrgyzHomePageData.curations,
  metadata: {
    ...kyrgyzHomePageData.metadata,
    type: 'home',
  },
};

describe('Home Page', () => {
  it('should render a section for each curation with summaries', () => {
    const { container } = render(<HomePage pageData={homePageData} />, {
      service: 'kyrgyz',
      toggles: {
        mostRead: { enabled: true },
      },
    });

    const curationsWithSummaries = kyrgyzHomePageData.curations.filter(
      ({ summaries, mostRead }) =>
        (summaries && summaries?.length > 0) || mostRead,
    );

    expect(container).not.toBeEmptyDOMElement();
    expect(container.getElementsByTagName('section').length).toEqual(
      curationsWithSummaries.length,
    );
  });

  it('should apply provided margin size to the main element', () => {
    const { getByRole } = render(<HomePage pageData={homePageData} />, {
      service: 'kyrgyz',
    });
    expect(getByRole('main')).toHaveStyle({
      margin: '0px 0.5rem',
    });
  });

  it('should have visually hidden text with the localised product, service - home as the H1', () => {
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
    render(<HomePage pageData={homePageData} />, {
      service: 'kyrgyz',
    });
    expect(Helmet.peek().title).toEqual(
      'Кабарлар, акыркы мүнөттөгү кабарлар, талдоо, видео - BBC News Кыргыз Кызматы',
    );
  });

  it('should have a metadata description', () => {
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
      const { getByText } = render(<HomePage pageData={homePageData} />, {
        service: 'kyrgyz',
      });

      expect(getByText('Chartbeat Analytics')).toBeInTheDocument();
    });
  });

  describe('Lazy Loading', () => {
    it('should lazy load all images except the first image in the first curation', () => {
      render(<HomePage pageData={homePageData} />, {
        service: 'kyrgyz',
      });

      const imageList = document.querySelectorAll('img');
      imageList.forEach((image, index) => {
        if (index === 0) {
          expect(image.getAttribute('loading')).toBeNull();
        } else {
          console.log(image, index);
          expect(image.getAttribute('loading')).toBe('lazy');
        }
      });
    });
  });
});
