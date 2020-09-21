/* eslint-disable react/prop-types */
import React from 'react';
import fetchMock from 'fetch-mock';
import { BrowserRouter } from 'react-router-dom';
import { render, act } from '@testing-library/react';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import afriqueFeatureIdxPageData from '#data/afrique/cpsAssets/48465371';
import getInitialData from '#app/routes/cpsAsset/getInitialData';
import FeatureIdxPage from '.';

const mockToggles = {
  comscoreAnalytics: {
    enabled: true,
  },
};
const requestContextData = ({ service = 'afrique' }) => ({
  pageType: 'FIX',
  service,
  pathname: '/pathname',
  data: { status: 200 },
});

// eslint-disable-next-line react/prop-types
const FeatureIdxPageWithContext = ({
  isAmp = false,
  service = 'afrique',
  toggles = mockToggles,
  ...props
}) => (
  <BrowserRouter>
    <ToggleContextProvider toggles={toggles}>
      <RequestContextProvider
        isAmp={isAmp}
        {...requestContextData({ service })}
      >
        <ServiceContextProvider service={service}>
          <FeatureIdxPage {...props} />
        </ServiceContextProvider>
      </RequestContextProvider>
    </ToggleContextProvider>
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

describe('Feature Idx Page', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  describe('snapshots', () => {
    it('should render an afrique feature idx page correctly', async () => {
      fetchMock.mock(
        'http://localhost/some-feature-idx-page-path.json',
        JSON.stringify(afriqueFeatureIdxPageData),
      );
      const { pageData } = await getInitialData({
        path: 'some-feature-idx-page-path',
        service: 'afrique',
      });

      let container;
      await act(async () => {
        container = render(<FeatureIdxPageWithContext pageData={pageData} />)
          .container;
      });
      expect(container).toMatchSnapshot();
    });

    it('should render an afrique amp feature idx page', async () => {
      fetchMock.mock(
        'http://localhost/some-feature-idx-path.json',
        JSON.stringify(afriqueFeatureIdxPageData),
      );
      const { pageData } = await getInitialData({
        path: 'some-feature-idx-page-path',
        service: 'afrique',
      });

      let container;
      await act(async () => {
        container = render(
          <FeatureIdxPageWithContext pageData={pageData} isAmp />,
        ).container;
      });
      expect(container).toMatchSnapshot();
    });
  });

  describe('Assertions', () => {
    it('should render visually hidden text as h1', async () => {
      fetchMock.mock(
        'http://localhost/some-feature-idx-page-path.json',
        JSON.stringify(afriqueFeatureIdxPageData),
      );
      const { pageData } = await getInitialData({
        path: 'some-feature-idx-page-path',
        service: 'afrique',
      });

      let container;
      await act(async () => {
        container = render(<FeatureIdxPageWithContext pageData={pageData} />)
          .container;
      });

      const h1 = container.querySelector('h1');
      const content = h1.getAttribute('id');
      const tabIndex = h1.getAttribute('tabIndex');

      expect(content).toEqual('content');
      expect(tabIndex).toBe('-1');

      // const span = h1.querySelector('span');
      // expect(span.getAttribute('role')).toEqual('text');
      expect(h1.textContent).toEqual('Tout savoir sur la CAN 2019');

      // const langSpan = span.querySelector('span');
      // expect(langSpan.getAttribute('lang')).toEqual('en-GB');
      // expect(langSpan.textContent).toEqual('BBC News');
    });

    it('should render feature index page sections', async () => {
      fetchMock.mock(
        'http://localhost/some-feature-idx-page-path.json',
        JSON.stringify(afriqueFeatureIdxPageData),
      );
      const { pageData } = await getInitialData({
        path: 'some-feature-idx-page-path',
        service: 'afrique',
      });

      let container;
      await act(async () => {
        container = render(<FeatureIdxPageWithContext pageData={pageData} />)
          .container;
      });

      const sections = container.querySelectorAll('section');
      expect(sections).toHaveLength(10);
      sections.forEach(section => {
        expect(section.getAttribute('role')).toEqual('region');
      });
    });
  });
});
