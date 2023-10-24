import React from 'react';
import AsianGamesFootballProps from './fixtures';
import EmbedIFrame from './EmbedIFrame';

export default {
  title: 'Components/Embed Iframe',
  component: EmbedIFrame,
};

export const AsianGamesFootball = () => (
  <EmbedIFrame {...AsianGamesFootballProps} />
);
