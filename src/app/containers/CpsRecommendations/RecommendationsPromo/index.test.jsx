import React from 'react';
import { render } from '@testing-library/react';
import path from 'ramda/src/path';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import pidginPageData from '#data/pidgin/cpsAssets/tori-49450859';
import { shouldMatchSnapshot } from '#legacy/psammead-test-helpers/src';
import RecommendationsPromo from '.';

const promos = path(['relatedContent', 'groups', 0, 'promos'], pidginPageData);

const Component = () => {
  return (
    <ServiceContextProvider service="pidgin">
      <ToggleContextProvider
        toggles={{
          eventTracking: {
            enabled: true,
          },
        }}
      >
        <RecommendationsPromo promo={promos[0]} dir="ltr" />,
      </ToggleContextProvider>
    </ServiceContextProvider>
  );
};

describe('RecommendationsPromo', () => {
  shouldMatchSnapshot(
    'it renders a Story Promo wrapped in a Grid component',
    <Component />,
  );

  it('should render the title of the article as a link', () => {
    const { getByText, container } = render(<Component />);

    const links = container.querySelectorAll('a');

    expect(
      getByText('Meet boys who dey convert cassava to electricity'),
    ).toBeInTheDocument();
    expect(links).toHaveLength(1);
    expect(links[0].getAttribute('href')).toEqual('/pidgin/44508901');
  });
});
