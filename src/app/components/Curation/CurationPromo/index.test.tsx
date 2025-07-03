import React from 'react';
import { suppressPropWarnings } from '#psammead/psammead-test-helpers/src';
import { render, screen } from '../../react-testing-library-with-providers';

import CurationPromo from '.';

jest.mock('../../ThemeProvider');

interface FixtureProps {
  lazy?: boolean;
  type?: string;
  duration?: number;
  link?: string;
  isLive?: boolean;
}

const Fixture = ({
  lazy,
  type = 'article',
  duration,
  link = 'https://www.bbc.com/mundo/noticias-america-latina-60742314',
  isLive,
}: FixtureProps) => (
  <CurationPromo
    lazy={lazy}
    title="Promo title"
    description="This is a description"
    firstPublished="2022-03-30T07:37:18.253Z"
    imageUrl="https://ichef.bbci.co.uk/ace/ws/240/cpsprodpb/17CDB/production/_123699479_indigena.jpg"
    lastPublished="2023-04-17T07:37:18.253Z"
    imageAlt="Campesino indígena peruano."
    link={link}
    type={type}
    duration={duration}
    isLive={isLive}
  />
);

describe('Curation Promo', () => {
  suppressPropWarnings(['children', 'string', 'MediaIcon']);

  it('should use formatted duration when a valid duration is provided', () => {
    const container = render(
      <Fixture lazy={false} duration={123} type="video" />,
    );

    const durationString = ', Duration 2,03';

    expect(container.getByText(durationString)).toBeInTheDocument();
  });
  it('should render the last published date', () => {
    const { getByText } = render(<Fixture />, { service: 'mundo' });

    expect(getByText('17 abril 2023')).toBeInTheDocument();
  });

  describe('Lazy loading', () => {
    it('should not lazy load when lazy is falsey', () => {
      render(<Fixture lazy={false} />);

      const loadingAttribute = screen
        .getByAltText('Campesino indígena peruano.')
        .getAttribute('loading');

      expect(loadingAttribute).toBe('eager');
    });

    it('should lazy load when lazy is truthy', () => {
      render(<Fixture lazy />);

      const loadingAttribute = screen
        .getByAltText('Campesino indígena peruano.')
        .getAttribute('loading');

      expect(loadingAttribute).toBe('lazy');
    });
  });

  describe('a11y', () => {
    it('should display title with no visually hidden text when type is article', () => {
      const container = render(<Fixture lazy={false} />);

      expect(
        container.queryByTestId('visually-hidden-text'),
      ).not.toBeInTheDocument();
      expect(container.getByText('Promo title')).toBeInTheDocument();
    });

    it('should use visually hidden text when type is media i.e video, audio and photogallery', () => {
      const container = render(<Fixture lazy={false} type="video" />);

      expect(
        container.queryByTestId('visually-hidden-text'),
      ).toBeInTheDocument();
      expect(container.getByText('Promo title')).toBeInTheDocument();
    });
  });

  describe('Live Promo', () => {
    it('should display LiveLabel on a Live Promo when isLive is true', () => {
      const container = render(
        <Fixture
          link="https://www.bbc.com/mundo/live/noticias-america-latina-60742314"
          isLive
        />,
        { service: 'mundo' },
      );
      expect(container.queryByText('EN VIVO')).toBeInTheDocument();
    });
    it('should not display LiveLabel on a promo when isLive is false', () => {
      const container = render(
        <Fixture
          link="https://www.bbc.com/mundo/live/noticias-america-latina-60742314"
          isLive={false}
        />,
        { service: 'mundo' },
      );
      expect(container.queryByText('EN VIVO')).not.toBeInTheDocument();
    });

    it('should display a Live Promo without a timestamp present', () => {
      const container = render(
        <Fixture
          link="https://www.bbc.com/mundo/live/noticias-america-latina-60742314"
          isLive
        />,
        { service: 'mundo' },
      );
      expect(container.queryByText('17 abril 2023')).not.toBeInTheDocument();
    });
  });
});
