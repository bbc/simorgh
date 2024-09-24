import React from 'react';
import { act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { RequestContextProvider } from '#contexts/RequestContext';
import { data as pidginMostReadData } from '#data/pidgin/mostRead/index.json';
import * as analyticsUtils from '#lib/analyticsUtils';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import { MOST_READ_PAGE } from '#app/routes/utils/pageTypes';
import { render } from '../../components/react-testing-library-with-providers';
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import MostReadPage from './MostReadPage';

fetch.mockResponse(JSON.stringify(pidginMostReadData));

analyticsUtils.getAtUserId = jest.fn();

jest.mock('../../components/ChartbeatAnalytics', () => {
  const ChartbeatAnalytics = () => <div>chartbeat</div>;
  return ChartbeatAnalytics;
});

const MostReadPageWithContext = () => (
  <ToggleContextProvider>
    <ServiceContextProvider service="pidgin">
      <RequestContextProvider
        bbcOrigin="https://www.test.bbc.com"
        isAmp={false}
        pageType={MOST_READ_PAGE}
        pathname="/pathname"
        service="pidgin"
        statusCode={200}
      >
        <BrowserRouter>
          <MostReadPage pageData={pidginMostReadData} />
        </BrowserRouter>
      </RequestContextProvider>
    </ServiceContextProvider>
  </ToggleContextProvider>
);

describe('Most Read Page Main', () => {
  it('should match snapshot for most read page', () => {
    const { container } = render(<MostReadPageWithContext service="pidgin" />, {
      service: 'pidgin',
    });

    expect(container).toMatchSnapshot();
  });

  it('shoulder render most read page', async () => {
    let container;
    await act(async () => {
      container = await render(<MostReadPageWithContext service="pidgin" />, {
        service: 'pidgin',
      }).container;
    });

    expect(container.querySelector('h1').textContent).toEqual(
      'Di one wey oda users dey read well well',
    );
    expect(container.querySelector('ol')).toBeInTheDocument();
    expect(container.querySelectorAll('li a').length).toEqual(5);
  });
});
