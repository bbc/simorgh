const LS_KEY = 'bbc-weather-user-location';

export interface StoredLocation {
  latitude: number;
  longitude: number;
  locationId: string;
  locationName: string;
}

export const saveLocationToStorage = (data: StoredLocation) => {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(data));
  } catch {
    // fail silently, e.g. private mode
  }
};

export const getLocationFromStorage = (): StoredLocation | null => {
  try {
    const data = localStorage.getItem(LS_KEY);
    if (!data) return null;
    return JSON.parse(data);
  } catch {
    return null;
  }
};

/**
 * Optional: Helper to clear location data from storage.
 */
export const clearLocationStorage = () => {
  try {
    localStorage.removeItem(LS_KEY);
  } catch {
    // fail silently
  }
};
