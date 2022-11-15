import React from 'react';
import { render, screen } from '@testing-library/react';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import { ServiceContextProvider } from '../../../../../contexts/ServiceContext';
import TopStoriesItem from '.';
import {
  topStoriesItem,
  topStoriesLiveLabelItem,
  topStoriesMediaContentItem,
} from '../fixture';

// eslint-disable-next-line react/prop-types
const TopStoriesItemFixture = ({ fixtureData, service = 'news' }) => (
  <ServiceContextProvider service={service}>
    <ToggleContextProvider>
      <TopStoriesItem
        item={fixtureData}
        ariaLabelledBy="topStories"
        index={0}
      />
    </ToggleContextProvider>
  </ServiceContextProvider>
);

describe('Optimo Top Stories Promo Item', () => {
  it('should render Related Content when given appropriate data', () => {
    render(<TopStoriesItemFixture fixtureData={topStoriesItem} />);

    const heading = screen.getByText(
      'Covid antibodies in 1 in 10 people in December',
    );
    const timestamp = screen.getByText('19 January 2021');

    expect(heading).toBeInTheDocument();
    expect(timestamp).toBeInTheDocument();
  });

  it('should return null if no data is passed', () => {
    const { container } = render(<TopStoriesItemFixture fixtureData={{}} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('should render Live Label if linked page is live', () => {
    render(<TopStoriesItemFixture fixtureData={topStoriesLiveLabelItem} />);
    const liveLabel = screen.getByText('LIVE');
    expect(liveLabel).toBeInTheDocument();
  });

  it('should render Live Label with correct translations', () => {
    render(
      <TopStoriesItemFixture
        fixtureData={topStoriesLiveLabelItem}
        service="mundo"
      />,
    );
    const liveLabel = screen.getByText('EN VIVO');
    expect(liveLabel).toBeInTheDocument();
  });

  it('should render media Label if linked page has media type', () => {
    render(<TopStoriesItemFixture fixtureData={topStoriesMediaContentItem} />);
    const mediaLabel = screen.getByText('Listen,');
    expect(mediaLabel).toBeInTheDocument();
  });

  it('should render media Label with correct translations ', () => {
    render(
      <TopStoriesItemFixture
        fixtureData={topStoriesMediaContentItem}
        service="mundo"
      />,
    );
    const mediaLabel = screen.getByText('Escuchar,');
    expect(mediaLabel).toBeInTheDocument();
  });
});
