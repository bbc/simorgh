import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, wait, waitForElement } from '@testing-library/react';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import frontPageDataPidgin from '#data/pidgin/frontpage/index-light';
import pidginMostReadData from '#data/pidgin/mostRead';
import getInitialData from '#app/routes/home/getInitialData';
import { FrontPage } from '..';

const requestContextData = {
  isAmp: false,
  pageType: 'frontPage',
  service: 'pidgin',
  pathname: '/pathname',
  data: { status: 200 },
};

const FrontPageWithContext = (props) => (
  <BrowserRouter>
    <ToggleContextProvider>
      <RequestContextProvider {...requestContextData}>
        <ServiceContextProvider service="pidgin">
          <FrontPage {...props} />
        </ServiceContextProvider>
      </RequestContextProvider>
    </ToggleContextProvider>
  </BrowserRouter>
);

let pageData;

beforeEach(async () => {
  fetch.mockResponse(JSON.stringify(frontPageDataPidgin));

  const response = await getInitialData('some-front-page-path');

  pageData = response.pageData;

  fetch.mockResponse(JSON.stringify(pidginMostReadData));
});

jest.mock('uuid', () => {
  let x = 1;
  return () => {
    x += 1;
    return `mockid-${x}`;
  };
});

jest.mock('#containers/ChartbeatAnalytics', () => {
  const ChartbeatAnalytics = () => <div>chartbeat</div>;
  return ChartbeatAnalytics;
});

jest.mock('#containers/PageHandlers/withVariant', () => (Component) => {
  const VariantContainer = (props) => (
    <div id="VariantContainer">
      <Component {...props} />
    </div>
  );

  return VariantContainer;
});

jest.mock('#containers/PageHandlers/withContexts', () => (Component) => {
  const DataContainer = (props) => (
    <div id="ContextsContainer">
      <Component {...props} />
    </div>
  );

  return DataContainer;
});

jest.mock('#containers/PageHandlers/withPageWrapper', () => (Component) => {
  const PageWrapperContainer = (props) => (
    <div id="PageWrapperContainer">
      <Component {...props} />
    </div>
  );

  return PageWrapperContainer;
});

jest.mock('#containers/PageHandlers/withLoading', () => (Component) => {
  const LoadingContainer = (props) => (
    <div id="LoadingContainer">
      <Component {...props} />
    </div>
  );

  return LoadingContainer;
});

jest.mock('#containers/PageHandlers/withError', () => (Component) => {
  const ErrorContainer = (props) => (
    <div id="ErrorContainer">
      <Component {...props} />
    </div>
  );

  return ErrorContainer;
});

jest.mock('#containers/PageHandlers/withData', () => (Component) => {
  const DataContainer = (props) => (
    <div id="DataContainer">
      <Component {...props} />
    </div>
  );

  return DataContainer;
});

jest.mock('#containers/PageHandlers/withContexts', () => (Component) => {
  const ContextsContainer = (props) => (
    <div id="ContextsContainer">
      <Component {...props} />
    </div>
  );

  return ContextsContainer;
});

describe('Front Page', () => {
  describe('snapshots', () => {
    it('should render a pidgin frontpage correctly', async () => {
      const { container } = render(
        <FrontPageWithContext pageData={pageData} />,
      );

      // Waiting to ensure most read data is loaded and element is rendered
      // The data is loaded separately which was previously causing snapshots to fail
      await waitForElement(() => container.querySelector('#Most-Read'));

      expect(container).toMatchSnapshot();
    });
  });

  describe('Assertions', () => {
    it('should render visually hidden text as h1', async () => {
      const { container } = render(
        <FrontPageWithContext pageData={pageData} />,
      );

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

      await wait();
    });

    it('should render front page sections', async () => {
      const { container } = render(
        <FrontPageWithContext pageData={pageData} />,
      );
      const sections = container.querySelectorAll('section');

      expect(sections).toHaveLength(2);
      sections.forEach((section) => {
        expect(section.getAttribute('role')).toEqual('region');
      });
      await wait();
    });
  });
});
