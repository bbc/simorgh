import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { bool } from 'prop-types';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import mostWatchedData from '#data/pidgin/mostWatched/index.json';
import { MOST_WATCHED_PAGE } from '#app/routes/utils/pageTypes';
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import ThemeProvider from '../../components/ThemeProvider';
import MostWatchedPage from './MostWatchedPage';

const pageData = {
  mostWatched: mostWatchedData.records.slice(0, 3).map(item => item.promo),
};

jest.mock('../../legacy/containers/ChartbeatAnalytics', () => {
  const ChartbeatAnalytics = () => <div>chartbeat</div>;
  return ChartbeatAnalytics;
});

jest.mock('../../components/ThemeProvider');

const MostWatchedPageWithContext = ({ isAmp }) => (
  <ThemeProvider service="pidgin" variant="default">
    <ToggleContextProvider>
      <ServiceContextProvider service="pidgin">
        <RequestContextProvider
          bbcOrigin="https://www.test.bbc.com"
          isAmp={isAmp}
          pageType={MOST_WATCHED_PAGE}
          pathname="/pathname"
          service="pidgin"
          statusCode={200}
        >
          <BrowserRouter>
            <MostWatchedPage pageData={pageData} />
          </BrowserRouter>
        </RequestContextProvider>
      </ServiceContextProvider>
    </ToggleContextProvider>
  </ThemeProvider>
);

MostWatchedPageWithContext.propTypes = {
  isAmp: bool,
};

MostWatchedPageWithContext.defaultProps = {
  isAmp: false,
};

describe('Most Watched Page Main', () => {
  it('should match snapshot for the Most Watched page', async () => {
    const { container } = render(<MostWatchedPageWithContext />);

    expect(container).toMatchSnapshot();
  });

  it('shoulder render the Most Watched component on Canonical', async () => {
    const { getByText, container } = render(<MostWatchedPageWithContext />);

    const expectedHeader = 'De one we dem don look';
    const expectedContent = `'I no know say I different for society until pipo begin look me one kain'`;

    expect(container.querySelector('h1').textContent).toEqual(expectedHeader);
    expect(container.querySelector('h2')).toBeInTheDocument();
    expect(getByText(expectedContent)).toBeInTheDocument();
  });

  it('shoulder render the Most Watched component on AMP', () => {
    const { getByText, container } = render(
      <MostWatchedPageWithContext isAmp />,
    );

    const expectedHeader = 'De one we dem don look';
    const expectedContent = `'I no know say I different for society until pipo begin look me one kain'`;

    expect(container.querySelector('h1').textContent).toEqual(expectedHeader);
    expect(container.querySelector('h2')).toBeInTheDocument();
    expect(getByText(expectedContent)).toBeInTheDocument();
  });
});
