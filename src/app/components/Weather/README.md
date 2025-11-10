# Weather Component

## Description

The Weather component fetches and displays weather forecast data from the BBC Weather API. It shows temperature, weather conditions, and timeslots grouped by day of the week in a traditional weather widget style.

## Props

| Name       | Type   | Description                                                           | Default   |
|------------|--------|-----------------------------------------------------------------------|-----------|
| locationId | string | BBC Weather location ID for the forecast data                        | '2653822' |
| className  | string | Additional CSS class name for styling                                 | -         |

## Features

- Fetches weather data from BBC Weather API
- Groups forecasts by day of the week
- Responsive design with mobile-first approach
- Loading and error states
- Temperature display in Celsius
- Formatted time slots (HH:MM format)
- Weather type descriptions

## API Response

The component expects the following data structure from the BBC Weather API:

```json
{
  "forecasts": [
    {
      "timeslot": "9",
      "localDate": "2025-06-30T09:00:00Z",
      "temperatureC": 22,
      "weatherType": "Sunny"
    }
  ]
}