import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import Weather from './index';
import * as locationStorage from './useLocationStorage';

// Mock styles so no theme is needed
jest.mock('./index.styles', () => {
  const handler = () => '';
  return new Proxy(
    {},
    {
      get: () => handler,
    },
  );
});

// Types for mock props
type MockForecast = {
  summary?: { report?: { localDate?: string } };
  location?: { name?: string };
};
type DayForecastProps = {
  forecast?: MockForecast;
  expanded?: boolean;
  onToggle: () => void;
};
type GeoLocationButtonProps = {
  onLocationFound: (id: string, name: string, lat: number, lon: number) => void;
  disabled?: boolean;
};
type TextProps = {
  as?: string;
  children: React.ReactNode;
  [key: string]: unknown;
};

// Mocks for child components
jest.mock('./DayForecast', () => ({
  __esModule: true,
  default: ({ forecast, expanded = false, onToggle }: DayForecastProps) => (
    <button
      data-testid="DayForecast"
      data-expanded={expanded}
      role="button"
      tabIndex={0}
      onClick={onToggle}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') onToggle();
      }}
      aria-pressed={expanded}
    >
      {forecast?.summary?.report?.localDate || 'No date'}
    </button>
  ),
}));

jest.mock('./GeoLocationButton', () => ({
  __esModule: true,
  default: ({ onLocationFound, disabled }: GeoLocationButtonProps) => (
    <button
      data-testid="geo-btn"
      type="button"
      role="button"
      disabled={disabled}
      onClick={() => onLocationFound('1', 'London', 51.5, -0.12)}
    >
      GeoButton
    </button>
  ),
}));

jest.mock('../Text', () => ({
  __esModule: true,
  default: ({ as: _as, children, ...props }: TextProps) => (
    <div data-testid="text" {...props}>
      {children}
    </div>
  ),
}));

// Helper: mock fetch
const mockFetch = (data: unknown, ok = true) => {
  global.fetch = jest.fn().mockResolvedValue({
    ok,
    json: async () => data,
  }) as jest.Mock;
};

describe('Weather component', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  it('shows loading initially', async () => {
    mockFetch({ forecasts: [] });
    await act(async () => {
      render(<Weather />);
    });
    expect(screen.getByText(/Loading weather forecast/i)).toBeInTheDocument();
  });

  it('renders error state on fetch failure', async () => {
    global.fetch = jest
      .fn()
      .mockResolvedValue({ ok: false, status: 500 }) as jest.Mock;
    await act(async () => {
      render(<Weather />);
    });
    expect(await screen.findByText(/Error:/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Failed to fetch weather data: 500/),
    ).toBeInTheDocument();
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
        { summary: { report: { localDate: '2025-11-05' } } },
      ],
      location: { name: 'Paris' },
    };
    mockFetch(weatherResponse);
    await act(async () => {
      render(<Weather />);
    });

    // Header should be "Paris"
    expect(await screen.findByText(/Paris/i)).toBeInTheDocument();
    expect(screen.getAllByTestId('DayForecast').length).toBe(2);
    expect(screen.getAllByTestId('DayForecast')[0]).toHaveTextContent(
      '2025-11-04',
    );
  });

  it('uses location from localStorage if present on mount', async () => {
    jest.spyOn(locationStorage, 'getLocationFromStorage').mockReturnValue({
      latitude: 51.5,
      longitude: -0.1,
      locationId: 'xyz123',
      locationName: 'StoredCity',
    });
    const weatherResponse = {
      forecasts: [{ summary: { report: { localDate: '2025-11-01' } } }],
      location: { name: 'StoredCity' },
    };
    mockFetch(weatherResponse);
    await act(async () => {
      render(<Weather />);
    });
    expect(await screen.findByText(/StoredCity/i)).toBeInTheDocument();
  });

  it('updates location and saves to storage on GeoLocationButton click', async () => {
    const saveSpy = jest
      .spyOn(locationStorage, 'saveLocationToStorage')
      .mockImplementation(jest.fn());
    const weatherResponse = {
      forecasts: [{ summary: { report: { localDate: '2025-11-02' } } }],
      location: { name: 'London' },
    };
    mockFetch(weatherResponse);

    await act(async () => {
      render(<Weather />);
      const geoBtn = await screen.findByTestId('geo-btn');
      fireEvent.click(geoBtn);
    });

    expect(await screen.findByText(/London/i)).toBeInTheDocument();
    expect(saveSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        latitude: 51.5,
        longitude: -0.12,
        locationId: '1',
        locationName: 'London',
      }),
    );
  });

  it('expands and collapses a day forecast on click', async () => {
    const weatherResponse = {
      forecasts: [{ summary: { report: { localDate: '2025-11-04' } } }],
    };
    mockFetch(weatherResponse);

    await act(async () => {
      render(<Weather />);
    });
    expect(await screen.findByText('2025-11-04')).toBeInTheDocument();
    const dayRow = screen.getByTestId('DayForecast');
    expect(dayRow.getAttribute('data-expanded')).toBe('false');
    fireEvent.click(dayRow);
    // Accessibility: you could also test pressing Enter here if desired.
  });

  it('renders "Unknown location" if no name found', async () => {
    jest
      .spyOn(locationStorage, 'getLocationFromStorage')
      .mockReturnValue(null);
    mockFetch({ forecasts: [{}] });
    await act(async () => {
      render(<Weather />);
    });
    expect(await screen.findByText(/Unknown location/i)).toBeInTheDocument();
  });
});
