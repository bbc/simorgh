import React from 'react';
import { render } from '@testing-library/react';
import { ServiceContextProvider } from '#app/contexts/ServiceContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import RelatedContentItem from '.';
import { RelatedContentData } from '../fixture';

// eslint-disable-next-line react/prop-types
const RelatedContentItemComponent = ({ fixtureData, service = 'mundo' }) => (
  <ServiceContextProvider service={service}>
    <ToggleContextProvider>
      <RelatedContentItem
        item={fixtureData}
        labelId="RelatedContent"
        index={0}
      />
    </ToggleContextProvider>
  </ServiceContextProvider>
);

describe('Optimo Related Content Promo Item', () => {
  it('should render Related Content when given appropriate data', () => {
    const { getByAltText, getByText } = render(
      <RelatedContentItemComponent fixtureData={RelatedContentData} />,
    );

    const altText = getByAltText('Keyframe #2');
    const heading = getByText(
      'Bayelsa election: Thugs enta my house destroy my property - Seriake Dickson',
    );
    const timestamp = getByText('17 febrero 2020');

    expect(altText).toBeInTheDocument();
    expect(heading).toBeInTheDocument();
    expect(timestamp).toBeInTheDocument();
  });

  it('should return null if no data is passed', () => {
    const { container } = render(
      <RelatedContentItemComponent fixtureData={{}} />,
    );
    expect(container).toBeEmptyDOMElement();
  });
});
