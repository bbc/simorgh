import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, act } from '@testing-library/react';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import serbianFrontPageData from '#data/serbian/frontpage/lat.json';
import getInitialData from '#app/routes/frontPage/getInitialData';
import { FRONT_PAGE } from '#app/routes/utils/pageTypes';
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import ThemeProvider from '../../components/ThemeProvider';
import FrontPage from '.';

jest.mock('../../components/ThemeProvider');

const mockToggles = {
  ads: {
    enabled: false,
  },
  mostRead: {
    enabled: true,
  },
  comscoreAnalytics: {
    enabled: true,
  },
};
const requestContextData = ({ service = 'pidgin' }) => ({
  pageType: FRONT_PAGE,
  service,
  pathname: '/pathname',
  data: { status: 200 },
  showAdsBasedOnLocation: true,
});

const FrontPageWithContext = ({
  isAmp = false,
  service = 'pidgin',
  toggles = mockToggles,
  ...props
}) => (
  <BrowserRouter>
    <ThemeProvider service={service} variant="default">
      <ToggleContextProvider toggles={toggles}>
        <RequestContextProvider
          isAmp={isAmp}
          {...requestContextData({ service })}
        >
          <ServiceContextProvider service={service}>
            <FrontPage {...props} />
          </ServiceContextProvider>
        </RequestContextProvider>
      </ToggleContextProvider>
    </ThemeProvider>
  </BrowserRouter>
);

jest.mock('uuid', () => {
  let x = 1;
  return {
    v4: () => {
      x += 1;
      return `mockid${x}`;
    },
  };
});

jest.mock('../../components/ChartbeatAnalytics', () => {
  return () => <div>chartbeat</div>;
});

jest.mock('../../components/ATIAnalytics/amp', () => {
  return () => <div>Amp ATI analytics</div>;
});

jest.mock('#containers/PageHandlers/withContexts', () => Component => {
  return props => (
    <div id="ContextsContainer">
      <Component {...props} />
    </div>
  );
});

jest.mock('#containers/PageHandlers/withPageWrapper', () => Component => {
  return props => (
    <div id="PageWrapperContainer">
      <Component {...props} />
    </div>
  );
});

jest.mock('#containers/PageHandlers/withError', () => Component => {
  return props => (
    <div id="ErrorContainer">
      <Component {...props} />
    </div>
  );
});

jest.mock('#containers/PageHandlers/withData', () => Component => {
  return props => (
    <div id="DataContainer">
      <Component {...props} />
    </div>
  );
});

jest.mock('#containers/PageHandlers/withContexts', () => Component => {
  return props => (
    <div id="ContextsContainer">
      <Component {...props} />
    </div>
  );
});

describe('Front Page', () => {
  beforeEach(() => {
    delete process.env.SIMORGH_APP_ENV;
    fetch.mockResponse(JSON.stringify(serbianFrontPageData));
  });

  afterEach(() => {
    jest.clearAllMocks();
    fetch.resetMocks();
  });

  describe('Assertions', () => {
    it('should render visually hidden text as h1', async () => {
      const { pageData } = await getInitialData({
        path: '/serbian/lat',
        service: 'serbian',
        variant: 'lat',
      });

      let container;
      await act(async () => {
        container = render(
          <FrontPageWithContext pageData={pageData} />,
        ).container;
      });

      const h1 = container.querySelector('h1');
      const content = h1.getAttribute('id');
      const tabIndex = h1.getAttribute('tabIndex');

      expect(content).toEqual('content');
      expect(tabIndex).toBe('-1');

      const span = h1.querySelector('span');
      expect(span.getAttribute('role')).toEqual('text');
      expect(span.textContent).toEqual('BBC News, Pidgin - Home');

      const langSpan = span.querySelector('span');
      expect(langSpan.getAttribute('lang')).toEqual('en-GB');
      expect(langSpan.textContent).toEqual('BBC News');
    });

    it('should render front page sections', async () => {
      const { pageData } = await getInitialData({
        path: '/serbian/lat',
        service: 'serbian',
        variant: 'lat',
      });

      let container;
      await act(async () => {
        container = render(
          <FrontPageWithContext pageData={pageData} />,
        ).container;
      });

      const sections = container.querySelectorAll('section');
      expect(sections).toHaveLength(6);
      sections.forEach(section => {
        expect(section.getAttribute('role')).toEqual('region');
      });
    });

    it('should render images with the .webp image extension', async () => {
      process.env.SIMORGH_ICHEF_BASE_URL = 'https://ichef.test.bbci.co.uk';

      const { pageData } = await getInitialData({
        path: '/serbian/lat',
        service: 'serbian',
        variant: 'lat',
      });

      const { path } = pageData.content.groups[0].items[0].indexImage;
      const imageURL = `https://ichef.test.bbci.co.uk/ace/ws/660${path}.webp`;
      const expectedWebpSrcSetURLs = [
        `https://ichef.test.bbci.co.uk/ace/ws/70${path}.webp 70w`,
        `https://ichef.test.bbci.co.uk/ace/ws/95${path}.webp 95w`,
        `https://ichef.test.bbci.co.uk/ace/ws/144${path}.webp 144w`,
        `https://ichef.test.bbci.co.uk/ace/ws/183${path}.webp 183w`,
        `https://ichef.test.bbci.co.uk/ace/ws/240${path}.webp 240w`,
        `https://ichef.test.bbci.co.uk/ace/ws/320${path}.webp 320w`,
        `https://ichef.test.bbci.co.uk/ace/ws/660${path}.webp 660w`,
      ].join(', ');

      const expectedJPGSrcSetURLs = [
        `https://ichef.test.bbci.co.uk/ace/ws/70${path} 70w`,
        `https://ichef.test.bbci.co.uk/ace/ws/95${path} 95w`,
        `https://ichef.test.bbci.co.uk/ace/ws/144${path} 144w`,
        `https://ichef.test.bbci.co.uk/ace/ws/183${path} 183w`,
        `https://ichef.test.bbci.co.uk/ace/ws/240${path} 240w`,
        `https://ichef.test.bbci.co.uk/ace/ws/320${path} 320w`,
        `https://ichef.test.bbci.co.uk/ace/ws/660${path} 660w`,
      ].join(', ');

      let container;
      await act(async () => {
        container = render(
          <FrontPageWithContext pageData={pageData} />,
        ).container;
      });

      const promoImage = container.querySelectorAll(
        'div[data-e2e="story-promo"] picture',
      )[0];
      const [webpSource, jpgSource, img] = promoImage.childNodes;

      expect(webpSource.srcset).toEqual(expectedWebpSrcSetURLs);
      expect(jpgSource.srcset).toEqual(expectedJPGSrcSetURLs);
      expect(img.src).toEqual(imageURL);
    });
  });
});
