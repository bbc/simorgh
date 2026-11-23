import MostRecent from '.';
import metadata from './metadata.json';
import readme from './README.md';

export default {
  title: 'Components/Most Recent',
  component: MostRecent,
  parameters: {
    metadata,
    docs: { readme },
  },
};

export const Example = {
  args: {
    data: {
      items: [
        {
          id: 'one',
          headline: 'The latest headline',
          href: '/articles/one',
          timeAgo: '5 minutes ago',
        },
        {
          id: 'two',
          headline: 'Another latest headline',
          href: '/articles/two',
          timeAgo: '10 minutes ago',
        },
      ],
    },
  },
};
