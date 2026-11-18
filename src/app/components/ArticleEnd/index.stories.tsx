import type { Meta, StoryObj } from '@storybook/react-webpack5';
import ArticleEnd from '.';
import readme from './README.md';
import metadata from './metadata.json';

const meta = {
  title: 'Components/ArticleEnd',
  component: ArticleEnd,
  globals: {
    service: { service: 'mundo', variant: 'default' },
  },
  parameters: {
    docs: { readme },
    metadata,
  },
  args: {
    label: 'Fin del artículo',
  },
} satisfies Meta<typeof ArticleEnd>;

export default meta;

export const Mundo: StoryObj<typeof meta> = {};
