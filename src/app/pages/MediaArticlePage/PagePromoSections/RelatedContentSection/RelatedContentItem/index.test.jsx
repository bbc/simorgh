import React from 'react';
import { render, screen } from '@testing-library/react';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import { ServiceContextProvider } from '../../../../../contexts/ServiceContext';
import ThemeProvider from '../../../../../components/ThemeProvider';
import RelatedContentItem from '.';
import { RelatedContentData } from '../fixture';

jest.mock('../../../../../components/ThemeProvider');

// eslint-disable-next-line react/prop-types
const RelatedContentItemFixture = ({ fixtureData, service = 'mundo' }) => (
  <ThemeProvider service={service} variant="default">
    <ServiceContextProvider service={service}>
      <ToggleContextProvider>
        <RelatedContentItem
          item={fixtureData}
          ariaLabelledBy="RelatedContent"
          index={0}
        />
      </ToggleContextProvider>
    </ServiceContextProvider>
  </ThemeProvider>
);

describe('Optimo Related Content Promo Item', () => {
  it('should render Related Content when given appropriate data', () => {
    render(<RelatedContentItemFixture fixtureData={RelatedContentData[0]} />);

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
