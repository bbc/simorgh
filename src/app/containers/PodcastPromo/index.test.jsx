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
    const { container, getByText } = await render(<PromoWithContext />);
    const sections = container.getElementsByTagName('section');
    const element = getByText('Что это было?');
    expect(element).toBeTruthy();
    expect(sections.length).toBe(1);
  });

  it('should show when props are not available', async () => {
    const { container } = await render(<PromoWithContext service="pidgin" />);
    const sections = container.getElementsByTagName('section');
    expect(sections.length).toBe(0);
  });
});
