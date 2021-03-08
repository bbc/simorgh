import React from 'react';
import { render } from '@testing-library/react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';

import { ServiceContextProvider } from '#contexts/ServiceContext';
import PodcastExternalLinks from '.';

/* eslint-disable react/prop-types */
const Component = ({ links, service = 'russian', variant = null }) => (
  <ServiceContextProvider service={service} variant={variant}>
    <PodcastExternalLinks links={links} />
  </ServiceContextProvider>
);

const links = [
  {
    linkUrl: 'https://bbc.com',
    linkText: 'Apple',
  },
  {
    linkUrl: 'https://bbc.com',
    linkText: 'Spotify',
  },
  {
    linkUrl: 'https://bbc.com',
    linkText: 'RSS',
  },
];

describe('PodcastExternalLinks', () => {
  shouldMatchSnapshot(
    'Should render external links',
    <Component links={links} />,
  );

  it('should render the right amount of items', () => {
    const { container } = render(<Component links={links} />);
    const elements = container.getElementsByTagName('a');
    expect(elements.length).toBe(3);

    const { container: emptyContainer } = render(<Component links={[]} />);
    expect(emptyContainer.getElementsByTagName('a').length).toEqual(0);
  });

  it('should use default translations when translations are unavailable', () => {
    const { getByText } = render(<Component links={links} />);
    const russianTitle = getByText('Этот подкаст доступен на');
    expect(russianTitle).toBeInTheDocument();

    const { getByText: afriqueGetByText } = render(
      <Component links={links} service="afrique" />,
    );
    const afriqueTitle = afriqueGetByText('This podcast is also available on');
    expect(afriqueTitle).toBeInTheDocument();
  });
});
