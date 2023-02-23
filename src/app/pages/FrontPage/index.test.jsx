/* eslint-disable react/prop-types */
import React from 'react';
import fetchMock from 'fetch-mock';
import { BrowserRouter } from 'react-router-dom';
import { render, act } from '@testing-library/react';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import pidginFrontPageData from '#data/pidgin/frontpage/index-light';
import pidginMostReadData from '#data/pidgin/mostRead';
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

// eslint-disable-next-line react/prop-types
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
        container = render(
          <FrontPageWithContext pageData={pageData} />,
        ).container;
      });

      const sections = container.querySelectorAll('section');
      expect(sections).toHaveLength(3);
      sections.forEach(section => {
        expect(section.getAttribute('role')).toEqual('region');
      });
    });
  });
});
