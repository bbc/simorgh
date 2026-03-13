const Component = () => {
  return (
    <a href="https://bbc-archive.github.io/psammead">
      Psammead Storybook (Archived)
    </a>
  );
};

export default {
  title: 'Psammead/Storybook',
  Component,
  parameters: {
    chromatic: {
      disable: true,
    },
  },
};

export const Example = Component;
