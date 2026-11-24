import { VivoRiddleEmbedData } from './fixtures';
import ClientSideEmbed from '.';

export default {
  title: 'Components/Embeds/Client Side Riddle Embed',
  component: ClientSideEmbed,
  parameters: { chromatic: { disable: true } },
};

export const VivoRiddleEmbed = () => (
  <ClientSideEmbed {...VivoRiddleEmbedData} />
);
