/* eslint-disable react/prop-types */
import React from 'react';
import { render } from '@testing-library/react';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import { shouldMatchSnapshot } from '#psammead/psammead-test-helpers/src';
import {
  cpsRecommendationsSingle,
  cpsWithOptimoRecommendationsSingle,
} from './fixture';
import { ServiceContextProvider } from '../../../../contexts/ServiceContext';
import RecommendationsPromo from '.';

const Component = ({ promo }) => {
  return (
    <ServiceContextProvider service="pidgin">
      <ToggleContextProvider
        toggles={{
          eventTracking: {
            enabled: true,
          },
        }}
      >
        <RecommendationsPromo promo={promo} dir="ltr" />,
      </ToggleContextProvider>
    </ServiceContextProvider>
  );
};

describe('RecommendationsPromo', () => {
  shouldMatchSnapshot(
    'it renders a Story Promo wrapped in a Grid component',
    <Component promo={cpsRecommendationsSingle} />,
  );

  it('should render the title of the article as a link', () => {
    const { getByText, container } = render(
      <Component promo={cpsRecommendationsSingle} />,
    );

    const links = container.querySelectorAll('a');

    expect(
      getByText('Meet boys who dey convert cassava to electricity'),
    ).toBeInTheDocument();
    expect(links).toHaveLength(1);
    expect(links[0].getAttribute('href')).toEqual('/pidgin/44508901');
  });

  it('it should render recommendation correctly for optimo promos', () => {
    const { getByText, container } = render(
      <Component promo={cpsWithOptimoRecommendationsSingle} />,
    );

    const links = container.querySelectorAll('a');

    expect(
      getByText(
        'Merkez Bankası politika faizini neden indirdi, enflasyonu düşürmek için ne yapmalı?',
      ),
    ).toBeInTheDocument();
    expect(links).toHaveLength(1);
    expect(links[0].getAttribute('href')).toEqual(
      'https://www.bbc.com/turkce/articles/crg7rvwrxdlo',
    );
  });
});
