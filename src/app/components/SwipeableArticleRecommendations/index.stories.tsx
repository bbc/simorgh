import type { Meta, StoryObj } from '@storybook/react-webpack5';
import SwipeableArticleRecommendations from '.';
import fixtures from './fixtures';
import readme from './README.md';
import metadata from './metadata.json';

const meta = {
  title: 'Components/SwipeableArticleRecommendations',
  component: SwipeableArticleRecommendations,
  globals: { service: { service: 'mundo', variant: 'default' } },
  parameters: { docs: { readme }, metadata },
  args: { recommendations: fixtures },
} satisfies Meta<typeof SwipeableArticleRecommendations>;

export default meta;

export const Mundo: StoryObj<typeof meta> = {};
export const Empty: StoryObj<typeof meta> = {
  args: { recommendations: [] },
};
