import React from 'react';
import { render } from '@testing-library/react';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import Gist from '.';
import fixtureData from './fixtures';

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

  it('should render an unordered list', () => {
    const { container } = render(<GistWithContext />);

    expect(container.querySelectorAll('li').length).toEqual(5);
  });
});
