import React from 'react';
import { render, screen } from '@testing-library/react';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import { ServiceContextProvider } from '../../../contexts/ServiceContext';
import ThemeProvider from '../../ThemeProvider';
import RelatedContentItem from '.';
import { RelatedContentData, RelatedContentItemWithCaption } from '../fixture';
import { Services } from '../../../models/types/global';

jest.mock('../../ThemeProvider');

type Props = {
  fixtureData: object;
  service?: Services;
};

const RelatedContentItemFixture = ({
  fixtureData,
  service = 'mundo',
}: Props) => (
  <ThemeProvider service={service} variant="default">
    <ServiceContextProvider service={service}>
      <ToggleContextProvider>
        <RelatedContentItem
          item={fixtureData}
          ariaLabelledBy="RelatedContent"
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

  it('should render an image when a caption is present', () => {
    render(
      <RelatedContentItemFixture
        fixtureData={RelatedContentItemWithCaption[0]}
      />,
    );
    const image = screen.getByRole('img');
    const altText = screen.getByAltText(
      'A Sudanese man gathers branches as he a builds a new roof for his destroyed house in Abyei.',
    );
    expect(altText).toBeInTheDocument();
    expect(image).toBeInTheDocument();
  });

  it('should return null if no data is passed', () => {
    const { container } = render(
      <RelatedContentItemFixture fixtureData={{}} />,
    );
    expect(container).toBeEmptyDOMElement();
  });
});
