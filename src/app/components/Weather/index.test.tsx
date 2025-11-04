import React from 'react';
import {
  render,
  screen,
  waitFor,
  fireEvent,
} from '../react-testing-library-with-providers';
import Weather from '.';

// Mock fetch
const mockFetch = jest.fn();
global.fetch = mockFetch;

const mockWeatherData = {
  forecasts: [
    {
      detailed: {
        issueDate: '2025-07-14T22:46:00+01:00',
        lastUpdated: '2025-07-15T11:03:03.456+01:00',
        reports: [
          {
            enhancedWeatherDescription: 'Gusty winds and light rain showers',
            extendedWeatherType: 10,
            feelsLikeTemperatureC: 19,
            feelsLikeTemperatureF: 67,
            gustSpeedKph: 66,
            gustSpeedMph: 41,
            humidity: 70,
            localDate: '2025-07-15',
            precipitationProbabilityInPercent: 89,
            precipitationProbabilityText: 'High chance of precipitation',
            pressure: 1014,
            temperatureC: 18,
            temperatureF: 65,
            timeslot: '12',
            timeslotLength: 1,
            visibility: 'Moderate',
            weatherType: 10,
            weatherTypeText: 'Light Rain Showers',
            windDescription: 'Gusty winds from the west south west',
            windDirection: 'WSW',
            windDirectionAbbreviation: 'WSW',
            windDirectionFull: 'West South Westerly',
            windSpeedKph: 34,
            windSpeedMph: 21,
          },
        ],
      },
      summary: {
        issueDate: '2025-07-14T22:46:00+01:00',
        lastUpdated: '2025-07-15T11:03:03.456+01:00',
        report: {
          enhancedWeatherDescription: 'Gusty winds and rain',
          gustSpeedKph: 67,
          gustSpeedMph: 42,
          localDate: '2025-07-15',
          maxTempC: 18,
          maxTempF: 65,
          minTempC: 13,
          minTempF: 55,
          precipitationProbabilityInPercent: 89,
          precipitationProbabilityText: 'High chance of precipitation',
          sunrise: '05:13',
          sunset: '21:24',
          weatherType: 12,
          weatherTypeText: 'Light Rain',
          windDescription: 'Gusty winds from the south west',
          windDirection: 'SW',
          windDirectionAbbreviation: 'SW',
          windDirectionFull: 'South Westerly',
          windSpeedKph: 35,
          windSpeedMph: 22,
        },
      },
    },
  ],
};

describe('Weather Component', () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  it('should render loading state initially', () => {
    mockFetch.mockImplementation(
      () =>
        new Promise<void>(resolve => {
          resolve();
        }),
    );

    render(<Weather />);

    expect(screen.getByText('Loading weather forecast...')).toBeInTheDocument();
  });

  it('should render error state when fetch fails', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    render(<Weather />);

    await waitFor(() => {
      expect(screen.getByText(/Error:/)).toBeInTheDocument();
    });
  });

  it('should use custom locationId when provided', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockWeatherData,
    });

    render(<Weather locationId="123456" />);

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        'https://weather-broker-cdn.api.bbci.co.uk/en/forecast/aggregated/123456',
      );
    });
  });

  it('should display day summary information', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockWeatherData,
    });

    render(<Weather />);

    await waitFor(() => {
      expect(screen.getByText('Monday, 15 July')).toBeInTheDocument();
    });

    // Expand the day summary, use flexible matcher again
    fireEvent.click(
      screen.getByText((content) => content.includes('Monday') && content.includes('15 July'))
    );
  });
});
