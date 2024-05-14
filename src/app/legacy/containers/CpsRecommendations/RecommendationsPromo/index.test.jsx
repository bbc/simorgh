import React from 'react';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import { cpsRecommendation, optimoRecommendation } from './fixture';
import { render } from '../../../../components/react-testing-library-with-providers';
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
  it('it renders a Story Promo wrapped in a Grid component', () => {
    const { container } = render(
      <RecommendationsPromo promo={cpsRecommendation} dir="ltr" />,
      {
        service: 'pidgin',
        toggles: {
          eventTracking: {
            enabled: true,
          },
        },
        pageType: 'STY',
      },
    );
    expect(container).toMatchSnapshot();
  });

  it('should render the title of the article as a link', () => {
    const { getByText, container } = render(
      <Component promo={cpsRecommendation} />,
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
      <Component promo={optimoRecommendation} />,
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
