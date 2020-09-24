import React from 'react';
import { arrayOf, shape, bool } from 'prop-types';
import { render } from '@testing-library/react';

import { ServiceContextProvider } from '#contexts/ServiceContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import { storyItem } from '#models/propTypes/storyItem';
import MostWatched from '.';
import mostWatchedData from '#data/pidgin/mostWatched/index.json';

const promos = mostWatchedData.records.slice(0, 5).map(item => item.promo);
const MostWatchedComponent = ({ data, isAmp, isMostWatchedPage }) => (
  <ServiceContextProvider service="pidgin">
    <RequestContextProvider
      bbcOrigin="https://www.test.bbc.co.uk"
      isAmp={isAmp}
      pageType="MAP"
      pathname="/pidgin/tori-49450859"
      service="pidgin"
      statusCode={200}
    >
      <MostWatched data={data} isMostWatchedPage={isMostWatchedPage} />
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

  it('should not render the component on AMP MAPs', async () => {
    const { container } = await render(
      <MostWatchedComponent data={promos} isAmp />,
    );
    expect(container.querySelector('ol')).not.toBeInTheDocument();
  });

  it('should render the component on AMP Most Watched pages', async () => {
    const { container } = await render(
      <MostWatchedComponent data={promos} isAmp isMostWatchedPage />,
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
