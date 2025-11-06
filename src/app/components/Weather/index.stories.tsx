import type { Meta, StoryObj } from '@storybook/react';
import Weather from './index';

const meta: Meta<typeof Weather> = {
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
};

export default meta;

type Story = StoryObj<typeof Weather>;

export const Default: Story = {
  args: {
    locationId: '2653822',
    datetimeLocale: 'en-GB',
    className: '',
  },
};

export const LondonWeather: Story = {
  args: {
    locationId: '2643743', // London
    datetimeLocale: 'en-GB',
  },
};

export const ParisWeather: Story = {
  args: {
    locationId: '2988507', // Paris
    datetimeLocale: 'fr-FR',
  },
};