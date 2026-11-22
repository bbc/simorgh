import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { coreIcons, mediaIcons, navigationIcons } from '.';
import readme from './README.md';
import metadata from './metadata.json';
import styles from './index.module.scss';

const families = {
  core: coreIcons,
  media: mediaIcons,
  navigation: navigationIcons,
};

const IconGallery = ({ family }: { family: keyof typeof families }) => (
  <div className={styles.gallery}>
    {Object.entries(families[family]).map(([name, icon]) => (
      <figure key={name} className={styles.sample}>
        {icon}
        <figcaption>{name}</figcaption>
      </figure>
    ))}
  </div>
);

const meta = {
  title: 'Components/icons/Shared',
  component: IconGallery,
  parameters: { docs: { readme }, metadata },
} satisfies Meta<typeof IconGallery>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Core: Story = { args: { family: 'core' } };
export const Media: Story = { args: { family: 'media' } };
export const Navigation: Story = { args: { family: 'navigation' } };
