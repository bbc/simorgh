import React from 'react';
import { render } from '@testing-library/react';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import Gist from '.';
import fixtureData, { fixtureDataOneItem } from './fixtures';

// eslint-disable-next-line react/prop-types
const GistWithContext = ({ gistData = fixtureData }) => (
  <ServiceContextProvider dir="ltr" service="news" lang="en-GB">
    <Gist gistData={gistData} />
  </ServiceContextProvider>
);

describe('Gist', () => {
  it('should render the gist heading', () => {
    const { getByText } = render(<GistWithContext />);
    const gistCaption = getByText('At a glance');

    expect(gistCaption).toBeInTheDocument();
  });

  it('should render an unordered list if there is more than one item', () => {
    const { container } = render(<GistWithContext />);

    expect(container.querySelectorAll('li').length).toEqual(2);
  });

  it.skip('should render the bullet point as a paragraph if there is only one item', () => {
    const { queryByRole } = render(
      <GistWithContext gistData={fixtureDataOneItem} />,
    );

    expect(queryByRole('list')).not.toBeInTheDocument();
    expect(queryByRole('listitem')).not.toBeInTheDocument();
  });
});
