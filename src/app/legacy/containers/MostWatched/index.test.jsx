import React from 'react';
import { render } from '@testing-library/react';

import { RequestContextProvider } from '#contexts/RequestContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import mostWatchedData from '#data/pidgin/mostWatched/index.json';
import { MEDIA_ASSET_PAGE } from '#app/routes/utils/pageTypes';
import { ServiceContextProvider } from '../../../contexts/ServiceContext';
import ThemeProvider from '../../../components/ThemeProvider';
import MostWatched from '.';

jest.mock('../../../components/ThemeProvider');

const promos = mostWatchedData.records.slice(0, 5).map(item => item.promo);
const MostWatchedComponent = ({ data, isAmp }) => (
  <ThemeProvider service="pidgin" variant="default">
    <ServiceContextProvider service="pidgin">
      <RequestContextProvider
        bbcOrigin="https://www.test.bbc.co.uk"
        isAmp={isAmp}
        pageType={MEDIA_ASSET_PAGE}
        pathname="/pidgin/tori-49450859"
        service="pidgin"
        statusCode={200}
      >
        <ToggleContextProvider
          toggles={{
            eventTracking: { enabled: true },
          }}
        >
          <MostWatched data={data} />
        </ToggleContextProvider>
      </RequestContextProvider>
    </ServiceContextProvider>
  </ThemeProvider>
);

describe('MostWatched', () => {
  it('should render the component on Canonical', async () => {
    const { container } = await render(
      <MostWatchedComponent data={promos} isAmp={false} />,
    );
    expect(container.querySelector('ol')).toBeInTheDocument();
  });

  it('should render the component on AMP', async () => {
    const { container } = await render(
      <MostWatchedComponent data={promos} isAmp />,
    );
    expect(container.querySelector('ol')).toBeInTheDocument();
  });

  it('should not render the component when data is empty', async () => {
    const { container } = await render(
      <MostWatchedComponent data={[]} isAmp={false} />,
    );
    expect(container.querySelector('ol')).not.toBeInTheDocument();
  });
});
