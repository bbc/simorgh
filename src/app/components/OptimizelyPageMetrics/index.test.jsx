import React from 'react';
import { render, screen } from '@testing-library/react';
import { RequestContext } from '#contexts/RequestContext';
import OptimizelyPageMetrics from '.';

jest.mock('./PageCompleteTracking', () => () => (
  <div data-testid="page-complete-tracking" />
));
jest.mock('./ScrollDepthTracking', () => () => (
  <div data-testid="scroll-depth-tracking" />
));
jest.mock('./PageViewTracking', () => () => (
  <div data-testid="page-view-tracking" />
));

const renderWithContext = (ui, { isAmp = false } = {}) => {
  return render(
    <RequestContext.Provider value={{ isAmp }}>{ui}</RequestContext.Provider>,
  );
};

describe('OptimizelyPageMetrics', () => {
  it('returns null when isAmp is true', () => {
    const { container } = renderWithContext(
      <OptimizelyPageMetrics trackPageView trackPageDepth trackPageComplete />,
      { isAmp: true },
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders no tracking components by default when all tracking flags are false', () => {
    renderWithContext(<OptimizelyPageMetrics />, { isAmp: false });
    expect(screen.queryByTestId('page-complete-tracking')).toBeNull();
    expect(screen.queryByTestId('scroll-depth-tracking')).toBeNull();
    expect(screen.queryByTestId('page-view-tracking')).toBeNull();
  });

  it('renders PageCompleteTracking when trackPageComplete is true', () => {
    renderWithContext(<OptimizelyPageMetrics trackPageComplete />, {
      isAmp: false,
    });
    expect(screen.getByTestId('page-complete-tracking')).toBeInTheDocument();
  });

  it('renders ScrollDepthTracking when trackPageDepth is true', () => {
    renderWithContext(<OptimizelyPageMetrics trackPageDepth />, {
      isAmp: false,
    });
    expect(screen.getByTestId('scroll-depth-tracking')).toBeInTheDocument();
  });

  it('renders PageViewTracking when trackPageView is true', () => {
    renderWithContext(<OptimizelyPageMetrics trackPageView />, {
      isAmp: false,
    });
    expect(screen.getByTestId('page-view-tracking')).toBeInTheDocument();
  });

  it('renders all tracking components when all flags are true', () => {
    renderWithContext(
      <OptimizelyPageMetrics trackPageComplete trackPageDepth trackPageView />,
      { isAmp: false },
    );
    expect(screen.getByTestId('page-complete-tracking')).toBeInTheDocument();
    expect(screen.getByTestId('scroll-depth-tracking')).toBeInTheDocument();
    expect(screen.getByTestId('page-view-tracking')).toBeInTheDocument();
  });
});
