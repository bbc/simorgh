import React from 'react';
import { render } from '@testing-library/react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';

import { ServiceContextProvider } from '#contexts/ServiceContext';
import PodcastExternalLinks from '.';

/* eslint-disable react/prop-types */
const Component = ({ links, service = 'russian', variant = null }) => (
  <ServiceContextProvider service={service} variant={variant}>
    <PodcastExternalLinks links={links} brandTitle="A brand podcast" />
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
    const { container, getByRole } = render(<Component links={links} />);
    const elements = container.getElementsByTagName('a');
    const listElements = container.getElementsByTagName('li');
    const list = getByRole('list');

    expect(elements.length).toBe(3);
    expect(listElements.length).toBe(3);
    expect(list).toBeInTheDocument();

    const { container: emptyContainer } = render(<Component links={[]} />);
    expect(emptyContainer.getElementsByTagName('a').length).toEqual(0);
  });

  it('should not render a list for only one item', () => {
    const { container, queryByRole } = render(<Component links={[links[0]]} />);
    const elements = container.getElementsByTagName('a');
    expect(elements.length).toBe(1);
    expect(queryByRole('list')).not.toBeInTheDocument();
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

  it('should render component in an aside', () => {
    const { getByRole } = render(<Component links={links} />);
    const aside = getByRole('complementary');
    expect(aside.tagName).toEqual('ASIDE');
    expect(aside.getAttribute('aria-labelledBy')).toEqual('third-party-links');
  });

  it('should render hidden text in the links', () => {
    const { getAllByText } = render(<Component links={links} />);
    const visuallyHiddenText = getAllByText(', A brand podcast');
    expect(visuallyHiddenText.length).toEqual(3);
  });

  it('should contain the correct lang attribute', async () => {
    const { getByText } = render(<Component links={links} />);
    const linkText = getByText('Spotify');
    expect(linkText.getAttribute('lang')).toEqual('en-GB');
  });
});
