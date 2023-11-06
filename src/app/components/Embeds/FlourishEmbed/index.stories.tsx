import React from 'react';
import AsianGamesFootballProps from './fixtures';
import FlourishEmbed from '.';

export default {
  title: 'Components/Embed Iframe',
  component: FlourishEmbed,
};

export const AsianGamesFootball = () => (
  <FlourishEmbed {...AsianGamesFootballProps} />
);
