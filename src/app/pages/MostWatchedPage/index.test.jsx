import React from 'react';
import { render, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { bool } from 'prop-types';
import { matchSnapshotAsync } from '@bbc/psammead-test-helpers';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import mostWatchedData from '#data/pidgin/mostWatched/index.json';
import MostWatchedPage from './MostWatchedPage';

const pageData = {
  mostWatched: mostWatchedData.records.slice(0, 3).map(item => item.promo),
};

const MostWatchedPageWithContext = ({ isAmp }) => (
  <ServiceContextProvider service="pidgin">
    <RequestContextProvider
      bbcOrigin="https://www.test.bbc.com"
      isAmp={isAmp}
      pageType="mostWatched"
      pathname="/pathname"
      service="pidgin"
      statusCode={200}
    >
      <BrowserRouter>
        <MostWatchedPage pageData={pageData} />
      </BrowserRouter>
    </RequestContextProvider>
  </ServiceContextProvider>
);

MostWatchedPageWithContext.propTypes = {
  isAmp: bool,
};

MostWatchedPageWithContext.defaultProps = {
  isAmp: false,
};

describe('Most Watched Page Main', () => {
  it('should match snapshot for most watched page', async () => {
    await matchSnapshotAsync(<MostWatchedPageWithContext />);
  });

  it('shoulder render most watched component on canonical', async () => {
    let container;
    let getByText;
    await act(async () => {
      const response = await render(<MostWatchedPageWithContext />);
      getByText = response.getByText;
      container = response.container;
    });

    const expectedHeader = 'De one we dem don look';
    const expectedContent = `'I no know say I different for society until pipo begin look me one kain'`;

    expect(container.querySelector('h1').textContent).toEqual(expectedHeader);
    expect(getByText(expectedContent)).toBeInTheDocument();
  });

  it('shoulder not render most watched component on amp', async () => {
    let container;
    await act(async () => {
      const response = await render(
        <MostWatchedPageWithContext isAmp={false} />,
      );
      container = response.container;
    });

    const expectedHeader = 'De one we dem don look';

    expect(container.querySelector('h1').textContent).toEqual(expectedHeader);
    expect(container.querySelector('h3')).not.toBeInTheDocument();
  });
});
