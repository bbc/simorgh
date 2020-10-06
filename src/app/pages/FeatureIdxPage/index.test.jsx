/* eslint-disable react/prop-types */
import React from 'react';
import fetchMock from 'fetch-mock';
import { BrowserRouter } from 'react-router-dom';
import { render, act } from '@testing-library/react';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import urduPageData from '#data/urdu/cpsAssets/science-51314202';
import getInitialData from '#app/routes/cpsAsset/getInitialData';
import FeatureIdxPage from '.';

const mockToggles = {
  comscoreAnalytics: {
    enabled: true,
  },
};

const requestContextData = ({ service = 'urdu' }) => ({
  pageType: 'FIX',
  service,
  pathname: '/pathname',
  data: { status: 200 },
});

// eslint-disable-next-line react/prop-types
const FeatureIdxPageWithContext = ({
  isAmp = false,
  service = 'urdu',
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
  let pageData;

  beforeEach(async () => {
    fetchMock.mock(
      'http://localhost/some-feature-idx-page-path.json',
      JSON.stringify(urduPageData),
    );
    ({ pageData } = await getInitialData({
      path: 'some-feature-idx-page-path',
      service: 'urdu',
    }));
  });

  afterEach(() => {
    fetchMock.restore();
  });

  describe('snapshots', () => {
    it('should render an urdu feature idx page correctly', async () => {
      let container;
      await act(async () => {
        container = render(<FeatureIdxPageWithContext pageData={pageData} />)
          .container;
      });
      expect(container).toMatchSnapshot();
    });

    it('should render an urdu amp feature idx page', async () => {
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
      expect(h1.textContent).toMatchInlineSnapshot(
        `"کورونا وائرس: تحقیق، تشخیص اور احتیاط"`,
      );

      // const langSpan = span.querySelector('span');
      // expect(langSpan.getAttribute('lang')).toEqual('en-GB');
      // expect(langSpan.textContent).toEqual('BBC News');
    });

    it('should render flattened sections', async () => {
      let container;
      await act(async () => {
        container = render(<FeatureIdxPageWithContext pageData={pageData} />)
          .container;
      });

      const sections = container.querySelectorAll('section');
      expect(sections).toHaveLength(4);
      sections.forEach(section => {
        expect(section.getAttribute('role')).toEqual('region');

        const strapline = section.querySelector('h2');
        expect(strapline.textContent).toMatchSnapshot();
      });
    });
  });
});
