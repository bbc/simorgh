import React from 'react';
import { render, cleanup, wait, waitForElement } from '@testing-library/react';
import FrontPageMain from '.';

// 'index-light' is a lighter version of front page data that improves the
// speed of this suite by reducing the amount of pre-processing required.
import frontPageDataPidgin from '#data/pidgin/frontpage/index-light';

import preprocessor from '#lib/utilities/preprocessor';
import { indexPreprocessorRules } from '#app/routes/fetchPageData/utils/preprocessorRulesConfig';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import pidginMostReadData from '#data/pidgin/mostRead';

const processedPidgin = () =>
  preprocessor(frontPageDataPidgin, indexPreprocessorRules);

jest.mock('uuid', () =>
  (() => {
    let x = 1;
    return () => {
      x += 1;
      return `mockid-${x}`;
    };
  })(),
);

jest.mock('../ChartbeatAnalytics', () => {
  const ChartbeatAnalytics = () => <div>chartbeat</div>;
  return ChartbeatAnalytics;
});

const requestContextData = {
  isAmp: false,
  service: 'igbo',
  statusCode: 200,
  pageType: 'frontPage',
  pathname: '/pathname',
};

const FrontPageMainWithContext = props => (
  <ToggleContextProvider>
    <RequestContextProvider {...requestContextData}>
      <ServiceContextProvider service="igbo">
        <FrontPageMain {...props} />
      </ServiceContextProvider>
    </RequestContextProvider>
  </ToggleContextProvider>
);

describe('FrontPageMain', () => {
  let frontPageData;

  beforeAll(async () => {
    frontPageData = await processedPidgin();
    fetch.mockResponse(JSON.stringify(pidginMostReadData));
  });

  describe('snapshots', () => {
    it('should render a pidgin frontpage correctly', async () => {
      const { container } = render(
        <FrontPageMainWithContext frontPageData={frontPageData} />,
      );

      // Waiting to ensure most read data is loaded and element is rendered
      // The data is loaded separately which was previously causing snapshots to fail
      await waitForElement(() => container.querySelector('#Most-Read'));

      expect(container).toMatchSnapshot();
    });
  });

  describe('assertions', () => {
    afterEach(cleanup);

    it('should render visually hidden text as h1', async () => {
      const { container } = render(
        <FrontPageMainWithContext frontPageData={frontPageData} />,
      );

      const h1 = container.querySelector('h1');
      const content = h1.getAttribute('id');
      const tabIndex = h1.getAttribute('tabIndex');

      expect(content).toEqual('content');
      expect(tabIndex).toBe('-1');

      const span = h1.querySelector('span');
      expect(span.getAttribute('role')).toEqual('text');
      expect(span.textContent).toEqual('BBC News, Ìgbò - Akụkọ');

      const langSpan = span.querySelector('span');
      expect(langSpan.getAttribute('lang')).toEqual('en-GB');
      expect(langSpan.textContent).toEqual('BBC News');

      await wait();
    });

    it('should render front page sections', async () => {
      const { container } = render(
        <FrontPageMainWithContext frontPageData={frontPageData} />,
      );
      const sections = container.querySelectorAll('section');

      expect(sections).toHaveLength(2);
      sections.forEach(section => {
        expect(section.getAttribute('role')).toEqual('region');
      });
      await wait();
    });
  });
});
