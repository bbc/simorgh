import React from 'react';
import {
  render,
  screen,
} from '#app/components/react-testing-library-with-providers';
import HourlyReport from './index';
import { WeatherReport } from '../types';

const mockReport: WeatherReport = {
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
};

describe('HourlyReport', () => {
  it('renders the time slot formatted as HH:00', () => {
    render(<HourlyReport report={mockReport} />);
    expect(screen.getByText('12:00')).toBeInTheDocument();
  });

  it('renders the weather type text', () => {
    render(<HourlyReport report={mockReport} />);
    expect(screen.getByText('Sunny')).toBeInTheDocument();
  });

  it('renders the temperature in Celsius', () => {
    render(<HourlyReport report={mockReport} />);
    expect(screen.getByText('22°C')).toBeInTheDocument();
  });

  it('renders the precipitation probability', () => {
    render(<HourlyReport report={mockReport} />);
    expect(screen.getByText('10%')).toBeInTheDocument();
  });
});
