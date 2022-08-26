import React from 'react';
import { render, screen } from '@testing-library/react';

import { ServiceContextProvider } from '../../../../contexts/ServiceContext';
import TopicPromo from '.';

// eslint-disable-next-line react/prop-types
const Fixture = ({ lazy }) => (
  <ServiceContextProvider service="mundo">
    <TopicPromo
      lazy={lazy}
      title="Promo title"
      firstPublished="2022-03-30T07:37:18.253Z"
      imageUrl="https://ichef.bbci.co.uk/news/240/cpsprodpb/17CDB/production/_123699479_indigena.jpg"
      imageAlt="Campesino indígena peruano."
      link="https://www.bbc.com/mundo/noticias-america-latina-60742314"
    />
    ,
  </ServiceContextProvider>
);

describe('Topic Curations Promo', () => {
  describe('Lazy loading', () => {
    it('should not lazy load when lazy is falsey', () => {
      render(<Fixture lazy={false} />);

      const loadingAttribute = screen
        .getByAltText('Campesino indígena peruano.')
        .getAttribute('loading');

      expect(loadingAttribute).toBeNull();
    });

    it('should lazy load when lazy is truthy', () => {
      render(<Fixture lazy />);

      const loadingAttribute = screen
        .getByAltText('Campesino indígena peruano.')
        .getAttribute('loading');

      expect(loadingAttribute).toBe('lazy');
    });
  });
});
