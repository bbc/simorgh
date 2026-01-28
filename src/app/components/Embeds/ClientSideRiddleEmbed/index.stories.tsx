import { VivoRiddleEmbedData } from './fixtures';
import ClientSideEmbed from '.';

export default {
  title: 'Components/Embeds/Client Side Riddle Embed',
  component: ClientSideEmbed,
};

export const VivoRiddleEmbed = () => (
  <ClientSideEmbed {...VivoRiddleEmbedData} />
);
