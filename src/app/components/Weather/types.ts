export interface WeatherReport {
  enhancedWeatherDescription: string;
  extendedWeatherType: number;
  feelsLikeTemperatureC: number;
  feelsLikeTemperatureF: number;
  gustSpeedKph: number;
  gustSpeedMph: number;
  humidity: number;
  localDate: string;
  precipitationProbabilityInPercent: number;
  precipitationProbabilityText: string;
  pressure: number;
  temperatureC: number;
  temperatureF: number;
  timeslot: string;
  timeslotLength: number;
  visibility: string;
  weatherType: number;
  weatherTypeText: string;
  windDescription: string;
  windDirection: string;
  windDirectionAbbreviation: string;
  windDirectionFull: string;
  windSpeedKph: number;
  windSpeedMph: number;
}

export interface DayForecast {
  detailed: {
    issueDate: string;
    lastUpdated: string;
    reports: WeatherReport[];
  };
  location?: {
    name: string;
  };
  summary: {
    issueDate: string;
    lastUpdated: string;
    report: {
      enhancedWeatherDescription: string;
      gustSpeedKph: number;
      gustSpeedMph: number;
      localDate: string;
      maxTempC: number;
      maxTempF: number;
      minTempC: number;
      minTempF: number;
      precipitationProbabilityInPercent: number;
      precipitationProbabilityText: string;
      sunrise: string;
      sunset: string;
      weatherType: number;
      weatherTypeText: string;
      windDescription: string;
      windDirection: string;
      windDirectionAbbreviation: string;
      windDirectionFull: string;
      windSpeedKph: number;
      windSpeedMph: number;
    };
  };
}

export interface WeatherForecast {
  location: {
    name: string;
    [key: string]: any;
  };
  forecasts: DayForecast[];
}

export interface WeatherComponentProps {
  locationId?: string;
  className?: string;
  datetimeLocale?: string;
  locale?: string;
}

export type WeatherIconMap = {
  [key: number]: {
    dark: {
      src: string;
      height: number;
      width: number;
      blurWidth: number;
      blurHeight: number;
    };
    light: {
      src: string;
      height: number;
      width: number;
      blurWidth: number;
      blurHeight: number;
    };
  };
};