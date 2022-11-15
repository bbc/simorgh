import React from 'react';
import { arrayOf, shape, bool } from 'prop-types';
import { render } from '@testing-library/react';

import { RequestContextProvider } from '#contexts/RequestContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import { storyItem } from '#models/propTypes/storyItem';
import mostWatchedData from '#data/pidgin/mostWatched/index.json';
import { MEDIA_ASSET_PAGE } from '#app/routes/utils/pageTypes';
import { ServiceContextProvider } from '../../../contexts/ServiceContext';
import MostWatched from '.';

const promos = mostWatchedData.records.slice(0, 5).map(item => item.promo);
const MostWatchedComponent = ({ data, isAmp, isMostWatchedPage }) => (
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
        <MostWatched data={data} isMostWatchedPage={isMostWatchedPage} />
      </ToggleContextProvider>
    </RequestContextProvider>
  </ServiceContextProvider>
);

MostWatchedComponent.propTypes = {
  data: arrayOf(shape(storyItem)).isRequired,
  isAmp: bool.isRequired,
  isMostWatchedPage: bool,
};

MostWatchedComponent.defaultProps = {
  isMostWatchedPage: false,
};

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
