/* eslint-disable react/prop-types */
import React from 'react';
import fetchMock from 'fetch-mock';
import { BrowserRouter } from 'react-router-dom';
import { render, act } from '@testing-library/react';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { ToggleContext } from '#contexts/ToggleContext';
import pidginFrontPageData from '#data/pidgin/frontpage/index-light';
import mundoFrontPageData from '#data/mundo/frontpage/index.json';
import pidginMostReadData from '#data/pidgin/mostRead';
import getInitialData from '#app/routes/home/getInitialData';
import { FrontPage } from '..';

const mockToggleState = {
  toggleState: {
    ads: {
      enabled: false,
    },
    mostRead: {
      enabled: true,
    },
    comscoreAnalytics: {
      enabled: true,
    },
  },
};

// eslint-disable-next-line react/prop-types
const FrontPageWithContext = ({
  isAmp = false,
  service = 'pidgin',
  toggles = mockToggleState,
  ...props
}) => (
  <BrowserRouter>
    <ToggleContext.Provider value={toggles}>
      <RequestContextProvider
        bbcOrigin="https://www.test.bbc.co.uk"
        isAmp={isAmp}
        pageType="frontPage"
        pathname="/pathname"
        service={service}
        statusCode={200}
      >
        <ServiceContextProvider service={service}>
          <FrontPage {...props} />
        </ServiceContextProvider>
      </RequestContextProvider>
    </ToggleContext.Provider>
  </BrowserRouter>
);

jest.mock('uuid', () => {
  let x = 1;
  return () => {
    x += 1;
    return `mockid-${x}`;
  };
});

jest.mock('#containers/ChartbeatAnalytics', () => {
  return () => <div>chartbeat</div>;
});

jest.mock('#containers/ATIAnalytics/amp', () => {
  return () => <div>Amp ATI analytics</div>;
});

jest.mock('#containers/PageHandlers/withVariant', () => Component => {
  return props => (
    <div id="VariantContainer">
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

jest.mock('#containers/PageHandlers/withPageWrapper', () => Component => {
  return props => (
    <div id="PageWrapperContainer">
      <Component {...props} />
    </div>
  );
});

jest.mock('#containers/PageHandlers/withLoading', () => Component => {
  return props => (
    <div id="LoadingContainer">
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
  afterEach(() => {
    fetchMock.restore();
  });

  describe('snapshots', () => {
    it('should render a pidgin frontpage correctly', async () => {
      fetchMock.mock(
        'http://localhost/some-front-page-path.json',
        JSON.stringify(pidginFrontPageData),
      );
      fetchMock.mock(
        ' /pidgin/mostread.json',
        JSON.stringify(pidginMostReadData),
      );
      const { pageData } = await getInitialData({
        path: 'some-front-page-path',
        service: 'pidgin',
      });

      let container;
      await act(async () => {
        container = render(<FrontPageWithContext pageData={pageData} />)
          .container;
      });
      expect(container).toMatchSnapshot();
    });

    it('should render a pidgin amp frontpage', async () => {
      fetchMock.mock(
        'http://localhost/some-front-page-path.json',
        JSON.stringify(pidginFrontPageData),
      );
      fetchMock.mock(
        '/pidgin/mostread.json',
        JSON.stringify(pidginMostReadData),
      );
      const { pageData } = await getInitialData({
        path: 'some-front-page-path',
        service: 'pidgin',
      });

      let container;
      await act(async () => {
        container = render(<FrontPageWithContext pageData={pageData} isAmp />)
          .container;
      });
      expect(container).toMatchSnapshot();
    });
  });

  describe('Assertions', () => {
    it('should render visually hidden text as h1', async () => {
      fetchMock.mock(
        'http://localhost/some-front-page-path.json',
        JSON.stringify(pidginFrontPageData),
      );
      const { pageData } = await getInitialData({
        path: 'some-front-page-path',
        service: 'pidgin',
      });
      fetchMock.mock(
        ' /pidgin/mostread.json',
        JSON.stringify(pidginMostReadData),
      );

      let container;
      await act(async () => {
        container = render(<FrontPageWithContext pageData={pageData} />)
          .container;
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
      fetchMock.mock(
        'http://localhost/some-front-page-path.json',
        JSON.stringify(pidginFrontPageData),
      );
      fetchMock.mock(
        '/pidgin/mostread.json',
        JSON.stringify(pidginMostReadData),
      );
      const { pageData } = await getInitialData({
        path: 'some-front-page-path',
        service: 'pidgin',
      });

      let container;
      await act(async () => {
        container = render(<FrontPageWithContext pageData={pageData} />)
          .container;
      });

      const sections = container.querySelectorAll('section');
      expect(sections).toHaveLength(3);
      sections.forEach(section => {
        expect(section.getAttribute('role')).toEqual('region');
      });
    });
  });

  describe('Ads', () => {
    beforeEach(async () => {
      window.dotcom = {
        bootstrap: jest.fn(),
        cmd: { push: jest.fn() },
      };

      process.env.SIMORGH_APP_ENV = 'test';
    });

    afterEach(() => {
      window.dotcom = undefined;
      window.dotcomConfig = undefined;
    });

    it('should create window.dotcomConfig when on Canonical and ads are enabled', async () => {
      fetchMock.mock(
        'http://localhost/some-front-page-path.json',
        JSON.stringify(mundoFrontPageData),
      );
      const adsToggles = {
        toggleState: {
          ads: {
            enabled: true,
          },
        },
      };
      const { pageData } = await getInitialData({
        path: 'some-front-page-path',
        service: 'mundo',
      });

      await act(async () => {
        render(
          <FrontPageWithContext
            service="mundo"
            pageData={pageData}
            toggles={adsToggles}
          />,
        );
      });

      expect(window.dotcomConfig).toEqual({
        pageAds: true,
        playerAds: false,
      });
    });

    it('should not create window.dotcomConfig when on Canonical and ads are disabled', async () => {
      fetchMock.mock(
        'http://localhost/some-front-page-path.json',
        JSON.stringify(mundoFrontPageData),
      );
      const { pageData } = await getInitialData({
        path: 'some-front-page-path',
        service: 'mundo',
      });

      await act(async () => {
        render(<FrontPageWithContext service="mundo" pageData={pageData} />);
      });

      expect(window.dotcomConfig).toBeUndefined();
    });

    it('should not create window.dotcomConfig when on Amp and ads are enabled', async () => {
      fetchMock.mock(
        'http://localhost/some-front-page-path.json',
        JSON.stringify(mundoFrontPageData),
      );
      const { pageData } = await getInitialData({
        path: 'some-front-page-path',
        service: 'mundo',
      });
      const adsToggles = {
        toggleState: {
          ads: {
            enabled: true,
          },
        },
      };

      await act(async () => {
        render(
          <FrontPageWithContext
            service="mundo"
            pageData={pageData}
            toggles={adsToggles}
            isAmp
          />,
        );
      });

      expect(window.dotcomConfig).toBeUndefined();
    });
  });
});
