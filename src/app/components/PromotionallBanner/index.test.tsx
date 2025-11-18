import React from 'react';
import {
  render,
  screen,
  fireEvent,
} from '../react-testing-library-with-providers';
import PromotionalBanner from '.';

describe('PromotionalBanner', () => {
  const defaultProps = {
    title: 'Install our app',
    description: 'Get the best experience by installing our app.',
    isDismissible: true,
    orText: 'or',
    primaryButton: {
      shortText: 'Install',
      longText: 'Install the PWA App',
      onClick: jest.fn(),
    },
    secondaryButton: {
      text: 'Not now',
      onClick: jest.fn(),
    },
    serviceBackground: 'defaultBackground',
    handleInstallPWA: jest.fn(),
    handleClose: jest.fn(),
  };

  it('renders default props', () => {
    render(<PromotionalBanner {...defaultProps} />);
    expect(screen.getByText('Install our app')).toBeInTheDocument();
    expect(
      screen.getByText('Get the best experience by installing our app.'),
    ).toBeInTheDocument();
    expect(screen.getByText('or')).toBeInTheDocument();
    expect(screen.getByText('Install')).toBeInTheDocument();
    expect(screen.getByText('Install the PWA App')).toBeInTheDocument();
    expect(screen.getByText('Not now')).toBeInTheDocument();
  });

  it('sets correct aria-label for primary button (shortText)', () => {
    render(<PromotionalBanner {...defaultProps} />);
    const primaryButton = screen.getByRole('button', { name: /install/i });
    expect(primaryButton).toHaveAttribute('aria-label', 'Install');
  });

  it('sets correct aria-label for primary button (longText)', () => {
    const props = {
      ...defaultProps,
      primaryButton: {
        ...defaultProps.primaryButton,
        shortText: '',
        longText: 'Install the PWA App',
      },
    };
    render(<PromotionalBanner {...props} />);
    const primaryButton = screen.getByRole('button', {
      name: /install the pwa app/i,
    });
    expect(primaryButton).toHaveAttribute('aria-label', 'Install the PWA App');
  });

  it('sets correct aria-label for secondary button', () => {
    render(<PromotionalBanner {...defaultProps} />);
    const secondaryButton = screen.getByRole('button', { name: /not now/i });
    expect(secondaryButton).toHaveAttribute('aria-label', 'Not now');
  });

  it('calls the primary button click handler when short text is present', () => {
    render(<PromotionalBanner {...defaultProps} />);
    fireEvent.click(screen.getByText('Install'));
    expect(defaultProps.handleInstallPWA).toHaveBeenCalled();
  });

  it('calls the primary button click handler when long text is present', () => {
    render(<PromotionalBanner {...defaultProps} />);
    fireEvent.click(screen.getByText('Install the PWA App'));
    expect(defaultProps.handleInstallPWA).toHaveBeenCalled();
  });

  it('renders the banner with title and description', () => {
    render(<PromotionalBanner {...defaultProps} />);

    expect(screen.getByText('Install our app')).toBeInTheDocument();
    expect(
      screen.getByText('Get the best experience by installing our app.'),
    ).toBeInTheDocument();
  });

  it('renders primary and secondary buttons', () => {
    render(<PromotionalBanner {...defaultProps} />);

    expect(screen.getByText('Install')).toBeInTheDocument();
    expect(screen.getByText('Not now')).toBeInTheDocument();
  });

  it('calls the primary button click handler when clicked', () => {
    render(<PromotionalBanner {...defaultProps} />);

    fireEvent.click(screen.getByRole('button', { name: /Install/i }));
    expect(defaultProps.handleInstallPWA).toHaveBeenCalled();
  });

  it('calls the secondary button click handler when clicked', () => {
    render(<PromotionalBanner {...defaultProps} />);

    fireEvent.click(screen.getByText('Not now'));
    expect(defaultProps.secondaryButton.onClick).toHaveBeenCalled();
  });

  it('renders the dismiss button when isDismissible is true', () => {
    render(<PromotionalBanner {...defaultProps} />);

    expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
  });

  it('does not render the dismiss button when isDismissible is false', () => {
    render(<PromotionalBanner {...defaultProps} isDismissible={false} />);

    expect(
      screen.queryByRole('button', { name: /close/i }),
    ).not.toBeInTheDocument();
  });
});
