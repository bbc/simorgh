import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import Weather from './index';

// Provide mock props if needed for rendering, e.g. locationId and datetimeLocale
export default {
  title: 'Weather/Weather',
  component: Weather,
  argTypes: {
    locationId: {
      control: 'text',
      description: 'Location ID for the weather forecast',
      defaultValue: '2653822',
    },
    className: {
      control: 'text',
      description: 'Custom class name for styling',
    },
    datetimeLocale: {
      control: 'text',
      description: 'Locale string used for date/time formatting',
      defaultValue: 'en-GB',
    },
  },
} as ComponentMeta<typeof Weather>;

const Template: ComponentStory<typeof Weather> = (args) => <Weather {...args} />;

export const Default = Template.bind({});
Default.args = {
  locationId: '2653822',
  datetimeLocale: 'en-GB',
  className: '',
};

export const LondonWeather = Template.bind({});
LondonWeather.args = {
  locationId: '2643743', // London
  datetimeLocale: 'en-GB',
};

export const ParisWeather = Template.bind({});
ParisWeather.args = {
  locationId: '2988507', // Paris
  datetimeLocale: 'fr-FR',
};