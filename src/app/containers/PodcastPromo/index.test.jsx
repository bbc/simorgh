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
    const { getByText, getByRole } = await render(<PromoWithContext />);
    const section = getByRole('region');
    const element = getByText('Что это было?');
    expect(element).toBeTruthy();
    expect(section).toBeTruthy();
  });

  it('should not show when props are not available', async () => {
    const { container } = await render(<PromoWithContext service="pidgin" />);
    const sections = container.getElementsByTagName('section');
    expect(sections.length).toBe(0);
  });
});
