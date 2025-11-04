import React from 'react';
import {
  render,
  screen,
} from '#app/components/react-testing-library-with-providers';
import DayForecast from './index';
import { DayForecast as DayForecastType } from '../types';

const mockDayForecast: DayForecastType = {
  detailed: {
    issueDate: '2025-07-14T22:46:00+01:00',
    lastUpdated: '2025-07-15T11:03:03.456+01:00',
    reports: [
      {
        enhancedWeatherDescription: 'Sunny interval',
        extendedWeatherType: 1,
        feelsLikeTemperatureC: 22,
        feelsLikeTemperatureF: 72,
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
      {
        enhancedWeatherDescription: 'Cloudy',
        extendedWeatherType: 3,
        feelsLikeTemperatureC: 20,
        feelsLikeTemperatureF: 68,
        gustSpeedKph: 18,
        gustSpeedMph: 11,
        humidity: 65,
        localDate: '2025-07-15',
        precipitationProbabilityInPercent: 20,
        precipitationProbabilityText: 'Low chance of precipitation',
        pressure: 1018,
        temperatureC: 20,
        temperatureF: 68,
        timeslot: '13',
        timeslotLength: 1,
        visibility: 'Moderate',
        weatherType: 3,
        weatherTypeText: 'Cloudy',
        windDescription: 'Gentle breeze from the east',
        windDirection: 'E',
        windDirectionAbbreviation: 'E',
        windDirectionFull: 'Easterly',
        windSpeedKph: 10,
        windSpeedMph: 6,
      },
    ],
  },
  summary: {
    issueDate: '2025-07-14T22:46:00+01:00',
    lastUpdated: '2025-07-15T11:03:03.456+01:00',
    report: {
      enhancedWeatherDescription: 'Sunny intervals',
      gustSpeedKph: 22,
      gustSpeedMph: 14,
      localDate: '2025-07-15',
      maxTempC: 22,
      maxTempF: 72,
      minTempC: 16,
      minTempF: 61,
      precipitationProbabilityInPercent: 10,
      precipitationProbabilityText: 'Low chance of precipitation',
      sunrise: '05:13',
      sunset: '21:24',
      weatherType: 1,
      weatherTypeText: 'Sunny intervals',
      windDescription: 'Light winds from the west',
      windDirection: 'W',
      windDirectionAbbreviation: 'W',
      windDirectionFull: 'Westerly',
      windSpeedKph: 15,
      windSpeedMph: 9,
    },
  },
};

describe('DayForecast', () => {
  it('renders the day header', () => {
    render(
      <DayForecast
        forecast={mockDayForecast}
        onToggle={() => 'nothing to return. Silly typescript'}
      />,
    );
    expect(screen.getByRole('button')).toHaveTextContent('Tuesday, 15 July');
  });
});
