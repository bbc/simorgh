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
      shortText: 'Install',
      longText: 'Install the PWA App',
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

  it('sets correct aria-label for primary button (shortText)', () => {
    render(<PWAUpsellBanner {...defaultProps} />);
    const primaryButton = screen.getByRole('button', { name: /install/i });
    expect(primaryButton).toHaveAttribute('aria-label', 'Install');
  });

  it('sets correct aria-label for primary button (longText)', () => {
    const props = {
      ...defaultProps,
      buttonPrimary: {
        ...defaultProps.buttonPrimary,
        shortText: '',
        longText: 'Install the PWA App',
      },
    };
    render(<PWAUpsellBanner {...props} />);
    const primaryButton = screen.getByRole('button', {
      name: /install the pwa app/i,
    });
    expect(primaryButton).toHaveAttribute('aria-label', 'Install the PWA App');
  });

  it('sets correct aria-label for secondary button', () => {
    render(<PWAUpsellBanner {...defaultProps} />);
    const secondaryButton = screen.getByRole('button', { name: /not now/i });
    expect(secondaryButton).toHaveAttribute('aria-label', 'Not now');
  });

  it('calls the primary button click handler when short text is present', () => {
    render(<PWAUpsellBanner {...defaultProps} />);
    fireEvent.click(screen.getByText('Install'));
    expect(defaultProps.handleInstallPWA).toHaveBeenCalled();
  });

  it('calls the primary button click handler when long text is present', () => {
    render(<PWAUpsellBanner {...defaultProps} />);
    fireEvent.click(screen.getByText('Install the PWA App'));
    expect(defaultProps.handleInstallPWA).toHaveBeenCalled();
  });

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

    fireEvent.click(screen.getByRole('button', { name: /Install/i }));
    expect(defaultProps.handleInstallPWA).toHaveBeenCalled();
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
