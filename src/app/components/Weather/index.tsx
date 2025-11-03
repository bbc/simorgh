/** @jsx jsx */

import { FC, useEffect, useState } from 'react';
import { jsx } from '@emotion/react';

import Text from '../Text';
import DayForecast from './DayForecast';
import GeolocationButton from './GeoLocationButton';
import styles from './index.styles';
import { WeatherComponentProps, WeatherForecast } from './types';
import {
  getLocationFromStorage,
  saveLocationToStorage,
} from './useLocationStorage';

const Weather: FC<WeatherComponentProps> = ({
  locationId: initialLocationId = '2653822',
  className,
  datetimeLocale,
}) => {
  const [locationId, setLocationId] = useState<string>(initialLocationId);
  const [locationName, setLocationName] = useState<string>('');
  const [weatherData, setWeatherData] = useState<WeatherForecast | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedDays, setExpandedDays] = useState<Record<string, boolean>>({});

  // On mount, try to use location from localStorage
  useEffect(() => {
    const stored = getLocationFromStorage();
    if (stored?.locationId && stored?.locationName) {
      setLocationId(stored.locationId);
      setLocationName(stored.locationName);
    }
    // If not stored, use default props
  }, []);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `https://weather-broker-cdn.api.bbci.co.uk/en/forecast/aggregated/${locationId}`,
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch weather data: ${response.status}`);
        }

        const data: WeatherForecast = await response.json();

        if (!data?.forecasts) {
          throw new Error('Invalid weather data format');
        }

        setWeatherData(data);
        const apiLocationName = data?.location?.name;
        setLocationName(prev =>
          prev && prev !== 'Unknown location'
            ? prev
            : apiLocationName || 'Unknown location',
        );
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to load weather data',
        );
        setWeatherData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [locationId]);

  const handleLocationFound = (
    newLocationId: string,
    newLocationName: string,
    latitude: number,
    longitude: number,
  ) => {
    setLocationId(newLocationId);
    setLocationName(newLocationName);
    saveLocationToStorage({
      latitude,
      longitude,
      locationId: newLocationId,
      locationName: newLocationName,
    });
  };

  // Expand/collapse all days
  const handleExpandAll = () => {
    setExpandedDays(prev => {
      const newValue = Object.values(prev).some(v => !v); // if any is false, expand all
      const next: Record<string, boolean> = {};
      Object.keys(prev).forEach(date => {
        next[date] = newValue;
      });
      return next;
    });
  };

  // Toggle one day
  const handleToggleDay = (date: string) => {
    setExpandedDays(prev => ({
      ...prev,
      [date]: !prev[date],
    }));
  };

  return (
    <div css={styles.container} className={className}>
      <GeolocationButton
        onLocationFound={handleLocationFound}
        apiKey="eT6J9eGICZOYhh6zu01iL8iyMR9MNAoK"
        disabled={loading}
      />
      <Text as="h2" css={styles.header}>
        Weather Forecast
      </Text>
      <Text as="h3" css={{ marginBottom: '1rem', fontWeight: 600 }}>
        {locationName ||
          weatherData?.forecasts?.[0]?.location?.name ||
          'Unknown location'}
      </Text>
      {loading && <Text css={styles.loading}>Loading weather forecast...</Text>}
      {error && <Text css={styles.error}>Error: {error}</Text>}
      {!loading && !error && weatherData?.forecasts?.length && (
        <button
          type="button"
          onClick={handleExpandAll}
          css={{
            marginBottom: '1rem',
            padding: '0.4rem 1rem',
            fontWeight: 600,
            background: '#007bbc',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
          }}
          aria-pressed={Object.values(expandedDays).every(Boolean)}
        >
          {Object.values(expandedDays).every(Boolean)
            ? 'Collapse all'
            : 'Expand all'}
        </button>
      )}
      {!loading &&
        !error &&
        weatherData?.forecasts?.length &&
        weatherData.forecasts.map((forecast, index) => {
          const date = forecast.summary?.report?.localDate ?? `day-${index}`;
          return (
            <DayForecast
              key={forecast.summary?.report?.localDate || index}
              forecast={forecast}
              expanded={!!expandedDays[date]}
              datetimeLocale={datetimeLocale}
              onToggle={() => handleToggleDay(date)}
            />
          );
        })}
    </div>
  );
};

export default Weather;
