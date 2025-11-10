import React from 'react';
import {
  AsianGamesFootballProps,
  FlourishStoryFixture,
  FlourishVisualisationFixture,
} from './fixtures';
import FlourishEmbed from '.';

export default {
  title: 'Components/Embeds/Flourish Embed',
  component: FlourishEmbed,
  parameters: {
    chromatic: {
      diffThreshold: 0.5,
    },
  },
};

export const FlourishResponsiveHeight = () => (
  <FlourishEmbed {...AsianGamesFootballProps} />
);

export const FlourishStory = () => <FlourishEmbed {...FlourishStoryFixture} />;

export const FlourishVisualisation = () => (
  <FlourishEmbed {...FlourishVisualisationFixture} />
);
