import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { withServicesKnob } from '@bbc/psammead-storybook-helpers';
import { TopicTags, TopicTag } from '.';
import notes from '../README.md';

const STORY_KIND = 'Components/TopicTags';

storiesOf(STORY_KIND, module)
  .addDecorator(withKnobs)
  .addDecorator(withServicesKnob())
  .add(
    'default',
    ({ service, script, text }) => {
      const shortText = service === 'news' ? text : text.trim().split(' ')[0];

      return (
        <TopicTags service={service} script={script}>
          <TopicTag name={shortText} link="#" />
        </TopicTags>
      );
    },
    { notes, knobs: { escapeHTML: false } },
  )
  .add(
    'multiple topics',
    ({ service, script, text }) => {
      const textArray =
        service === 'ukchina'
          ? [text.trim().split(' ')[0], text.trim().split()[0]]
          : text.trim().split(' ');
      return (
        <TopicTags service={service} script={script}>
          {textArray.map((shortText, index) => {
            return (
              <TopicTag
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                name={shortText}
                link="#"
              />
            );
          })}
        </TopicTags>
      );
    },
    { notes, knobs: { escapeHTML: false } },
  );
