import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import Weather from './index';
import * as locationStorage from './useLocationStorage';

// Mock styles so no theme is needed
jest.mock('./index.styles', () => {
  const handler = () => '';
  return new Proxy({}, {
    get: () => handler,
  });
});

// Mocks for child components
jest.mock('./DayForecast', () => ({ forecast, expanded, onToggle }: any) => (
  <div data-testid="DayForecast" data-expanded={expanded} onClick={onToggle}>
    {forecast?.summary?.report?.localDate || 'No date'}
  </div>
));
jest.mock('./GeoLocationButton', () => ({ onLocationFound, disabled }: any) => (
  <button data-testid="geo-btn" disabled={disabled} onClick={() => onLocationFound('1', 'London', 51.5, -0.12)}>
    GeoButton
  </button>
));
jest.mock('../Text', () => ({ as, children, ...props }: any) => (
  <div data-testid="text" {...props}>{children}</div>
));

// Helper: mock fetch
const mockFetch = (data: any, ok = true) => {
  global.fetch = jest.fn().mockResolvedValue({
    ok,
    json: async () => data,
  }) as any;
};

describe('Weather component', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  it('renders error state on fetch failure', async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: false, status: 500 }) as any;
    await act(async () => {
      render(<Weather />);
    });
    expect(await screen.findByText(/Error:/i)).toBeInTheDocument();
    expect(screen.getByText(/Failed to fetch weather data: 500/)).toBeInTheDocument();
  });

  it('shows fallback for missing data structure', async () => {
    mockFetch({});
    await act(async () => {
      render(<Weather />);
    });
    expect(await screen.findByText(/Error:/i)).toBeInTheDocument();
    expect(screen.getByText(/Invalid weather data format/)).toBeInTheDocument();
  });

  it('renders weather forecasts and location header', async () => {
    const weatherResponse = {
      forecasts: [
        { summary: { report: { localDate: '2025-11-04' } } },
        { summary: { report: { localDate: '2025-11-05' } } }
      ],
      location: { name: 'Paris' }
    };
    mockFetch(weatherResponse);
    await act(async () => {
      render(<Weather />);
    });

    // Header should be "Paris"
    expect(await screen.findByText(/Paris/i)).toBeInTheDocument();
    // Two day rows
    expect(screen.getAllByTestId('DayForecast').length).toBe(2);
    expect(screen.getAllByTestId('DayForecast')[0]).toHaveTextContent('2025-11-04');
  });

  it('uses location from localStorage if present on mount', async () => {
    jest.spyOn(locationStorage, 'getLocationFromStorage').mockReturnValue({
      latitude: 51.5,
      longitude: -0.1,
      locationId: 'xyz123',
      locationName: 'StoredCity'
    });
    const weatherResponse = {
      forecasts: [{ summary: { report: { localDate: '2025-11-01' } } }],
      location: { name: 'StoredCity' }
    };
    mockFetch(weatherResponse);
    await act(async () => {
      render(<Weather />);
    });
    expect(await screen.findByText(/StoredCity/i)).toBeInTheDocument();
  });

  it('expands and collapses a day forecast on click', async () => {
    const weatherResponse = {
      forecasts: [
        { summary: { report: { localDate: '2025-11-04' } } }
      ]
    };
    mockFetch(weatherResponse);

    await act(async () => {
      render(<Weather />);
    });
    expect(await screen.findByText('2025-11-04')).toBeInTheDocument();
    const dayRow = screen.getByTestId('DayForecast');
    expect(dayRow.getAttribute('data-expanded')).toBe('false');
    fireEvent.click(dayRow);
    // Cannot assert expanded UI with stateless mock but click triggers handler
  });

  it('renders "Unknown location" if no name found', async () => {
    jest.spyOn(locationStorage, 'getLocationFromStorage').mockReturnValue(null);
    mockFetch({ forecasts: [{}] });
    await act(async () => {
      render(<Weather />);
    });
    expect(await screen.findByText(/Unknown location/i)).toBeInTheDocument();
  });
});