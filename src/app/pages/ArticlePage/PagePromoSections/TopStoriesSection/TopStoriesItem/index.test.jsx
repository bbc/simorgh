import React from 'react';
import { render } from '@testing-library/react';
import { ServiceContextProvider } from '#app/contexts/ServiceContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import TopStoriesItem from '.';
import {
  topStoriesItem,
  topStoriesLiveLabelItem,
  topStoriesMediaContentItem,
} from '../fixture';

// eslint-disable-next-line react/prop-types
const RenderTopStoriesItem = ({ fixtureData, service = 'news' }) => (
  <ServiceContextProvider service={service}>
    <ToggleContextProvider>
      <TopStoriesItem item={fixtureData} labelId="topStories" index={0} />
    </ToggleContextProvider>
  </ServiceContextProvider>
);

describe('Optimo Related Content Promo Item', () => {
  it('should render Related Content when given appropriate data', () => {
    const { getByText } = render(
      <RenderTopStoriesItem fixtureData={topStoriesItem} />,
    );

    const heading = getByText('Covid antibodies in 1 in 10 people in December');
    const timestamp = getByText('19 January 2021');

    expect(heading).toBeInTheDocument();
    expect(timestamp).toBeInTheDocument();
  });

  it('should return null if no data is passed', () => {
    const { container } = render(<RenderTopStoriesItem fixtureData={{}} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('should render Live Label if linked page is live', () => {
    const { getByText } = render(
      <RenderTopStoriesItem fixtureData={topStoriesLiveLabelItem} />,
    );
    const liveLabel = getByText('LIVE');
    expect(liveLabel).toBeInTheDocument();
  });

  it('should render Live Label with correct translations', () => {
    const { getByText } = render(
      <RenderTopStoriesItem
        fixtureData={topStoriesLiveLabelItem}
        service="mundo"
      />,
    );
    const liveLabel = getByText('EN VIVO');
    expect(liveLabel).toBeInTheDocument();
  });

  it('should render media Label if linked page has media type', () => {
    const { getByText } = render(
      <RenderTopStoriesItem fixtureData={topStoriesMediaContentItem} />,
    );
    const mediaLabel = getByText('Listen,');
    expect(mediaLabel).toBeInTheDocument();
  });

  it('should render media Label with correct translations ', () => {
    const { getByText } = render(
      <RenderTopStoriesItem
        fixtureData={topStoriesMediaContentItem}
        service="mundo"
      />,
    );
    const mediaLabel = getByText('Escuchar,');
    expect(mediaLabel).toBeInTheDocument();
  });
});
