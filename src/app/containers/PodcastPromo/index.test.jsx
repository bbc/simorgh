import React from 'react';
import { render } from '@testing-library/react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';

import { ServiceContextProvider } from '#contexts/ServiceContext';
import PodcastPromo from '.';

/* eslint-disable react/prop-types */
const PromoWithContext = ({ service = 'russian', variant = null }) => (
  <ServiceContextProvider service={service} variant={variant}>
    <PodcastPromo />
  </ServiceContextProvider>
);

describe('PodcastPromo', () => {
  shouldMatchSnapshot('Should render correctly', <PromoWithContext />);

  it('should show when all props are available', async () => {
    const { getByAltText } = await render(<PromoWithContext />);
    const element = getByAltText('Что это было?');
    expect(element).toBeTruthy();
  });

  it('should show when props are not available', async () => {
    const { getByAltText } = await render(
      <PromoWithContext service="pidgin" />,
    );
    const element = getByAltText('Что это было?');
    expect(element).toBeTruthy();
  });
});
