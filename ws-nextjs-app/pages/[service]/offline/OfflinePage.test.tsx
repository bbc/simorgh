import React from 'react';
import OfflinePage from './OfflinePage';
import {
  render,
  screen,
} from '#app/components/react-testing-library-with-providers';

describe('OfflinePage', () => {
  it('should render correctly', () => {
    const { container } = render(<OfflinePage />, {
      service: 'news',
    });
    expect(container).toMatchSnapshot();
  });

  it('should render correctly for mundo service', () => {
    const { container } = render(<OfflinePage />, {
      service: 'mundo',
    });
    expect(container).toMatchSnapshot();
  });

  it('should display offline message and solutions', () => {
    render(<OfflinePage />, {
      service: 'news',
    });

    expect(screen.getByText('You are offline')).toBeInTheDocument();

    expect(
      screen.getByText(/It seems you don't have an internet connection/),
    ).toBeInTheDocument();

    expect(
      screen.getByText('Check your internet connection'),
    ).toBeInTheDocument();
  });
});
