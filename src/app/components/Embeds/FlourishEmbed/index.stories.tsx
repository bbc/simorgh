import {
  AsianGamesFootballProps,
  FlourishStoryFixture,
  FlourishVisualisationFixture,
} from './fixtures';
import FlourishEmbed from '.';

export default {
  title: 'Components/Embeds/Flourish Embed',
  component: FlourishEmbed,
};

export const FlourishResponsiveHeight = () => (
  <FlourishEmbed {...AsianGamesFootballProps} />
);

FlourishResponsiveHeight.parameters = {
  chromatic: { disable: true },
};

export const FlourishStory = () => <FlourishEmbed {...FlourishStoryFixture} />;

export const FlourishVisualisation = () => (
  <FlourishEmbed {...FlourishVisualisationFixture} />
);
