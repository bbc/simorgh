import { getStorybook, storiesOf } from '@storybook/react';
import withServicesKnob from './withServicesKnob';

const matchesStoryKind = kind => story => story.kind === kind;

const matchesStoryName = name => story => story.name === name;

const buildRTLSubstory = (kind, name, storyFn) => {
  const rtlServiceDecorator = withServicesKnob({
    defaultService: 'arabic',
    services: ['arabic', 'persian', 'urdu', 'pashto'],
  });
  storiesOf(
    `${kind}/Right to left layouts`,
    module,
  ).add(`Right to left - ${name}`, () => rtlServiceDecorator(storyFn));
};

// eslint-disable-next-line import/prefer-default-export
export const buildRTLSubstories = (storyKind = '', { include = [] } = {}) => {
  const allStories = getStorybook();
  const { stories } = allStories.find(matchesStoryKind(storyKind));

  if (include.length) {
    include.forEach(name => {
      const { render } = stories.find(matchesStoryName(name));
      buildRTLSubstory(storyKind, name, render);
    });
  } else {
    stories.forEach(({ name, render }) =>
      buildRTLSubstory(storyKind, name, render),
    );
  }
};
