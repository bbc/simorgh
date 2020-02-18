import React from 'react';
import { render, wait } from '@testing-library/react';
import { matchSnapshotAsync } from '@bbc/psammead-test-helpers';
import FrontPageMain from '.';

// 'index-light' is a lighter version of front page data that improves the
// speed of this suite by reducing the amount of pre-processing required.
import { RequestContextProvider } from '#contexts/RequestContext';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import frontPageDataPidgin from '#data/pidgin/frontpage/index-light';
import pidginMostReadData from '#data/pidgin/mostRead';
import getInitialData from '#app/routes/home/getInitialData';

jest.mock('uuid', () => {
  let x = 1;
  return () => {
    x += 1;
    return `mockid-${x}`;
  };
});

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

let pageData;

beforeEach(async () => {
  fetch.mockResponse(JSON.stringify(frontPageDataPidgin));

  const response = await getInitialData('some-front-page-path');

  pageData = response.pageData;

  fetch.mockResponse(JSON.stringify(pidginMostReadData));
});

describe('FrontPageMain', () => {
  describe('snapshots', () => {
    it('should render a pidgin frontpage correctly', async () => {
      await matchSnapshotAsync(
        <FrontPageMainWithContext frontPageData={pageData} />,
      );
    });
  });

  describe('assertions', () => {
    it('should render visually hidden text as h1', async () => {
      const { container } = render(
        <FrontPageMainWithContext frontPageData={pageData} />,
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
        <FrontPageMainWithContext frontPageData={pageData} />,
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
