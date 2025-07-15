import React from 'react';
import Weather from '.';

const Component = ({ locationId }: { locationId?: string }) => (
  <Weather locationId={locationId} />
);

export default {
  title: 'Components/Weather',
  component: Component,
  args: {
    locationId: '2653822',
  },
  argTypes: {
    locationId: {
      control: { type: 'text' },
      description: 'BBC Weather location ID',
    },
  },
};

export const Default = () => <Component />;

export const CustomLocation = () => <Component locationId="2643743" />;

export const WithMockData = () => {
  // Mock implementation for demo purposes
  const mockData = {
    forecasts: [
      {
        detailed: {
          issueDate: '2025-07-14T22:46:00+01:00',
          lastUpdated: '2025-07-15T11:03:03.456+01:00',
          reports: [
            {
              enhancedWeatherDescription: 'Sunny and warm',
              extendedWeatherType: 1,
              feelsLikeTemperatureC: 25,
              feelsLikeTemperatureF: 77,
              gustSpeedKph: 20,
              gustSpeedMph: 12,
              humidity: 60,
              localDate: '2025-07-15',
              precipitationProbabilityInPercent: 10,
              precipitationProbabilityText: 'Low chance of precipitation',
              pressure: 1020,
              temperatureC: 22,
              temperatureF: 72,
              timeslot: '12',
              timeslotLength: 1,
              visibility: 'Good',
              weatherType: 1,
              weatherTypeText: 'Sunny',
              windDescription: 'Light winds from the west',
              windDirection: 'W',
              windDirectionAbbreviation: 'W',
              windDirectionFull: 'Westerly',
              windSpeedKph: 15,
              windSpeedMph: 9,
            },
          ],
        },
        summary: {
          issueDate: '2025-07-14T22:46:00+01:00',
          lastUpdated: '2025-07-15T11:03:03.456+01:00',
          report: {
            enhancedWeatherDescription: 'Sunny and warm',
            gustSpeedKph: 20,
            gustSpeedMph: 12,
            localDate: '2025-07-15',
            maxTempC: 25,
            maxTempF: 77,
            minTempC: 18,
            minTempF: 64,
            precipitationProbabilityInPercent: 10,
            precipitationProbabilityText: 'Low chance of precipitation',
            sunrise: '05:13',
            sunset: '21:24',
            weatherType: 1,
            weatherTypeText: 'Sunny',
            windDescription: 'Light winds from the west',
            windDirection: 'W',
            windDirectionAbbreviation: 'W',
            windDirectionFull: 'Westerly',
            windSpeedKph: 15,
            windSpeedMph: 9,
          },
        },
      },
    ],
  };

  // Mock fetch for this story
  const originalFetch = global.fetch;
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockData),
    }),
  ) as jest.Mock;

  setTimeout(() => {
    global.fetch = originalFetch;
  }, 100);

  return <Component />;
};
