import React from 'react';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import { render } from '../../../components/react-testing-library-with-providers';
import { ServiceContextProvider } from '../../../contexts/ServiceContext';
import Gist from '.';
import fixtureData, { fixtureDataOneItem } from './fixtures';

const defaultToggles = {
  eventTracking: {
    enabled: true,
  },
};

const GistWithContext = ({ blocks = fixtureData }) => (
  <ToggleContextProvider toggles={defaultToggles}>
    <ServiceContextProvider dir="ltr" service="news" lang="en-GB">
      <Gist blocks={blocks} />
    </ServiceContextProvider>
  </ToggleContextProvider>
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

  it('should render the gist with multiple list items', () => {
    const { container } = render(<GistWithContext />);
    expect(container).toMatchSnapshot();
  });

  it('should render the gist with one list item', () => {
    const { container } = render(
      <GistWithContext blocks={fixtureDataOneItem} />,
    );
    expect(container).toMatchSnapshot();
  });
});
