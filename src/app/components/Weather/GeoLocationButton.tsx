/** @jsx jsx */
import { FC, useState } from 'react';
import { jsx } from '@emotion/react';
import { saveLocationToStorage } from './useLocationStorage';

interface Props {
  onLocationFound: (
    locationId: string,
    locationName: string,
    lat: number,
    lon: number,
  ) => void;
  apiKey: string;
  disabled?: boolean;
}

const GeolocationButton: FC<Props> = ({
  onLocationFound,
  apiKey,
  disabled,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGetLocation = async () => {
    setLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async position => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(
            `https://locator-service.test.api.bbci.co.uk/locations?latitude=${latitude}&longitude=${longitude}&rs=1&api_key=${apiKey}&format=json`,
          );
          const data = await response.json();
          const result = data?.response?.results?.results?.[0];
          if (result?.id && result?.name) {
            onLocationFound(result.id, result.name, latitude, longitude);
            saveLocationToStorage({
              latitude,
              longitude,
              locationId: result.id,
              locationName: result.name,
            });
          } else {
            setError('Could not determine your nearest BBC weather location.');
          }
        } catch {
          setError('Error retrieving location data.');
        } finally {
          setLoading(false);
        }
      },
      () => {
        setError('Unable to retrieve your location.');
        setLoading(false);
      },
    );
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleGetLocation}
        disabled={loading || disabled}
        css={{
          padding: '0.5rem 1rem',
          borderRadius: '4px',
          border: 'none',
          background: '#ffffff',
          color: '#fff',
          fontWeight: 600,
          cursor: 'pointer',
          marginBottom: '1rem',
          opacity: disabled ? 0.5 : 1,
        }}
        aria-busy={loading}
      >
        <img
          src="http://localhost:7080/images/weather/crosshairs.svg"
          alt="use location"
          width={40}
          height={40}
        />
      </button>
      {error && <div css={{ color: 'red', marginTop: '0.5rem' }}>{error}</div>}
    </div>
  );
};

export default GeolocationButton;
