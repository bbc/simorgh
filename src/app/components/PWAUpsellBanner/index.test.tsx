import React from 'react';
import {
  render,
  screen,
  fireEvent,
} from '../react-testing-library-with-providers';
import PWAUpsellBanner from '.';

describe('PWAUpsellBanner', () => {
  const defaultProps = {
    title: 'Install our app',
    description: 'Get the best experience by installing our app.',
    isDismissible: true,
    buttonPrimary: {
      text: 'Install',
      onClick: jest.fn(),
    },
    buttonSecondary: {
      text: 'Not now',
      onClick: jest.fn(),
    },
    serviceBackground: 'defaultBackground',
    handleInstallPWA: jest.fn(),
    handleClose: jest.fn(),
  };

  it('renders the banner with title and description', () => {
    render(<PWAUpsellBanner {...defaultProps} />);

    expect(screen.getByText('Install our app')).toBeInTheDocument();
    expect(
      screen.getByText('Get the best experience by installing our app.'),
    ).toBeInTheDocument();
  });

  it('renders primary and secondary buttons', () => {
    render(<PWAUpsellBanner {...defaultProps} />);

    expect(screen.getByText('Install')).toBeInTheDocument();
    expect(screen.getByText('Not now')).toBeInTheDocument();
  });

  it('calls the primary button click handler when clicked', () => {
    render(<PWAUpsellBanner {...defaultProps} />);

    fireEvent.click(screen.getByRole('button', { name: /install/i }));
    expect(defaultProps.buttonPrimary.onClick).toHaveBeenCalled();
  });

  it('calls the secondary button click handler when clicked', () => {
    render(<PWAUpsellBanner {...defaultProps} />);

    fireEvent.click(screen.getByText('Not now'));
    expect(defaultProps.buttonSecondary.onClick).toHaveBeenCalled();
  });

  it('renders the dismiss button when isDismissible is true', () => {
    render(<PWAUpsellBanner {...defaultProps} />);

    expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
  });

  it('does not render the dismiss button when isDismissible is false', () => {
    render(<PWAUpsellBanner {...defaultProps} isDismissible={false} />);

    expect(
      screen.queryByRole('button', { name: /close/i }),
    ).not.toBeInTheDocument();
  });
});
