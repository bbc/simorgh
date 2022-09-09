import React from 'react';
import { render, screen } from '@testing-library/react';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import { ServiceContextProvider } from '../../../../../contexts/ServiceContext';
import RelatedContentItem from '.';
import { RelatedContentData } from '../fixture';

// eslint-disable-next-line react/prop-types
const RelatedContentItemFixture = ({ fixtureData, service = 'mundo' }) => (
  <ServiceContextProvider service={service}>
    <ToggleContextProvider>
      <RelatedContentItem
        item={fixtureData}
        ariaLabelledBy="RelatedContent"
        index={0}
      />
    </ToggleContextProvider>
  </ServiceContextProvider>
);

describe('Optimo Related Content Promo Item', () => {
  it('should render Related Content when given appropriate data', () => {
    render(<RelatedContentItemFixture fixtureData={RelatedContentData} />);

    const altText = screen.getByAltText('Keyframe #2');
    const heading = screen.getByText(
      'Bayelsa election: Thugs enta my house destroy my property - Seriake Dickson',
    );
    const timestamp = screen.getByText('17 febrero 2020');

    expect(altText).toBeInTheDocument();
    expect(heading).toBeInTheDocument();
    expect(timestamp).toBeInTheDocument();
  });

  it('should return null if no data is passed', () => {
    const { container } = render(
      <RelatedContentItemFixture fixtureData={{}} />,
    );
    expect(container).toBeEmptyDOMElement();
  });
});
