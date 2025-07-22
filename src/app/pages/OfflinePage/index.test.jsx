import React from 'react';
import OfflinePage from './OfflinePage';
import {
  render,
  screen,
} from '../../components/react-testing-library-with-providers';

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

  it('should use fallback values when translations are missing', () => {
    render(<OfflinePage />, {
      service: 'news',
      translations: {},
    });

    expect(screen.getByText('You are offline.')).toBeInTheDocument();

    expect(
      screen.getByText(/Seems like you don't have an internet connection/),
    ).toBeInTheDocument();
  });
});
